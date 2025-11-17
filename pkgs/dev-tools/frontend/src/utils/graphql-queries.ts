/**
 * GraphQL Query Builders for Midnight Network Indexer
 * Based on actual schema introspection from the public indexer
 * 
 * Schema Summary:
 * - Query.block(offset: BlockOffset): Block - Get a single block (or latest if offset omitted)
 * - Query.transactions(offset: TransactionOffset!): [Transaction!]! - Get transactions (offset is required)
 * - BlockOffset: { hash?: HexEncoded, height?: Int }
 * - TransactionOffset: { hash?: HexEncoded, identifier?: HexEncoded }
 * 
 * Note: identifier is HexEncoded type (32-byte hex string, 64 hex characters with 0x prefix)
 */

/**
 * Introspect GraphQL schema to understand available fields
 */
export const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      queryType {
        name
        fields {
          name
          description
          args {
            name
            description
            type {
              name
              kind
              ofType {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
          type {
            name
            kind
            ofType {
              name
              kind
              fields {
                name
                description
                type {
                  name
                  kind
                }
              }
            }
          }
        }
      }
      types {
        name
        kind
        description
        fields {
          name
          description
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
`;

/**
 * Query the latest block
 */
export function buildLatestBlockQuery(): string {
	return `
    query {
      block {
        hash
        height
        timestamp
        protocolVersion
        author
      }
    }
  `;
}

/**
 * Query a single block by height
 */
export function buildBlockByHeightQuery(height: number): string {
	return `
    query {
      block(offset: { height: ${height} }) {
        hash
        height
        timestamp
        protocolVersion
        author
        parent {
          hash
          height
        }
      }
    }
  `;
}

/**
 * Query a single block by hash
 */
export function buildBlockByHashQuery(blockHash: string): string {
	return `
    query {
      block(offset: { hash: "${blockHash}" }) {
        hash
        height
        timestamp
        protocolVersion
        author
        parent {
          hash
          height
        }
      }
    }
  `;
}

/**
 * Maximum recursion depth for parent chain queries
 * GraphQL servers typically limit recursion depth to prevent abuse
 * Actual limit from the indexer: 13 (14+ causes "Query is nested too deep" error)
 */
export const MAX_PARENT_CHAIN_DEPTH = 13;

/**
 * Query latest block with parent chain
 * This allows us to get multiple blocks by following the parent chain
 * @param depth - Maximum depth to traverse (capped at MAX_PARENT_CHAIN_DEPTH)
 */
export function buildLatestBlockWithParentsQuery(depth: number = 10): string {
	// Cap depth at maximum allowed
	const safeDepth = Math.min(depth, MAX_PARENT_CHAIN_DEPTH);
	
	// Build recursive parent query structure
	const buildParentQuery = (currentDepth: number, maxDepth: number): string => {
		if (currentDepth >= maxDepth) {
			return "";
		}
		
		const indent = "  ".repeat(currentDepth + 1);
		const nextDepth = currentDepth + 1;
		const parentContent = buildParentQuery(nextDepth, maxDepth);
		
		return `
${indent}parent {
${indent}  hash
${indent}  height
${indent}  timestamp
${indent}  protocolVersion
${indent}  author${parentContent}
${indent}}`;
	};
	
	const parentChain = buildParentQuery(0, safeDepth);
	
	return `
    query {
      block {
        hash
        height
        timestamp
        protocolVersion
        author${parentChain}
      }
    }
  `;
}

/**
 * Query latest block with transactions
 * This is more reliable than using identifier offset
 */
export function buildLatestBlockWithTransactionsQuery(): string {
	return `
    query {
      block {
        hash
        height
        timestamp
        protocolVersion
        author
        transactions {
          hash
          block {
            hash
            height
            timestamp
            protocolVersion
            author
          }
        }
      }
    }
  `;
}

/**
 * Query blocks by getting transactions and extracting unique blocks
 * Note: The schema doesn't have a blocks query, so we use transactions to get blocks
 * This uses the latest block's transactions as a starting point
 */
export function buildBlocksViaTransactionsQuery(
	identifierHex: string,
): string {
	// Use identifier-based offset for transactions (must be hex-encoded)
	// Note: identifier should be a valid transaction identifier, not just zeros
	return `
    query {
      transactions(offset: { identifier: "${identifierHex}" }) {
        hash
        block {
          hash
          height
          timestamp
          protocolVersion
          author
        }
      }
    }
  `;
}

/**
 * Query transactions with offset (offset is required)
 * TransactionOffset: { hash?: HexEncoded, identifier?: HexEncoded }
 * identifier must be a hex-encoded 32-byte value (64 hex chars with 0x prefix)
 */
export function buildTransactionsQuery(
	identifierHex: string,
): string {
	return `
    query {
      transactions(offset: { identifier: "${identifierHex}" }) {
        hash
        protocolVersion
        applyStage
        identifiers
        block {
          hash
          height
          timestamp
        }
      }
    }
  `;
}

/**
 * Query transactions by hash
 */
export function buildTransactionsByHashQuery(txHash: string): string {
	return `
    query {
      transactions(offset: { hash: "${txHash}" }) {
        hash
        protocolVersion
        applyStage
        identifiers
        block {
          hash
          height
          timestamp
        }
      }
    }
  `;
}

/**
 * Query transactions by identifier (hex-encoded)
 * identifier must be a hex-encoded 32-byte value (64 hex chars with 0x prefix)
 */
export function buildTransactionsByIdentifierQuery(identifierHex: string): string {
	return `
    query {
      transactions(offset: { identifier: "${identifierHex}" }) {
        hash
        protocolVersion
        applyStage
        identifiers
        block {
          hash
          height
          timestamp
        }
      }
    }
  `;
}

/**
 * Query a single transaction by hash (returns first result)
 * Note: transactions returns a list, so we get the first one
 */
export function buildTransactionByHashQuery(txHash: string): string {
	return `
    query {
      transactions(offset: { hash: "${txHash}" }) {
        hash
        protocolVersion
        applyStage
        identifiers
        raw
        merkleTreeRoot
        block {
          hash
          height
          timestamp
          protocolVersion
          author
        }
        contractActions {
          address
          state
        }
      }
    }
  `;
}
