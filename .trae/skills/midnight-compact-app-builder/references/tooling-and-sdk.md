## Proof Server
- Proof ServerはZK証明生成に必須で、ローカルDocker起動が一般的
- 例: docker run -p 6300:6300 midnightnetwork/proof-server -- midnight-proof-server --network testnet
- 稼働確認は http://localhost:6300 への疎通で行う

## Wallet SDK / Wallet API
- Wallet APIはトランザクションのbalance/prove/submit/transferと状態同期を提供する
- Wallet SDKはWallet APIの実装で、アプリ側から利用する
- 新規生成コインはWallet側に明示的に通知する必要がある

## compact-runtime
- TypeScript出力は compact-runtime を利用し、ネットワークID設定やCircuitContext/WitnessContextを通じて回路実行を行う
- ProofDataやCircuitResultsなどの構造体は回路I/Oの取り扱いに直結する

## 参考ソース
- https://docs.midnight.network/getting-started/installation
- https://docs.midnight.network/develop/reference/midnight-api/wallet-api/interfaces/Wallet
- https://docs.midnight.network/develop/reference/midnight-api/compact-runtime/
