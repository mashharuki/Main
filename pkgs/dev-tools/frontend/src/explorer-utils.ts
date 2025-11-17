/**
 * Explorer URL生成ユーティリティ
 * Polkadot.js.orgのexplorerへのリンクを生成
 */

const EXPLORER_BASE_URL =
	"https://polkadot.js.org/apps/?rpc=wss://rpc.testnet-02.midnight.network#/explorer/query";

/**
 * ブロックハッシュからexplorer URLを生成
 */
export function getBlockExplorerUrl(blockHash: string): string {
	if (!blockHash) {
		return "";
	}
	// ブロックハッシュが0xで始まらない場合は追加
	const hash = blockHash.startsWith("0x") ? blockHash : `0x${blockHash}`;
	return `${EXPLORER_BASE_URL}/${hash}`;
}

/**
 * ブロック番号からexplorer URLを生成
 * 注意: ブロック番号の場合は、まずブロックハッシュを取得する必要があります
 */
export function getBlockNumberExplorerUrl(blockNumber: number | string): string {
	if (blockNumber === undefined || blockNumber === null) {
		return "";
	}
	// ブロック番号を16進数に変換
	const hexNumber =
		typeof blockNumber === "string"
			? blockNumber.startsWith("0x")
				? blockNumber
				: `0x${parseInt(blockNumber, 10).toString(16)}`
			: `0x${blockNumber.toString(16)}`;
	return `${EXPLORER_BASE_URL}/${hexNumber}`;
}

/**
 * JSONレスポンスからブロックハッシュを抽出してexplorer URLを生成
 */
export function extractBlockHashFromResult(result: unknown): string | null {
	if (!result || typeof result !== "object") {
		return null;
	}

	const obj = result as Record<string, unknown>;

	// 直接ブロックハッシュが返される場合
	if (typeof obj === "string" && obj.startsWith("0x")) {
		return obj as string;
	}

	// block.block.header.hash または block.header.hash
	if (obj.block) {
		const block = obj.block as Record<string, unknown>;
		if (block.header) {
			const header = block.header as Record<string, unknown>;
			if (typeof header.hash === "string") {
				return header.hash;
			}
		}
	}

	// header.hash
	if (obj.header) {
		const header = obj.header as Record<string, unknown>;
		if (typeof header.hash === "string") {
			return header.hash;
		}
	}

	// 直接hashプロパティ
	if (typeof obj.hash === "string") {
		return obj.hash;
	}

	return null;
}

/**
 * JSONレスポンスからブロック番号を抽出
 */
export function extractBlockNumberFromResult(result: unknown): number | null {
	if (!result || typeof result !== "object") {
		return null;
	}

	const obj = result as Record<string, unknown>;

	// block.block.header.number
	if (obj.block) {
		const block = obj.block as Record<string, unknown>;
		if (block.header) {
			const header = block.header as Record<string, unknown>;
			if (header.number) {
				const numberStr =
					typeof header.number === "string" ? header.number : String(header.number);
				// 16進数の場合は10進数に変換
				if (numberStr.startsWith("0x")) {
					return parseInt(numberStr, 16);
				}
				return parseInt(numberStr, 10);
			}
		}
	}

	// header.number
	if (obj.header) {
		const header = obj.header as Record<string, unknown>;
		if (header.number) {
			const numberStr =
				typeof header.number === "string" ? header.number : String(header.number);
			if (numberStr.startsWith("0x")) {
				return parseInt(numberStr, 16);
			}
			return parseInt(numberStr, 10);
		}
	}

	// 直接numberプロパティ
	if (obj.number !== undefined) {
		const numberStr = typeof obj.number === "string" ? obj.number : String(obj.number);
		if (numberStr.startsWith("0x")) {
			return parseInt(numberStr, 16);
		}
		return parseInt(numberStr, 10);
	}

	return null;
}

