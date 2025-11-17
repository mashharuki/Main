import { useState } from "react";
import type { Cip30WalletApi, WalletName } from "../types/wallet-types";
import "../App.css";

interface CounterContractPanelProps {
	walletApi: Cip30WalletApi;
	walletName: WalletName | null;
	address: string | null;
}

export function CounterContractPanel({
	walletApi,
	walletName,
	address,
}: CounterContractPanelProps) {
	const [contractAddress, setContractAddress] = useState<string>("");
	const [deploying, setDeploying] = useState(false);
	const [joining, setJoining] = useState(false);
	const [incrementing, setIncrementing] = useState(false);
	const [viewingState, setViewingState] = useState(false);
	const [counterValue, setCounterValue] = useState<bigint | null>(null);
	const [error, setError] = useState<string>("");
	const [deployResult, setDeployResult] = useState<{
		contractAddress: string;
		txId: string;
		blockHeight: string;
	} | null>(null);

	const handleDeploy = async () => {
		setDeploying(true);
		setError("");
		setDeployResult(null);

		try {
			// TODO: Implement contract deployment using Midnight.js
			// This requires:
			// 1. Loading the compiled counter contract
			// 2. Setting up providers (publicDataProvider, proofProvider, etc.)
			// 3. Calling deployContract with initial private state
			// 4. Handling the deployment result

			// Placeholder implementation
			await new Promise((resolve) => setTimeout(resolve, 2000));
			throw new Error(
				"Contract deployment is not yet implemented. This feature requires Midnight.js browser integration.",
			);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to deploy contract",
			);
		} finally {
			setDeploying(false);
		}
	};

	const handleJoin = async () => {
		if (!contractAddress.trim()) {
			setError("Please enter a contract address");
			return;
		}

		setJoining(true);
		setError("");

		try {
			// TODO: Implement contract joining using Midnight.js
			// This requires:
			// 1. Loading the compiled counter contract
			// 2. Setting up providers
			// 3. Calling findDeployedContract with the contract address
			// 4. Handling the result

			// Placeholder implementation
			await new Promise((resolve) => setTimeout(resolve, 1000));
			throw new Error(
				"Contract joining is not yet implemented. This feature requires Midnight.js browser integration.",
			);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to join contract",
			);
		} finally {
			setJoining(false);
		}
	};

	const handleIncrement = async () => {
		if (!contractAddress.trim()) {
			setError("Please deploy or join a contract first");
			return;
		}

		setIncrementing(true);
		setError("");

		try {
			// TODO: Implement increment call using Midnight.js
			// This requires:
			// 1. Getting the deployed contract instance
			// 2. Calling callTx.increment()
			// 3. Handling the transaction result

			// Placeholder implementation
			await new Promise((resolve) => setTimeout(resolve, 2000));
			throw new Error(
				"Increment is not yet implemented. This feature requires Midnight.js browser integration.",
			);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to increment counter",
			);
		} finally {
			setIncrementing(false);
		}
	};

	const handleViewState = async () => {
		if (!contractAddress.trim()) {
			setError("Please enter a contract address");
			return;
		}

		setViewingState(true);
		setError("");
		setCounterValue(null);

		try {
			// TODO: Implement state query using RPC or Indexer
			// This can use the RPC client to query contract state
			// Or use the indexer GraphQL API

			// Placeholder implementation
			await new Promise((resolve) => setTimeout(resolve, 1000));
			throw new Error(
				"State viewing is not yet implemented. This feature requires RPC or Indexer integration.",
			);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to view contract state",
			);
		} finally {
			setViewingState(false);
		}
	};

	return (
		<div className="method-panel">
			<h2>Counter Contract</h2>
			<p className="method-description-text">
				Deploy, join, and interact with Counter contracts on Midnight Network.
				This contract maintains a public counter that can be incremented.
			</p>

			<div className="params-section">
				<h3>Contract Address</h3>
				<div className="param-input">
					<label>
						Contract Address (for joining existing contract)
						<input
							type="text"
							value={contractAddress}
							onChange={(e) => setContractAddress(e.target.value)}
							placeholder="Enter contract address..."
							className="contract-address-input"
						/>
					</label>
				</div>
			</div>

			<div className="params-section">
				<h3>Actions</h3>
				<div className="contract-actions">
					<button
						type="button"
						onClick={handleDeploy}
						disabled={deploying}
						className="call-button"
					>
						{deploying ? "Deploying..." : "🚀 Deploy New Contract"}
					</button>
					<button
						type="button"
						onClick={handleJoin}
						disabled={joining || !contractAddress.trim()}
						className="call-button"
					>
						{joining ? "Joining..." : "🔗 Join Existing Contract"}
					</button>
					<button
						type="button"
						onClick={handleIncrement}
						disabled={incrementing || !contractAddress.trim()}
						className="call-button"
					>
						{incrementing ? "Incrementing..." : "➕ Increment Counter"}
					</button>
					<button
						type="button"
						onClick={handleViewState}
						disabled={viewingState || !contractAddress.trim()}
						className="call-button"
					>
						{viewingState ? "Loading..." : "👁️ View Counter Value"}
					</button>
				</div>
			</div>

			{deployResult && (
				<div className="result-panel">
					<h3>Deployment Result</h3>
					<div className="deployment-info">
						<div className="info-item">
							<label>Contract Address:</label>
							<span className="address-display">
								<span className="address-full">
									{deployResult.contractAddress}
								</span>
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(
											deployResult.contractAddress,
										);
									}}
									className="copy-button"
									title="Copy address"
								>
									📋
								</button>
							</span>
						</div>
						<div className="info-item">
							<label>Transaction ID:</label>
							<span>{deployResult.txId}</span>
						</div>
						<div className="info-item">
							<label>Block Height:</label>
							<span>{deployResult.blockHeight}</span>
						</div>
					</div>
				</div>
			)}

			{counterValue !== null && (
				<div className="result-panel">
					<h3>Counter Value</h3>
					<div className="counter-value-display">
						<strong>{counterValue.toString()}</strong>
					</div>
				</div>
			)}

			{error && (
				<div className="error-panel">
					<h3>Error</h3>
					<pre>{error}</pre>
				</div>
			)}

			<div className="params-section">
				<h3>Usage</h3>
				<ol className="usage-list">
					<li>
						<strong>Deploy:</strong> Create a new Counter contract on the
						blockchain
					</li>
					<li>
						<strong>Join:</strong> Connect to an existing Counter contract by
						entering its address
					</li>
					<li>
						<strong>Increment:</strong> Call the increment() function to increase
						the counter by 1
					</li>
					<li>
						<strong>View State:</strong> Query the current counter value from
						the blockchain
					</li>
				</ol>
				<div className="info-box">
					<strong>Note:</strong> This feature requires:
					<ul>
						<li>Proof Server running on http://localhost:6300</li>
						<li>Midnight.js browser integration</li>
						<li>Compiled Counter contract code</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

