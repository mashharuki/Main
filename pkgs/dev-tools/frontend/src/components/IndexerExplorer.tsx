import { useState } from "react";
import { GraphQLClient } from "../clients/graphql-client";
import {
	buildLatestBlockQuery,
	buildBlockWithTransactionsQuery,
	buildTransactionsByHashQuery,
	buildTransactionsByIdentifierQuery,
} from "../utils/graphql-queries";
import { introspectSchema } from "../utils/indexer-schema";
import "../App.css";

const DEFAULT_INDEXER_URL =
	"https://indexer.testnet-02.midnight.network/api/v1/graphql";

type TabType = "blocks" | "transactions" | "search" | "custom" | "schema";

interface Block {
	height: number;
	hash: string;
	timestamp?: string;
	protocolVersion?: string;
	author?: string;
}

interface Transaction {
	hash: string;
	protocolVersion?: number;
	applyStage?: string;
	identifiers?: string[];
	raw?: string;
	merkleTreeRoot?: string;
	blockNumber?: number;
	blockHeight?: number;
	extrinsicIndex?: number;
	block?: {
		height: number;
		hash: string;
		timestamp?: number;
		author?: string;
		protocolVersion?: number;
		parent?: {
			hash: string;
			height: number;
		};
		transactions?: Array<{
			hash: string;
		}>;
	};
	contractActions?: Array<{
		__typename?: string;
		address?: string;
		state?: string;
		chainState?: string;
		transaction?: {
			hash: string;
		};
	}>;
}

export function IndexerExplorer() {
	const [indexerUrl, setIndexerUrl] = useState(DEFAULT_INDEXER_URL);
	
	// Get initial tab from URL search params, default to "blocks"
	const getInitialTab = (): TabType => {
		const params = new URLSearchParams(window.location.search);
		const tab = params.get("tab") as TabType | null;
		if (tab && ["blocks", "transactions", "search", "custom", "schema"].includes(tab)) {
			return tab;
		}
		return "blocks";
	};
	
	const [activeTab, setActiveTab] = useState<TabType>(getInitialTab());
	
	// Update URL search params when tab changes
	const handleTabChange = (tab: TabType) => {
		setActiveTab(tab);
		const url = new URL(window.location.href);
		url.searchParams.set("tab", tab);
		window.history.replaceState({}, "", url.toString());
	};
	
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [result, setResult] = useState<string>("");

	// Blocks query states
	const [blocksLimit, setBlocksLimit] = useState<string>("10");
	const [blocksResult, setBlocksResult] = useState<Block[] | null>(null);

	// Transactions query states
	const [txLimit, setTxLimit] = useState<string>("50");
	const [txResult, setTxResult] = useState<Transaction[] | null>(null);

	// Search states
	const [searchTxHash, setSearchTxHash] = useState<string>("");
	const [searchResult, setSearchResult] = useState<unknown>(null);

	// Custom query states
	const [customQuery, setCustomQuery] = useState<string>(
		`query {
  blocks(offset: 0, limit: 5) {
    number
    hash
  }
}`,
	);

	// Schema introspection states
	const [schemaResult, setSchemaResult] = useState<string>("");
	const [schemaLoading, setSchemaLoading] = useState(false);

	const client = new GraphQLClient({ endpoint: indexerUrl, timeout: 30000 });

	const handleIntrospectSchema = async () => {
		setSchemaLoading(true);
		setError("");
		setSchemaResult("");

		try {
			const schema = await introspectSchema(client);
			setSchemaResult(JSON.stringify(schema, null, 2));
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
		} finally {
			setSchemaLoading(false);
		}
	};

	const handleQueryBlocks = async () => {
		setLoading(true);
		setError("");
		setBlocksResult(null);

		try {
			const limit = parseInt(blocksLimit, 10) || 10;
			
			// Get latest block height first
			const latestBlockQuery = buildLatestBlockQuery();
			const latestBlockData = await client.query<{
				block: {
					height: number;
				};
			}>(latestBlockQuery);
			
			const latestHeight = latestBlockData.block.height;
			const blocks: Block[] = [];
			
			// Fetch blocks in parallel batches for better performance
			const batchSize = 20;
			for (let start = 0; start < limit; start += batchSize) {
				const promises = [];
				for (let i = 0; i < batchSize && (start + i) < limit; i++) {
					const height = latestHeight - (start + i);
					if (height < 0) break;
					
					const blockQuery = buildBlockWithTransactionsQuery(height);
					promises.push(
						client.query<{
							block: {
								height: number;
								hash: string;
								timestamp?: number;
								protocolVersion?: number;
								author?: string;
							};
						}>(blockQuery).catch(() => null)
					);
				}
				
				const results = await Promise.all(promises);
				for (const result of results) {
					if (result && result.block) {
						blocks.push({
							height: result.block.height,
							hash: result.block.hash,
							timestamp: result.block.timestamp
								? new Date(result.block.timestamp).toISOString()
								: undefined,
							protocolVersion: result.block.protocolVersion?.toString(),
							author: result.block.author,
						});
					}
				}
				
				if (blocks.length >= limit) break;
			}

			// Sort by height (newest first) and limit results
			const sortedBlocks = blocks
				.sort((a, b) => b.height - a.height)
				.slice(0, limit);

			setBlocksResult(sortedBlocks);
			setResult(JSON.stringify(sortedBlocks, null, 2));
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleQueryTransactions = async () => {
		setLoading(true);
		setError("");
		setTxResult(null);

		try {
			const limit = parseInt(txLimit, 10) || 50;
			
			// Get latest block height first
			const latestBlockQuery = buildLatestBlockQuery();
			const latestBlockData = await client.query<{
				block: {
					height: number;
				};
			}>(latestBlockQuery);
			
			const latestHeight = latestBlockData.block.height;
			const allTransactions: Transaction[] = [];
			
			// Calculate search range based on limit
			// Since transactions are sparse (~0.35 per block on average),
			// we need to search roughly 3x the limit in blocks
			// Cap at reasonable maximums to avoid performance issues
			const estimatedBlocksNeeded = Math.min(limit * 3, 1000);
			const searchRange = Math.min(estimatedBlocksNeeded, latestHeight);
			
			// Search blocks in parallel batches for better performance
			const batchSize = 20;
			for (let start = 0; start < searchRange && allTransactions.length < limit; start += batchSize) {
				const promises = [];
				for (let i = 0; i < batchSize && (start + i) < searchRange; i++) {
					const height = latestHeight - (start + i);
					if (height < 0) break;
					
					const blockQuery = buildBlockWithTransactionsQuery(height);
					promises.push(
						client.query<{
							block: {
								height: number;
								transactions: Transaction[];
							};
						}>(blockQuery).catch(() => null)
					);
				}
				
				const results = await Promise.all(promises);
				for (const result of results) {
					if (result && result.block && result.block.transactions) {
						allTransactions.push(...result.block.transactions);
						if (allTransactions.length >= limit) break;
					}
				}
				
				// Stop if we have enough transactions
				if (allTransactions.length >= limit) break;
			}

			// Sort by block height (newest first) and limit results
			const sortedTransactions = allTransactions
				.sort((a, b) => {
					const aHeight = a.block?.height ?? 0;
					const bHeight = b.block?.height ?? 0;
					return bHeight - aHeight;
				})
				.slice(0, limit);
			
			setTxResult(sortedTransactions);
			setResult(JSON.stringify({ transactions: sortedTransactions }, null, 2));
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};


	const handleSearchTransaction = async () => {
		if (!searchTxHash.trim()) {
			setError("Please enter a transaction hash or identifier");
			return;
		}

		setLoading(true);
		setError("");
		setSearchResult(null);

		try {
			const searchValue = searchTxHash.trim();
			const cleanValue = searchValue.startsWith("0x") 
				? searchValue.slice(2) 
				: searchValue;
			
			// Check if it's a 72-character identifier (transaction identifier)
			if (/^[0-9a-fA-F]{72}$/.test(cleanValue)) {
				// Use the full 72-character identifier for GraphQL query
				// The identifier should be passed as-is (without 0x prefix)
				const query = buildTransactionsByIdentifierQuery(cleanValue);
				const data = await client.query<{ transactions: Transaction[] }>(query);
				
				if (data.transactions && data.transactions.length > 0) {
					setSearchResult(data.transactions[0]);
					setResult(JSON.stringify(data, null, 2));
					setError(""); // Clear any previous errors
				} else {
					setError(`No transactions found for identifier: ${searchValue}`);
				}
				return;
			}
			
			// Otherwise, treat as transaction hash
			let warningMessage = "";
			let queryHash = searchValue;
			
			// If hash is longer than 64 characters, try multiple approaches
			if (cleanValue.length > 64) {
				warningMessage = `Note: Hash length is ${cleanValue.length} characters (expected 64). Trying first 64 characters.`;
				// Try first 64 characters
				queryHash = cleanValue.slice(0, 64);
			} else if (cleanValue.length < 64) {
				warningMessage = `Note: Hash was padded from ${cleanValue.length} to 64 characters`;
			}
			
			// Try searching with normalized hash
			let query = buildTransactionsByHashQuery(queryHash);
			let data = await client.query<{ transactions: Transaction[] }>(query);

			// If not found and hash was longer than 64, try last 64 characters
			if ((!data.transactions || data.transactions.length === 0) && cleanValue.length > 64) {
				const last64 = cleanValue.slice(-64);
				warningMessage = `Note: Hash length is ${cleanValue.length} characters. Tried first 64, now trying last 64 characters.`;
				query = buildTransactionsByHashQuery(last64);
				data = await client.query<{ transactions: Transaction[] }>(query);
			}

			// transactions returns a list, get the first one
			if (data.transactions && data.transactions.length > 0) {
				setSearchResult(data.transactions[0]);
				setResult(JSON.stringify(data, null, 2));
				if (warningMessage) {
					setError(warningMessage);
				}
			} else {
				const notFoundMsg = warningMessage 
					? `Transaction not found. ${warningMessage} The hash may not exist in the indexer or may be from a different network.` 
					: "Transaction not found. The hash may not exist in the indexer or may be from a different network.";
				setError(notFoundMsg);
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};


	const handleCustomQuery = async () => {
		if (!customQuery.trim()) {
			setError("Please enter a GraphQL query");
			return;
		}

		setLoading(true);
		setError("");
		setResult("");

		try {
			const data = await client.query(customQuery);
			setResult(JSON.stringify(data, null, 2));
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
			setResult("");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="app">
			<header className="header">
				<h1>Midnight Network Indexer Explorer</h1>
				<div className="endpoint-config">
					<label>
						Indexer URL:
						<input
							type="text"
							value={indexerUrl}
							onChange={(e) => setIndexerUrl(e.target.value)}
							className="endpoint-input"
						/>
					</label>
				</div>
			</header>

			<main className="main">
				<div className="sidebar">
					<div className="tabs">
						<button
							type="button"
							className={`tab-button ${activeTab === "blocks" ? "active" : ""}`}
							onClick={() => handleTabChange("blocks")}
						>
							Blocks
						</button>
						<button
							type="button"
							className={`tab-button ${
								activeTab === "transactions" ? "active" : ""
							}`}
							onClick={() => handleTabChange("transactions")}
						>
							Transactions
						</button>
						<button
							type="button"
							className={`tab-button ${activeTab === "search" ? "active" : ""}`}
							onClick={() => handleTabChange("search")}
						>
							Search
						</button>
						<button
							type="button"
							className={`tab-button ${activeTab === "custom" ? "active" : ""}`}
							onClick={() => handleTabChange("custom")}
						>
							Custom Query
						</button>
						<button
							type="button"
							className={`tab-button ${activeTab === "schema" ? "active" : ""}`}
							onClick={() => handleTabChange("schema")}
						>
							Schema
						</button>
					</div>
				</div>

				<div className="content">
					{activeTab === "blocks" && (
						<div className="method-panel">
							<h2>Query Blocks</h2>
							<p className="method-description-text">
								Query blocks from the indexer. Gets the latest blocks sequentially without recursion, so you can retrieve many blocks.
							</p>

							<div className="params-section">
								<div className="param-input">
									<label>
										Limit
										<input
											type="number"
											value={blocksLimit}
											onChange={(e) => setBlocksLimit(e.target.value)}
											placeholder="10"
											min="1"
											max="1000"
										/>
										<small>Number of blocks to return</small>
									</label>
								</div>
							</div>

							<button
								type="button"
								onClick={handleQueryBlocks}
								disabled={loading}
								className="call-button"
							>
								{loading ? "Querying..." : "Query Blocks"}
							</button>

							{error && (
								<div className="error-panel">
									<h3>Error</h3>
									<pre>{error}</pre>
								</div>
							)}

							{blocksResult && (
								<div className="result-panel">
									<h3>Results ({blocksResult.length} blocks)</h3>
									<div className="search-results-list">
										{blocksResult.map((block, index) => (
											<div key={index} className="search-result-item">
												<div className="result-item-header">
													<span>Block #{block.height}</span>
												</div>
												<pre className="result-item-content">
													{JSON.stringify(block, null, 2)}
												</pre>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}

					{activeTab === "transactions" && (
						<div className="method-panel">
							<h2>Query Transactions</h2>
							<p className="method-description-text">
								Query transactions from the indexer. Searches through multiple blocks (up to 1000) to find transactions. Can retrieve many more transactions than the Blocks tab.
							</p>

							<div className="params-section">
								<div className="param-input">
									<label>
										Limit
										<input
											type="number"
											value={txLimit}
											onChange={(e) => setTxLimit(e.target.value)}
											placeholder="50"
											min="1"
											max="1000"
										/>
										<small>Number of transactions to return (searches through multiple blocks)</small>
									</label>
								</div>
							</div>

							<button
								type="button"
								onClick={handleQueryTransactions}
								disabled={loading}
								className="call-button"
							>
								{loading ? "Querying..." : "Query Transactions"}
							</button>

							{error && (
								<div className="error-panel">
									<h3>Error</h3>
									<pre>{error}</pre>
								</div>
							)}

							{txResult && (
								<div className="result-panel">
									<h3>Results ({txResult.length} transactions)</h3>
									<div className="search-results-list">
										{txResult.map((tx, index) => (
											<div key={index} className="search-result-item">
												<div className="result-item-header">
													<span>
														Block #
														{tx.block?.height ??
															tx.blockNumber ??
															tx.blockHeight ??
															"unknown"}
														{tx.extrinsicIndex !== undefined &&
															` (Index: ${tx.extrinsicIndex})`}
													</span>
												</div>
												<pre className="result-item-content">
													{JSON.stringify(tx, null, 2)}
												</pre>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}

					{activeTab === "search" && (
						<div className="method-panel">
							<h2>Search</h2>
							<p className="method-description-text">
								Search for transactions by hash or identifier. Identifiers are 72-character hex strings found in transaction.identifiers.
							</p>

							<div className="params-section">
								<div className="param-input">
									<label>
										Transaction Hash or Identifier
										<input
											type="text"
											value={searchTxHash}
											onChange={(e) => setSearchTxHash(e.target.value)}
											placeholder="0x... (64 hex chars) or 00000000... (72 hex chars)"
										/>
									</label>
									<small>64-char hash or 72-char identifier from transaction.identifiers</small>
								</div>
								<button
									type="button"
									onClick={handleSearchTransaction}
									disabled={loading || !searchTxHash.trim()}
									className="call-button"
								>
									{loading ? "Searching..." : "Search"}
								</button>
							</div>

							{error && (
								<div className="error-panel">
									<h3>Error</h3>
									<pre>{error}</pre>
								</div>
							)}

							{searchResult && (
								<div className="result-panel">
									<h3>Search Results</h3>
									<pre>{String(JSON.stringify(searchResult, null, 2))}</pre>
								</div>
							)}
						</div>
					)}

					{activeTab === "custom" && (
						<div className="method-panel">
							<h2>Custom GraphQL Query</h2>
							<p className="method-description-text">
								Execute a custom GraphQL query against the indexer.
							</p>

							<div className="params-section">
								<div className="param-input">
									<label>
										GraphQL Query
										<textarea
											value={customQuery}
											onChange={(e) => setCustomQuery(e.target.value)}
											placeholder="query { ... }"
											rows={15}
											style={{
												width: "100%",
												padding: "0.5rem 0.75rem",
												border: "1px solid var(--color-border)",
												borderRadius: "2px",
												fontSize: "0.875rem",
												fontFamily:
													'"Monaco", "Menlo", "Ubuntu Mono", monospace',
												resize: "vertical",
											}}
										/>
									</label>
								</div>
							</div>

							<button
								type="button"
								onClick={handleCustomQuery}
								disabled={loading}
								className="call-button"
							>
								{loading ? "Executing..." : "Execute Query"}
							</button>

							{error && (
								<div className="error-panel">
									<h3>Error</h3>
									<pre>{error}</pre>
								</div>
							)}

							{result && (
								<div className="result-panel">
									<h3>Result</h3>
									<pre>{result}</pre>
								</div>
							)}
						</div>
					)}

					{activeTab === "schema" && (
						<div className="method-panel">
							<h2>GraphQL Schema Introspection</h2>
							<p className="method-description-text">
								Introspect the GraphQL schema to understand available fields and types.
							</p>

							<button
								type="button"
								onClick={handleIntrospectSchema}
								disabled={schemaLoading}
								className="call-button"
							>
								{schemaLoading ? "Introspecting..." : "Introspect Schema"}
							</button>

							{error && (
								<div className="error-panel">
									<h3>Error</h3>
									<pre>{error}</pre>
								</div>
							)}

							{schemaResult && (
								<div className="result-panel">
									<h3>Schema</h3>
									<pre>{schemaResult}</pre>
								</div>
							)}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
