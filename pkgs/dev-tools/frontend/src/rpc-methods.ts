/**
 * RPCメソッド定義
 * Insomniaファイルから抽出したメソッドをカテゴリ別に整理
 */

export interface RpcMethod {
	name: string;
	description: string;
	category: string;
	params?: Array<{ name: string; type: string; required: boolean; description?: string }>;
}

export const RPC_METHODS: RpcMethod[] = [
	// System系
	{
		name: "system_chain",
		description: "チェーン名を取得",
		category: "system",
	},
	{
		name: "system_name",
		description: "ノード名を取得",
		category: "system",
	},
	{
		name: "system_version",
		description: "ノードバージョンを取得",
		category: "system",
	},
	{
		name: "system_health",
		description: "ノードのヘルス状態を取得",
		category: "system",
	},
	{
		name: "system_peers",
		description: "接続されているピアのリストを取得",
		category: "system",
	},
	{
		name: "system_properties",
		description: "チェーンのプロパティを取得",
		category: "system",
	},
	{
		name: "system_chainType",
		description: "チェーンのタイプを取得",
		category: "system",
	},
	{
		name: "system_nodeRoles",
		description: "ノードのロールを取得",
		category: "system",
	},
	{
		name: "system_localPeerId",
		description: "ローカルピアIDを取得",
		category: "system",
	},
	{
		name: "system_localListenAddresses",
		description: "ローカルリスンアドレスを取得",
		category: "system",
	},
	{
		name: "system_reservedPeers",
		description: "予約済みピアのリストを取得",
		category: "system",
	},
	{
		name: "system_addReservedPeer",
		description: "予約済みピアを追加",
		category: "system",
		params: [{ name: "peer", type: "string", required: true }],
	},
	{
		name: "system_removeReservedPeer",
		description: "予約済みピアを削除",
		category: "system",
		params: [{ name: "peer", type: "string", required: true }],
	},
	{
		name: "system_accountNextIndex",
		description: "アカウントの次のインデックスを取得",
		category: "system",
		params: [{ name: "accountId", type: "string", required: true }],
	},
	{
		name: "system_dryRun",
		description: "トランザクションをドライラン実行",
		category: "system",
		params: [
			{ name: "extrinsic", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "system_dryRunAt",
		description: "特定のブロックでトランザクションをドライラン実行",
		category: "system",
		params: [
			{ name: "extrinsic", type: "string", required: true },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "system_addLogFilter",
		description: "ログフィルターを追加",
		category: "system",
		params: [{ name: "filter", type: "string", required: true }],
	},
	{
		name: "system_resetLogFilter",
		description: "ログフィルターをリセット",
		category: "system",
	},
	{
		name: "system_syncState",
		description: "同期状態を取得",
		category: "system",
	},
	{
		name: "system_unstable_networkState",
		description: "ネットワーク状態を取得（不安定API）",
		category: "system",
	},

	// Chain系
	{
		name: "chain_getBlock",
		description: "ブロックのヘッダーとボディを取得",
		category: "chain",
		params: [{ name: "hash", type: "string", required: false }],
	},
	{
		name: "chain_getBlockHash",
		description: "特定のブロックのハッシュを取得",
		category: "chain",
		params: [{ name: "blockNumber", type: "string", required: false }],
	},
	{
		name: "chain_getHead",
		description: "最新のブロックハッシュを取得",
		category: "chain",
	},
	{
		name: "chain_getFinalizedHead",
		description: "最終確定されたブロックのハッシュを取得",
		category: "chain",
	},
	{
		name: "chain_getFinalisedHead",
		description: "最終確定されたブロックのハッシュを取得（英式スペル）",
		category: "chain",
	},
	{
		name: "chain_getHeader",
		description: "特定のブロックのヘッダーを取得",
		category: "chain",
		params: [{ name: "hash", type: "string", required: false }],
	},
	{
		name: "chain_getRuntimeVersion",
		description: "ランタイムバージョンを取得",
		category: "chain",
		params: [{ name: "at", type: "string", required: false }],
	},
	{
		name: "chain_subscribeNewHead",
		description: "新しいブロックヘッダーを購読",
		category: "chain",
	},
	{
		name: "chain_subscribeNewHeads",
		description: "新しいブロックヘッダーを購読（複数形）",
		category: "chain",
	},
	{
		name: "chain_subscribeAllHeads",
		description: "すべてのブロックヘッダーを購読",
		category: "chain",
	},
	{
		name: "chain_subscribeFinalizedHeads",
		description: "最終確定されたブロックヘッダーを購読",
		category: "chain",
	},
	{
		name: "chain_subscribeFinalisedHeads",
		description: "最終確定されたブロックヘッダーを購読（英式スペル）",
		category: "chain",
	},
	{
		name: "chain_subscribeRuntimeVersion",
		description: "ランタイムバージョンの変更を購読",
		category: "chain",
	},
	{
		name: "chain_unsubscribeNewHead",
		description: "新しいブロックヘッダーの購読を解除",
		category: "chain",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chain_unsubscribeNewHeads",
		description: "新しいブロックヘッダーの購読を解除（複数形）",
		category: "chain",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chain_unsubscribeAllHeads",
		description: "すべてのブロックヘッダーの購読を解除",
		category: "chain",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chain_unsubscribeFinalizedHeads",
		description: "最終確定されたブロックヘッダーの購読を解除",
		category: "chain",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chain_unsubscribeFinalisedHeads",
		description: "最終確定されたブロックヘッダーの購読を解除（英式スペル）",
		category: "chain",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chain_unsubscribeRuntimeVersion",
		description: "ランタイムバージョンの購読を解除",
		category: "chain",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},

	// State系
	{
		name: "state_getStorage",
		description: "ストレージエントリを取得",
		category: "state",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getStorageAt",
		description: "特定のブロックでのストレージエントリを取得",
		category: "state",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getStorageHash",
		description: "ストレージエントリのハッシュを取得",
		category: "state",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getStorageHashAt",
		description: "特定のブロックでのストレージエントリのハッシュを取得",
		category: "state",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "state_getStorageSize",
		description: "ストレージエントリのサイズを取得",
		category: "state",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getStorageSizeAt",
		description: "特定のブロックでのストレージエントリのサイズを取得",
		category: "state",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "state_getKeys",
		description: "ストレージキーのリストを取得",
		category: "state",
		params: [
			{ name: "prefix", type: "string", required: false },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getKeysPaged",
		description: "ページネーション付きでストレージキーのリストを取得",
		category: "state",
		params: [
			{ name: "prefix", type: "string", required: false },
			{ name: "count", type: "number", required: false },
			{ name: "startKey", type: "string", required: false },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getKeysPagedAt",
		description: "特定のブロックでページネーション付きでストレージキーのリストを取得",
		category: "state",
		params: [
			{ name: "prefix", type: "string", required: false },
			{ name: "count", type: "number", required: false },
			{ name: "startKey", type: "string", required: false },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "state_getPairs",
		description: "ストレージキーと値のペアを取得",
		category: "state",
		params: [
			{ name: "prefix", type: "string", required: false },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getMetadata",
		description: "ランタイムメタデータを取得",
		category: "state",
		params: [{ name: "at", type: "string", required: false }],
	},
	{
		name: "state_getRuntimeVersion",
		description: "ランタイムバージョンを取得",
		category: "state",
		params: [{ name: "at", type: "string", required: false }],
	},
	{
		name: "state_getReadProof",
		description: "ストレージの読み取り証明を取得",
		category: "state",
		params: [
			{ name: "keys", type: "array", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_getChildReadProof",
		description: "子ストレージの読み取り証明を取得",
		category: "state",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "keys", type: "array", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_queryStorage",
		description: "ストレージのクエリを実行",
		category: "state",
		params: [
			{ name: "keys", type: "array", required: true },
			{ name: "fromBlock", type: "string", required: false },
			{ name: "toBlock", type: "string", required: false },
		],
	},
	{
		name: "state_queryStorageAt",
		description: "特定のブロックでストレージのクエリを実行",
		category: "state",
		params: [
			{ name: "keys", type: "array", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_subscribeStorage",
		description: "ストレージの変更を購読",
		category: "state",
		params: [{ name: "keys", type: "array", required: false }],
	},
	{
		name: "state_unsubscribeStorage",
		description: "ストレージの購読を解除",
		category: "state",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "state_subscribeRuntimeVersion",
		description: "ランタイムバージョンの変更を購読",
		category: "state",
	},
	{
		name: "state_unsubscribeRuntimeVersion",
		description: "ランタイムバージョンの購読を解除",
		category: "state",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "state_call",
		description: "ランタイム関数を呼び出し",
		category: "state",
		params: [
			{ name: "method", type: "string", required: true },
			{ name: "data", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "state_callAt",
		description: "特定のブロックでランタイム関数を呼び出し",
		category: "state",
		params: [
			{ name: "method", type: "string", required: true },
			{ name: "data", type: "string", required: true },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "state_traceBlock",
		description: "ブロックのトレースを取得",
		category: "state",
		params: [
			{ name: "block", type: "string", required: true },
			{ name: "targets", type: "string", required: false },
			{ name: "storageKeys", type: "string", required: false },
		],
	},

	// Author系
	{
		name: "author_submitExtrinsic",
		description: "extrinsicを送信",
		category: "author",
		params: [{ name: "extrinsic", type: "string", required: true }],
	},
	{
		name: "author_submitAndWatchExtrinsic",
		description: "extrinsicを送信して監視",
		category: "author",
		params: [{ name: "extrinsic", type: "string", required: true }],
	},
	{
		name: "author_pendingExtrinsics",
		description: "保留中のextrinsicのリストを取得",
		category: "author",
	},
	{
		name: "author_removeExtrinsic",
		description: "extrinsicを削除",
		category: "author",
		params: [{ name: "extrinsics", type: "array", required: true }],
	},
	{
		name: "author_unwatchExtrinsic",
		description: "extrinsicの監視を解除",
		category: "author",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "author_rotateKeys",
		description: "セッションキーをローテート",
		category: "author",
	},
	{
		name: "author_insertKey",
		description: "キーを挿入",
		category: "author",
		params: [
			{ name: "keyType", type: "string", required: true },
			{ name: "suri", type: "string", required: true },
			{ name: "publicKey", type: "string", required: true },
		],
	},
	{
		name: "author_hasKey",
		description: "キーが存在するか確認",
		category: "author",
		params: [
			{ name: "publicKey", type: "string", required: true },
			{ name: "keyType", type: "string", required: true },
		],
	},
	{
		name: "author_hasSessionKeys",
		description: "セッションキーが存在するか確認",
		category: "author",
		params: [{ name: "sessionKeys", type: "string", required: true }],
	},

	// Midnight系
	{
		name: "midnight_jsonBlock",
		description: "JSONエンコードされたブロック情報を取得（extrinsicを含む）",
		category: "midnight",
		params: [{ name: "at", type: "string", required: false }],
	},
	{
		name: "midnight_jsonContractState",
		description: "JSONエンコードされたコントラクト状態を取得",
		category: "midnight",
		params: [
			{ name: "address", type: "string", required: true },
			{ name: "block", type: "string", required: false },
		],
	},
	{
		name: "midnight_contractState",
		description: "生の（バイナリエンコードされた）コントラクト状態を取得",
		category: "midnight",
		params: [
			{ name: "address", type: "string", required: true },
			{ name: "block", type: "string", required: false },
		],
	},
	{
		name: "midnight_decodeEvents",
		description: "イベントをデコード",
		category: "midnight",
		params: [{ name: "events", type: "string", required: true }],
	},
	{
		name: "midnight_zswapChainState",
		description: "ZSwapチェーン状態を取得",
		category: "midnight",
		params: [
			{ name: "address", type: "string", required: true },
			{ name: "block", type: "string", required: false },
		],
	},
	{
		name: "midnight_apiVersions",
		description: "サポートされているRPC APIバージョンのリストを取得",
		category: "midnight",
	},

	// Childstate系
	{
		name: "childstate_getStorage",
		description: "子ストレージエントリを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "childstate_getStorageHash",
		description: "子ストレージエントリのハッシュを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "childstate_getStorageSize",
		description: "子ストレージエントリのサイズを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "childstate_getKeys",
		description: "子ストレージキーのリストを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "prefix", type: "string", required: false },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "childstate_getKeysPaged",
		description: "ページネーション付きで子ストレージキーのリストを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "prefix", type: "string", required: false },
			{ name: "count", type: "number", required: false },
			{ name: "startKey", type: "string", required: false },
			{ name: "at", type: "string", required: false },
		],
	},
	{
		name: "childstate_getKeysPagedAt",
		description: "特定のブロックでページネーション付きで子ストレージキーのリストを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "prefix", type: "string", required: false },
			{ name: "count", type: "number", required: false },
			{ name: "startKey", type: "string", required: false },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "childstate_getStorageEntries",
		description: "子ストレージエントリのリストを取得",
		category: "childstate",
		params: [
			{ name: "childStorageKey", type: "string", required: true },
			{ name: "prefix", type: "string", required: false },
			{ name: "at", type: "string", required: false },
		],
	},

	// Archive系（不安定API）
	{
		name: "archive_unstable_call",
		description: "アーカイブノードでランタイム関数を呼び出し（不安定API）",
		category: "archive",
		params: [
			{ name: "method", type: "string", required: true },
			{ name: "data", type: "string", required: true },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "archive_unstable_storage",
		description: "アーカイブノードでストレージエントリを取得（不安定API）",
		category: "archive",
		params: [
			{ name: "key", type: "string", required: true },
			{ name: "at", type: "string", required: true },
		],
	},
	{
		name: "archive_unstable_header",
		description: "アーカイブノードでブロックヘッダーを取得（不安定API）",
		category: "archive",
		params: [{ name: "hash", type: "string", required: true }],
	},
	{
		name: "archive_unstable_body",
		description: "アーカイブノードでブロックボディを取得（不安定API）",
		category: "archive",
		params: [{ name: "hash", type: "string", required: true }],
	},
	{
		name: "archive_unstable_genesisHash",
		description: "ジェネシスブロックハッシュを取得（不安定API）",
		category: "archive",
	},
	{
		name: "archive_unstable_hashByHeight",
		description: "ブロック高さからブロックハッシュを取得（不安定API）",
		category: "archive",
		params: [{ name: "height", type: "number", required: true }],
	},
	{
		name: "archive_unstable_finalizedHeight",
		description: "最終確定されたブロック高さを取得（不安定API）",
		category: "archive",
	},

	// ChainHead系（不安定API）
	{
		name: "chainHead_unstable_follow",
		description: "チェーンヘッドをフォロー（不安定API）",
		category: "chainhead",
		params: [{ name: "withRuntime", type: "boolean", required: false }],
	},
	{
		name: "chainHead_unstable_unfollow",
		description: "チェーンヘッドのフォローを解除（不安定API）",
		category: "chainhead",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chainHead_unstable_header",
		description: "チェーンヘッドのヘッダーを取得（不安定API）",
		category: "chainhead",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chainHead_unstable_call",
		description: "チェーンヘッドでランタイム関数を呼び出し（不安定API）",
		category: "chainhead",
		params: [
			{ name: "subscriptionId", type: "string", required: true },
			{ name: "method", type: "string", required: true },
			{ name: "callParameters", type: "string", required: true },
		],
	},
	{
		name: "chainHead_unstable_storage",
		description: "チェーンヘッドでストレージエントリを取得（不安定API）",
		category: "chainhead",
		params: [
			{ name: "subscriptionId", type: "string", required: true },
			{ name: "key", type: "string", required: true },
			{ name: "childStorageKey", type: "string", required: false },
		],
	},
	{
		name: "chainHead_unstable_body",
		description: "チェーンヘッドでブロックボディを取得（不安定API）",
		category: "chainhead",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "chainHead_unstable_unpin",
		description: "チェーンヘッドのピンを解除（不安定API）",
		category: "chainhead",
		params: [
			{ name: "subscriptionId", type: "string", required: true },
			{ name: "blockHash", type: "string", required: true },
		],
	},
	{
		name: "chainHead_unstable_continue",
		description: "チェーンヘッドの操作を継続（不安定API）",
		category: "chainhead",
		params: [
			{ name: "subscriptionId", type: "string", required: true },
			{ name: "operationId", type: "string", required: true },
		],
	},
	{
		name: "chainHead_unstable_stopOperation",
		description: "チェーンヘッドの操作を停止（不安定API）",
		category: "chainhead",
		params: [
			{ name: "subscriptionId", type: "string", required: true },
			{ name: "operationId", type: "string", required: true },
		],
	},

	// TransactionWatch系（不安定API）
	{
		name: "transactionWatch_unstable_submitAndWatch",
		description: "トランザクションを送信して監視（不安定API）",
		category: "transactionwatch",
		params: [{ name: "extrinsic", type: "string", required: true }],
	},
	{
		name: "transactionWatch_unstable_unwatch",
		description: "トランザクションの監視を解除（不安定API）",
		category: "transactionwatch",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},

	// Sidechain系
	{
		name: "sidechain_getRegistrations",
		description: "サイドチェーンの登録情報を取得",
		category: "sidechain",
	},
	{
		name: "sidechain_getParams",
		description: "サイドチェーンのパラメータを取得",
		category: "sidechain",
	},
	{
		name: "sidechain_getStatus",
		description: "サイドチェーンのステータスを取得",
		category: "sidechain",
	},
	{
		name: "sidechain_getEpochCommittee",
		description: "エポック委員会を取得",
		category: "sidechain",
		params: [{ name: "epoch", type: "number", required: true }],
	},
	{
		name: "sidechain_getAriadneParameters",
		description: "Ariadneパラメータを取得",
		category: "sidechain",
		params: [{ name: "epoch", type: "number", required: true }],
	},

	// Offchain系
	{
		name: "offchain_localStorageGet",
		description: "オフチェーンローカルストレージから値を取得",
		category: "offchain",
		params: [
			{ name: "kind", type: "string", required: true },
			{ name: "key", type: "string", required: true },
		],
	},
	{
		name: "offchain_localStorageSet",
		description: "オフチェーンローカルストレージに値を設定",
		category: "offchain",
		params: [
			{ name: "kind", type: "string", required: true },
			{ name: "key", type: "string", required: true },
			{ name: "value", type: "string", required: true },
		],
	},

	// Grandpa系
	{
		name: "grandpa_subscribeJustifications",
		description: "Grandpaの正当化を購読",
		category: "grandpa",
	},
	{
		name: "grandpa_unsubscribeJustifications",
		description: "Grandpaの正当化の購読を解除",
		category: "grandpa",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
	{
		name: "grandpa_roundState",
		description: "Grandpaのラウンド状態を取得",
		category: "grandpa",
	},
	{
		name: "grandpa_proveFinality",
		description: "最終性の証明を取得",
		category: "grandpa",
		params: [
			{ name: "block", type: "string", required: true },
			{ name: "authoritiesSetId", type: "number", required: false },
		],
	},

	// その他
	{
		name: "rpc_methods",
		description: "利用可能なRPCメソッドのリストを取得",
		category: "other",
	},
	{
		name: "account_nextIndex",
		description: "アカウントの次のインデックスを取得（非推奨）",
		category: "other",
		params: [{ name: "accountId", type: "string", required: true }],
	},
	{
		name: "subscribe_newHead",
		description: "新しいブロックヘッダーを購読（非推奨）",
		category: "other",
	},
	{
		name: "unsubscribe_newHead",
		description: "新しいブロックヘッダーの購読を解除（非推奨）",
		category: "other",
		params: [{ name: "subscriptionId", type: "string", required: true }],
	},
];

/**
 * カテゴリ別にメソッドをグループ化
 */
export function getMethodsByCategory(): Record<string, RpcMethod[]> {
	const grouped: Record<string, RpcMethod[]> = {};
	for (const method of RPC_METHODS) {
		if (!grouped[method.category]) {
			grouped[method.category] = [];
		}
		grouped[method.category].push(method);
	}
	return grouped;
}

/**
 * カテゴリ名の日本語表示
 */
export const CATEGORY_NAMES: Record<string, string> = {
	system: "System",
	chain: "Chain",
	state: "State",
	author: "Author",
	midnight: "Midnight",
	childstate: "Child State",
	archive: "Archive (Unstable)",
	chainhead: "ChainHead (Unstable)",
	transactionwatch: "TransactionWatch (Unstable)",
	sidechain: "Sidechain",
	offchain: "Offchain",
	grandpa: "Grandpa",
	other: "Other",
};

