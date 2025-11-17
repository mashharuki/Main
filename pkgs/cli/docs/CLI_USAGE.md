# Patient Registry CLI 使用ガイド

このドキュメントでは、Patient Registry CLIツールの使用方法を詳しく説明します。

## 目次

1. [概要](#概要)
2. [セットアップ](#セットアップ)
3. [スクリプト一覧](#スクリプト一覧)
4. [患者登録 (register-patient)](#患者登録-register-patient)
5. [統計情報取得 (get-stats)](#統計情報取得-get-stats)
6. [年齢範囲検証 (verify-age-range)](#年齢範囲検証-verify-age-range)
7. [実行例](#実行例)
8. [トラブルシューティング](#トラブルシューティング)

## 概要

Patient Registry CLIは、Midnight Blockchain上にデプロイされたPatient Registryコントラクトと対話するためのコマンドラインツールセットです。以下の機能を提供します：

- **患者データの登録**: 年齢、性別、症状データをブロックチェーンに記録
- **統計情報の取得**: 登録された患者の統計情報を取得
- **年齢範囲の検証**: 特定の年齢範囲に該当する患者の存在確認

### 主な特徴

- ✅ プライバシー保護: 症状データは自動的にハッシュ化
- ✅ 型安全: TypeScriptによる厳密な型チェック
- ✅ エラーハンドリング: 詳細なエラーメッセージとログ
- ✅ 複数環境対応: Standalone、Testnet環境をサポート

## セットアップ

### 前提条件

- Node.js 18 LTS以上
- pnpm 10.20.0
- Docker Desktop（Standalone環境の場合）
- デプロイ済みのPatient Registryコントラクト

### 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```bash
# 必須環境変数
NETWORK_ENV_VAR=testnet                    # ネットワーク選択
SEED_ENV_VAR=your-wallet-seed-here         # ウォレットシード
CONTRACT_ADDRESS=0x...                     # コントラクトアドレス

# オプション環境変数
CACHE_FILE_ENV_VAR=patient-registry.state  # キャッシュファイル名
```

詳細は[DEPLOYMENT.md](./DEPLOYMENT.md)を参照してください。

## スクリプト一覧

| スクリプト | コマンド | 目的 |
|-----------|---------|------|
| 患者登録 | `pnpm register:patient` | 患者データをコントラクトに登録 |
| 統計取得 | `pnpm stats:patient-registry` | 登録統計情報を取得 |
| 年齢範囲検証 | `pnpm verify:age-range` | 年齢範囲の患者存在確認 |

## 患者登録 (register-patient)

### 目的

患者の年齢、性別、症状データをPatient Registryコントラクトに登録します。

### 使用方法

#### 1. 環境変数の設定

以下の環境変数を設定してください：

```bash
# 必須
NETWORK_ENV_VAR=testnet              # ネットワーク選択
SEED_ENV_VAR=your-wallet-seed        # ウォレットシード
CONTRACT_ADDRESS=0x...               # コントラクトアドレス

# 患者データ（必須）
PATIENT_AGE=45                       # 患者年齢 (0-150)
PATIENT_GENDER=0                     # 患者性別 (0=Male, 1=Female, 2=Other)
PATIENT_CONDITION=Hypertension       # 患者症状（任意の文字列）

# オプション
CACHE_FILE_ENV_VAR=patient.state     # キャッシュファイル名
```

#### 2. スクリプトの実行

```bash
pnpm register:patient
```

### 環境変数の詳細

#### PATIENT_AGE（必須）

- **型**: 整数
- **範囲**: 0-150
- **説明**: 患者の年齢を指定します
- **例**: `PATIENT_AGE=45`

#### PATIENT_GENDER（必須）

- **型**: 整数
- **値**:
  - `0`: Male（男性）
  - `1`: Female（女性）
  - `2`: Other（その他）
- **説明**: 患者の性別を指定します
- **例**: `PATIENT_GENDER=0`

#### PATIENT_CONDITION（必須）

- **型**: 文字列
- **説明**: 患者の症状を指定します。この値は自動的にSHA-256でハッシュ化されてからブロックチェーンに記録されます
- **例**: `PATIENT_CONDITION="Hypertension"`
- **注意**: スペースを含む場合はクォートで囲んでください

### 出力例

成功時：

```
[INFO] Registering patient on 'testnet' network
[INFO] Target contract address: 0x123456...
[INFO] Patient data: age=45, gender=0 (Male)
[INFO] Hashing condition...
[INFO] Calling registerPatient circuit...
[INFO] Registration transaction: 0xabcdef... (block 12345)
✅ Patient registered successfully!
Transaction ID: 0xabcdef...
```

### セキュリティ上の注意

- 症状データ（PATIENT_CONDITION）は自動的にハッシュ化されます
- 元の症状データはブロックチェーンに記録されません
- ハッシュ化により、プライバシーが保護されます

## 統計情報取得 (get-stats)

### 目的

Patient Registryコントラクトに登録されている患者の統計情報を取得します。

### 使用方法

#### 1. 環境変数の設定

以下の環境変数を設定してください：

```bash
# 必須
NETWORK_ENV_VAR=testnet              # ネットワーク選択
SEED_ENV_VAR=your-wallet-seed        # ウォレットシード
CONTRACT_ADDRESS=0x...               # コントラクトアドレス

# オプション
CACHE_FILE_ENV_VAR=stats.state       # キャッシュファイル名
```

#### 2. スクリプトの実行

```bash
pnpm stats:patient-registry
```

### 出力例

```
[INFO] Fetching statistics from 'testnet' network
[INFO] Target contract address: 0x123456...

=== Patient Registry Statistics ===
Total Registrations: 150
Male: 75
Female: 60
Other: 15
===================================

✅ Statistics retrieved successfully!
```

### 取得できる情報

- **Total Registrations**: 総登録患者数
- **Male**: 男性患者数
- **Female**: 女性患者数
- **Other**: その他の性別の患者数

### 用途

- データ分析の基礎情報として活用
- 研究対象となる患者群の規模確認
- システムの動作確認

## 年齢範囲検証 (verify-age-range)

### 目的

指定した年齢範囲に該当する患者が存在するかを確認します。

### 使用方法

#### 1. 環境変数の設定

以下の環境変数を設定してください：

```bash
# 必須
NETWORK_ENV_VAR=testnet              # ネットワーク選択
SEED_ENV_VAR=your-wallet-seed        # ウォレットシード
CONTRACT_ADDRESS=0x...               # コントラクトアドレス

# 年齢範囲（必須）
MIN_AGE=40                           # 最小年齢 (0-150)
MAX_AGE=60                           # 最大年齢 (0-150)

# オプション
CACHE_FILE_ENV_VAR=verify.state      # キャッシュファイル名
```

#### 2. スクリプトの実行

```bash
pnpm verify:age-range
```

### 環境変数の詳細

#### MIN_AGE（必須）

- **型**: 整数
- **範囲**: 0-150
- **説明**: 検証する年齢範囲の最小値
- **例**: `MIN_AGE=40`

#### MAX_AGE（必須）

- **型**: 整数
- **範囲**: 0-150
- **説明**: 検証する年齢範囲の最大値
- **例**: `MAX_AGE=60`
- **制約**: MIN_AGE以上である必要があります

### 出力例

該当患者が存在する場合：

```
[INFO] Verifying age range on 'testnet' network
[INFO] Target contract address: 0x123456...
[INFO] Age range: 40-60
[INFO] Calling verifyAgeRange circuit...
✅ Patients in age range 40-60 exist.
```

該当患者が存在しない場合：

```
[INFO] Verifying age range on 'testnet' network
[INFO] Target contract address: 0x123456...
[INFO] Age range: 40-60
[INFO] Calling verifyAgeRange circuit...
❌ No patients in age range 40-60.
```

### 用途

- 研究対象となる患者群の存在確認
- データ分析前の事前チェック
- 年齢層別の患者分布確認

## 実行例

### シナリオ1: 新規患者の登録

```bash
# 環境変数を設定
export NETWORK_ENV_VAR=testnet
export SEED_ENV_VAR=your-wallet-seed
export CONTRACT_ADDRESS=0x123456789abcdef...
export PATIENT_AGE=45
export PATIENT_GENDER=0
export PATIENT_CONDITION="Hypertension"

# 患者を登録
pnpm register:patient

# 統計を確認
pnpm stats:patient-registry
```

### シナリオ2: 複数患者の登録

```bash
# 1人目の患者
export PATIENT_AGE=30
export PATIENT_GENDER=1
export PATIENT_CONDITION="Diabetes"
pnpm register:patient

# 2人目の患者
export PATIENT_AGE=55
export PATIENT_GENDER=0
export PATIENT_CONDITION="Heart Disease"
pnpm register:patient

# 3人目の患者
export PATIENT_AGE=70
export PATIENT_GENDER=2
export PATIENT_CONDITION="Arthritis"
pnpm register:patient

# 統計を確認
pnpm stats:patient-registry
```

### シナリオ3: 年齢範囲の検証

```bash
# 40-60歳の患者が存在するか確認
export MIN_AGE=40
export MAX_AGE=60
pnpm verify:age-range

# 20-30歳の患者が存在するか確認
export MIN_AGE=20
export MAX_AGE=30
pnpm verify:age-range
```

### シナリオ4: Standalone環境でのテスト

```bash
# Docker環境を起動
docker compose -f standalone.yml up -d

# 環境変数を設定
export NETWORK_ENV_VAR=standalone
export SEED_ENV_VAR=test-seed-for-standalone
export CONTRACT_ADDRESS=0x...  # デプロイ時に取得したアドレス

# テストデータを登録
export PATIENT_AGE=25
export PATIENT_GENDER=0
export PATIENT_CONDITION="Test Condition"
pnpm register:patient

# 統計を確認
pnpm stats:patient-registry

# Docker環境を停止
docker compose -f standalone.yml down
```

## トラブルシューティング

### よくあるエラーと解決方法

#### 1. "PATIENT_AGE is required"

**エラーメッセージ**:
```
Error: PATIENT_AGE is required.
```

**原因**: PATIENT_AGE環境変数が設定されていない

**解決方法**:
```bash
export PATIENT_AGE=45
```

#### 2. "PATIENT_AGE must be between 0 and 150"

**エラーメッセージ**:
```
Error: PATIENT_AGE must be between 0 and 150. Received: 200
```

**原因**: 年齢が有効範囲外

**解決方法**:
```bash
# 0-150の範囲で指定
export PATIENT_AGE=45
```

#### 3. "PATIENT_GENDER must be 0, 1, or 2"

**エラーメッセージ**:
```
Error: PATIENT_GENDER must be 0, 1, or 2.
```

**原因**: 性別の値が無効

**解決方法**:
```bash
# 0=Male, 1=Female, 2=Other
export PATIENT_GENDER=0
```

#### 4. "PATIENT_CONDITION is required"

**エラーメッセージ**:
```
Error: PATIENT_CONDITION is required.
```

**原因**: PATIENT_CONDITION環境変数が設定されていない

**解決方法**:
```bash
export PATIENT_CONDITION="Hypertension"
```

#### 5. "MIN_AGE must be less than or equal to MAX_AGE"

**エラーメッセージ**:
```
Error: MIN_AGE must be less than or equal to MAX_AGE.
```

**原因**: MIN_AGEがMAX_AGEより大きい

**解決方法**:
```bash
export MIN_AGE=40
export MAX_AGE=60  # MIN_AGE以上の値を指定
```

#### 6. "Invalid contract address"

**エラーメッセージ**:
```
Error: Invalid contract address: 0xinvalid
```

**原因**: コントラクトアドレスの形式が無効

**解決方法**:
```bash
# 正しいアドレス形式で指定
export CONTRACT_ADDRESS=0x1234567890abcdef...
```

#### 7. "Network connection failed"

**エラーメッセージ**:
```
Error: Failed to connect to testnet network.
```

**原因**: ネットワークに接続できない

**解決方法**:

Standalone環境の場合:
```bash
# Dockerコンテナが起動しているか確認
docker compose -f standalone.yml ps

# 起動していない場合は起動
docker compose -f standalone.yml up -d
```

Testnet環境の場合:
```bash
# インターネット接続を確認
ping google.com

# カスタムエンドポイントを試す
export RPC_URL=https://rpc.testnet-02.midnight.network/
export INDEXER_URL=https://indexer.testnet-02.midnight.network/
```

#### 8. "Insufficient funds"

**エラーメッセージ**:
```
Error: Insufficient funds to complete transaction.
```

**原因**: ウォレットの残高不足

**解決方法**:

Standalone環境:
```bash
# Faucetから自動的に資金が供給されるまで待機（通常1-2分）
```

Testnet環境:
```bash
# FaucetからtDUSTを取得
# https://faucet.testnet-02.midnight.network/
```

### ログの確認

詳細なログは以下のディレクトリに保存されます：

```bash
# Standalone環境
tail -f logs/standalone/combined.log

# Testnet環境
tail -f logs/testnet/combined.log
```

### デバッグモード

より詳細なログを出力する場合：

```bash
DEBUG='*' pnpm register:patient
```

### 環境変数の確認

現在設定されている環境変数を確認：

```bash
# すべての環境変数を表示
env | grep -E '(NETWORK|SEED|CONTRACT|PATIENT|MIN_AGE|MAX_AGE)'

# 特定の環境変数を確認
echo $PATIENT_AGE
echo $CONTRACT_ADDRESS
```

### リソースのクリーンアップ

スクリプト実行後、リソースは自動的にクリーンアップされますが、問題が発生した場合は手動でクリーンアップできます：

```bash
# キャッシュファイルを削除
rm -f *.state

# ログファイルを削除
rm -rf logs/

# Docker環境をクリーンアップ（Standalone環境の場合）
docker compose -f standalone.yml down -v
```

## 関連ドキュメント

- [README.md](../README.md) - プロジェクト概要
- [DEPLOYMENT.md](./DEPLOYMENT.md) - デプロイ手順
- [Midnight Documentation](https://docs.midnight.network/) - 公式ドキュメント

## サポート

問題が解決しない場合は、以下を確認してください：

1. [Midnight Discord](https://discord.gg/midnight)でコミュニティに質問
2. [GitHub Issues](https://github.com/midnight-ntwrk/midnight/issues)で既知の問題を確認
3. プロジェクトのREADME.mdを参照

---

**最終更新**: 2025-01-15
**バージョン**: 1.0.0
