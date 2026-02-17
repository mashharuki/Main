## Compact言語の核
- Compactは静的型付けのスマートコントラクト言語で、各式は型を持ち、circuitやwitnessの引数・戻り値の型注釈が必須
- データの状態は public/ledger、private、witness に分かれ、公開台帳とローカル状態を明示的に扱う
- コンパイル成果物には回路の証明鍵、検証鍵、zkir、およびTypeScriptクライアントが含まれる
- TypeScript出力は compact-runtime を前提に設計されるため、ランタイム依存を確認する

## 参考ソース
- https://docs.midnight.network/compact
- https://docs.midnight.network/develop/reference/compact/lang-ref
