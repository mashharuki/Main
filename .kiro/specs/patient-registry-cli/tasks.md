# Implementation Plan - Patient Registry CLI

## タスク一覧

- [x] 1. api.tsの拡張
  - Patient Registryコントラクトとの対話に必要な関数群を**追加**（既存のCounter関連関数は削除しない）
  - _Requirements: 要件4.1, 要件4.2, 要件4.3, 要件4.4, 要件4.5, 要件4.6_

- [x] 1.1 PatientRegistryコントラクトのインポート追加
  - `../../contract/dist/index.js`からPatientRegistryとwitnessesをインポート
  - 既存のCounterインポートは残す
  - _Requirements: 要件4.1_

- [x] 1.2 patientRegistryContractInstanceのエクスポート
  - PatientRegistry.Contractのインスタンスを作成してエクスポート
  - _Requirements: 要件4.1_

- [x] 1.3 joinPatientRegistryContract関数の実装
  - デプロイ済みコントラクトに接続する関数を実装
  - findDeployedContractを使用してコントラクトインスタンスを取得
  - _Requirements: 要件4.2_

- [x] 1.4 deployPatientRegistry関数の実装
  - Patient Registryコントラクトをデプロイする関数を実装（既存のdeploy関数を参考）
  - _Requirements: 要件4.3_

- [x] 1.5 registerPatient関数の実装
  - 患者データを登録する関数を実装
  - 症状のハッシュ化処理を含む
  - registerPatient circuitを呼び出し
  - _Requirements: 要件4.4_

- [x] 1.6 getRegistrationStats関数の実装
  - 登録統計情報を取得する関数を実装
  - getRegistrationStats circuitを呼び出し
  - _Requirements: 要件4.5_

- [x] 1.7 verifyAgeRange関数の実装
  - 年齢範囲を検証する関数を実装
  - verifyAgeRange circuitを呼び出し
  - _Requirements: 要件4.6_

- [x] 2. common-types.tsの拡張
  - Patient Registry用のTypeScript型定義を追加
  - _Requirements: 要件5.1, 要件5.2, 要件5.3, 要件5.4, 要件5.5_

- [x] 2.1 PatientRegistryProviders型の定義
  - プロバイダー型を定義
  - _Requirements: 要件5.1_

- [x] 2.2 PatientRegistryContract型の定義
  - コントラクト型を定義
  - _Requirements: 要件5.2_

- [x] 2.3 DeployedPatientRegistryContract型の定義
  - デプロイ済みコントラクト型を定義
  - callTxメソッドの型定義を含む
  - _Requirements: 要件5.3_

- [x] 2.4 RegistrationStats型の定義
  - 統計情報の型を定義
  - _Requirements: 要件5.4_

- [x] 2.5 PatientRegistryPrivateStateId定数の定義
  - プライベート状態IDを定義
  - _Requirements: 要件5.5_

- [x] 3. register-patient.tsスクリプトの作成
  - 患者登録用のCLIスクリプトを実装
  - _Requirements: 要件1.1, 要件1.2, 要件1.3, 要件1.4, 要件1.5_

- [x] 3.1 環境変数読み込みと検証
  - NETWORK_ENV_VAR、SEED_ENV_VAR、CONTRACT_ADDRESS、PATIENT_AGE、PATIENT_GENDER、PATIENT_CONDITIONを読み込み
  - 各環境変数の妥当性を検証
  - _Requirements: 要件1.1, 要件1.2, 要件1.3, 要件1.4_

- [x] 3.2 ヘルパー関数の実装
  - parseAge関数（0-150の範囲チェック）
  - parseGender関数（0, 1, 2のチェック）
  - ensureCondition関数（非空文字列チェック）
  - _Requirements: 要件1.2, 要件1.3, 要件1.4_

- [x] 3.3 メイン処理の実装
  - ウォレット作成、プロバイダー設定、コントラクト接続
  - registerPatient関数の呼び出し
  - 結果表示とログ出力
  - _Requirements: 要件1.5_

- [x] 3.4 エラーハンドリングの実装
  - try-catch-finallyブロックでリソースクリーンアップ
  - 詳細なエラーメッセージ
  - _Requirements: 要件7.1, 要件7.2, 要件7.3, 要件7.4, 要件7.5_

- [x] 4. get-stats.tsスクリプトの作成
  - 統計情報取得用のCLIスクリプトを実装
  - _Requirements: 要件2.1, 要件2.2, 要件2.3, 要件2.4, 要件2.5_

- [x] 4.1 環境変数読み込みと検証
  - NETWORK_ENV_VAR、SEED_ENV_VAR、CONTRACT_ADDRESSを読み込み
  - _Requirements: 要件2.1_

- [x] 4.2 統計取得処理の実装
  - getRegistrationStats関数の呼び出し
  - _Requirements: 要件2.2, 要件2.3, 要件2.4_

- [x] 4.3 統計表示関数の実装
  - displayStats関数で見やすくフォーマット
  - 総数、性別ごとの数を表示
  - _Requirements: 要件2.5_

- [x] 4.4 エラーハンドリングの実装
  - リソースクリーンアップとエラーログ
  - _Requirements: 要件7.1, 要件7.2, 要件7.3, 要件7.5_

- [x] 5. verify-age-range.tsスクリプトの作成
  - 年齢範囲検証用のCLIスクリプトを実装
  - _Requirements: 要件3.1, 要件3.2, 要件3.3, 要件3.4, 要件3.5_

- [x] 5.1 環境変数読み込みと検証
  - NETWORK_ENV_VAR、SEED_ENV_VAR、CONTRACT_ADDRESS、MIN_AGE、MAX_AGEを読み込み
  - MIN_AGE ≤ MAX_AGEの検証
  - _Requirements: 要件3.1_

- [x] 5.2 年齢範囲検証処理の実装
  - verifyAgeRange関数の呼び出し
  - _Requirements: 要件3.2, 要件3.3_

- [x] 5.3 結果表示の実装
  - 存在する場合と存在しない場合で異なるメッセージ
  - _Requirements: 要件3.4, 要件3.5_

- [x] 5.4 エラーハンドリングの実装
  - リソースクリーンアップとエラーログ
  - _Requirements: 要件7.1, 要件7.2, 要件7.3, 要件7.5_

- [x] 6. package.jsonの更新
  - 新しいCLIスクリプト用のnpmコマンドを追加
  - _Requirements: 要件6.1, 要件6.2, 要件6.3, 要件6.4, 要件6.5_

- [x] 6.1 register:patientスクリプトの追加
  - register-patient.tsを実行するコマンド
  - _Requirements: 要件6.1, 要件6.4, 要件6.5_

- [x] 6.2 stats:patient-registryスクリプトの追加
  - get-stats.tsを実行するコマンド
  - _Requirements: 要件6.2, 要件6.4, 要件6.5_

- [x] 6.3 verify:age-rangeスクリプトの追加
  - verify-age-range.tsを実行するコマンド
  - _Requirements: 要件6.3, 要件6.4, 要件6.5_

- [x] 7. .env.exampleの更新
  - Patient Registry CLI用の環境変数例を追加
  - _Requirements: 要件8.2_

- [x] 7.1 患者登録用の環境変数例を追加
  - PATIENT_AGE、PATIENT_GENDER、PATIENT_CONDITIONの例
  - _Requirements: 要件8.2_

- [x] 7.2 年齢範囲検証用の環境変数例を追加
  - MIN_AGE、MAX_AGEの例
  - _Requirements: 要件8.2_

- [x] 8. ドキュメントの作成
  - CLI使用方法のドキュメントを作成または更新
  - _Requirements: 要件8.1, 要件8.2, 要件8.3, 要件8.4, 要件8.5_

- [x] 8.1 各スクリプトの説明を追加
  - 目的、使用方法、環境変数の説明
  - _Requirements: 要件8.1, 要件8.2_

- [x] 8.2 実行例を追加
  - 各スクリプトの具体的な実行例
  - _Requirements: 要件8.3_

- [x] 8.3 トラブルシューティングガイドを追加
  - よくあるエラーと解決方法
  - _Requirements: 要件8.4_

- [x] 8.4 既存ドキュメントとの統合
  - DEPLOYMENT.mdとの整合性確保
  - _Requirements: 要件8.5_

## 完了条件

1. ✅ api.tsにPatient Registry用の6つの関数が実装されている
2. ✅ common-types.tsにPatient Registry用の型定義が追加されている
3. ✅ register-patient.tsが正常に動作する
4. ✅ get-stats.tsが正常に動作する
5. ✅ verify-age-range.tsが正常に動作する
6. ✅ package.jsonに3つの新しいスクリプトが追加されている
7. ✅ .env.exampleが更新されている
8. ✅ ドキュメントが完備されている
9. ✅ すべてのスクリプトで適切なエラーハンドリングが実装されている
10. ✅ リソースクリーンアップが適切に実装されている

## 実装の優先順位

### フェーズ1: 基盤整備（タスク1-2）
⭐⭐⭐⭐⭐ 最優先
- api.tsとcommon-types.tsの拡張
- すべてのスクリプトの基盤となる

### フェーズ2: コアスクリプト実装（タスク3-5）
⭐⭐⭐⭐ 高優先度
- 3つのCLIスクリプトの実装
- 実際の機能を提供

### フェーズ3: 設定とドキュメント（タスク6-8）
⭐⭐⭐ 中優先度
- package.json、.env.example、ドキュメントの更新
- ユーザビリティの向上

## 注意事項

1. **既存コードとの一貫性**: counterスクリプトのパターンを踏襲すること
2. **セキュリティ**: 症状データは必ずハッシュ化すること
3. **エラーハンドリング**: すべてのスクリプトで適切なエラーハンドリングを実装すること
4. **リソース管理**: finally句で必ずリソースをクリーンアップすること
5. **ログ**: 機密情報（シード、プライベートキー）をログに含めないこと
6. **型安全性**: TypeScriptの型システムを最大限活用すること
7. **テスト**: 実装後は必ずStandalone環境でテストすること

## 参考資料

- 既存のcounterスクリプト: `pkgs/cli/scripts/deploy.ts`, `pkgs/cli/scripts/increment.ts`
- 既存のapi.ts: `pkgs/cli/src/api.ts`
- 既存のcommon-types.ts: `pkgs/cli/src/utils/common-types.ts`
- helixchain参考実装: `references/helixchain/contracts/scripts/`
