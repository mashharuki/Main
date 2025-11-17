# Patient Registry CLI - 設計書

## 概要

本設計書は、Patient Registryコントラクトと対話するための包括的なCLIツールセットの実装を定義します。
既存のcounterスクリプト（deploy.ts、increment.ts）のパターンを踏襲し、Patient Registry専用の機能を追加します。

## アーキテクチャ

### 全体構成図

```
┌─────────────────────────────────────────────────────────────────┐
│                    Developer Machine                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  CLI Scripts                                            │    │
│  │  ├─ deploy-patient-registry.ts (既存)                  │    │
│  │  ├─ register-patient.ts (新規)                         │    │
│  │  ├─ get-stats.ts (新規)                                │    │
│  │  └─ verify-age-range.ts (新規)                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  API Layer (src/api.ts)                                │    │
│  │  ├─ patientRegistryContractInstance                    │    │
│  │  ├─ joinPatientRegistryContract()                      │    │
│  │  ├─ deployPatientRegistry()                            │    │
│  │  ├─ registerPatient()                                  │    │
│  │  ├─ getRegistrationStats()                             │    │
│  │  └─ verifyAgeRange()                                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Providers                                              │    │
│  │  ├─ WalletProvider                                      │    │
│  │  ├─ MidnightProvider                                    │    │
│  │  ├─ PublicDataProvider                                  │    │
│  │  ├─ PrivateStateProvider                               │    │
│  │  ├─ ProofProvider                                       │    │
│  │  └─ ZkConfigProvider                                    │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Midnight Blockchain Network                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Patient Registry Contract                              │    │
│  │  ├─ registrationCount: Counter                          │    │
│  │  ├─ maleCount: Counter                                  │    │
│  │  ├─ femaleCount: Counter                                │    │
│  │  ├─ otherCount: Counter                                 │    │
│  │  └─ ageRangeExists: Map<AgeRange, Boolean>             │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## ファイル構成

```
pkgs/cli/
├── scripts/
│   ├── deploy-patient-registry.ts          # 既存（Patient Registry用）
│   ├── register-patient.ts                 # 新規（患者登録）
│   ├── get-stats.ts                        # 新規（統計取得）
│   └── verify-age-range.ts                 # 新規（年齢範囲検証）
├── src/
│   ├── api.ts                              # 拡張（Patient Registry関数追加）
│   ├── config.ts                           # 既存（環境設定）
│   └── utils/
│       ├── common-types.ts                 # 拡張（Patient Registry型追加）
│       └── logger-utils.ts                 # 既存（ログ）
├── .env.example                            # 更新（Patient Registry用の例を追加）
├── deployment-patient-registry.json        # 既存（デプロイ情報）
└── package.json                            # 更新（スクリプト追加）
```

## コンポーネント設計

### 1. register-patient.ts（新規）

**目的**: 患者データをコントラクトに登録

**環境変数**:
```typescript
const {
  NETWORK_ENV_VAR,      // ネットワーク選択
  SEED_ENV_VAR,         // ウォレットシード
  CONTRACT_ADDRESS,     // コントラクトアドレス
  PATIENT_AGE,          // 患者年齢
  PATIENT_GENDER,       // 患者性別 (0=Male, 1=Female, 2=Other)
  PATIENT_CONDITION,    // 患者症状
  CACHE_FILE_ENV_VAR,   // キャッシュファイル名
} = process.env;
```

**実装フロー**:
```typescript
const main = async () => {
  // 1. 環境変数の検証
  const network = resolveNetwork(NETWORK_ENV_VAR);
  const seed = ensureSeed(SEED_ENV_VAR);
  const contractAddress = ensureContractAddress(CONTRACT_ADDRESS);
  const age = parseAge(PATIENT_AGE);
  const gender = parseGender(PATIENT_GENDER);
  const condition = ensureCondition(PATIENT_CONDITION);
  
  // 2. 設定とロガーの初期化
  const config = buildConfig(network);
  logger = await createLogger(config.logDir);
  api.setLogger(logger);
  
  // 3. ウォレット作成
  const wallet = await api.buildWalletAndWaitForFunds(
    config, 
    seed, 
    cacheFileName
  );
  
  // 4. プロバイダー設定
  const providers = await api.configureProviders(wallet, config);
  
  // 5. コントラクトに接続
  const contract = await api.joinPatientRegistryContract(
    providers, 
    contractAddress
  );
  
  // 6. 患者登録
  const txInfo = await api.registerPatient(
    contract,
    age,
    gender,
    condition
  );
  
  // 7. 結果表示
  logger.info(`Registration transaction: ${txInfo.txId}`);
  console.log(`Patient registered. txId=${txInfo.txId}`);
  
  // 8. 状態保存
  await api.saveState(wallet, cacheFileName);
};
```

**ヘルパー関数**:
```typescript
const parseAge = (value: string | undefined): bigint => {
  if (value === undefined || value.trim() === "") {
    throw new Error("PATIENT_AGE is required.");
  }
  const age = Number(value);
  if (!Number.isSafeInteger(age) || age < 0 || age > 150) {
    throw new Error("PATIENT_AGE must be between 0 and 150.");
  }
  return BigInt(age);
};

const parseGender = (value: string | undefined): bigint => {
  if (value === undefined || value.trim() === "") {
    throw new Error("PATIENT_GENDER is required (0=Male, 1=Female, 2=Other).");
  }
  const gender = Number(value);
  if (![0, 1, 2].includes(gender)) {
    throw new Error("PATIENT_GENDER must be 0, 1, or 2.");
  }
  return BigInt(gender);
};

const ensureCondition = (value: string | undefined): string => {
  if (value === undefined || value.trim() === "") {
    throw new Error("PATIENT_CONDITION is required.");
  }
  return value.trim();
};
```

### 2. get-stats.ts（新規）

**目的**: 登録統計情報を取得・表示

**環境変数**:
```typescript
const {
  NETWORK_ENV_VAR,
  SEED_ENV_VAR,
  CONTRACT_ADDRESS,
  CACHE_FILE_ENV_VAR,
} = process.env;
```

**実装フロー**:
```typescript
const main = async () => {
  // 1-4. 初期化（register-patient.tsと同様）
  
  // 5. コントラクトに接続
  const contract = await api.joinPatientRegistryContract(
    providers,
    contractAddress
  );
  
  // 6. 統計情報取得
  const stats = await api.getRegistrationStats(contract);
  
  // 7. 結果表示
  displayStats(stats);
};

const displayStats = (stats: RegistrationStats) => {
  console.log("\n=== Patient Registry Statistics ===");
  console.log(`Total Registrations: ${stats.totalCount}`);
  console.log(`Male: ${stats.maleCount}`);
  console.log(`Female: ${stats.femaleCount}`);
  console.log(`Other: ${stats.otherCount}`);
  console.log("===================================\n");
  
  logger.info("Statistics retrieved successfully", stats);
};
```

### 3. verify-age-range.ts（新規）

**目的**: 特定年齢範囲の患者存在確認

**環境変数**:
```typescript
const {
  NETWORK_ENV_VAR,
  SEED_ENV_VAR,
  CONTRACT_ADDRESS,
  MIN_AGE,
  MAX_AGE,
  CACHE_FILE_ENV_VAR,
} = process.env;
```

**実装フロー**:
```typescript
const main = async () => {
  // 1. 環境変数の検証
  const minAge = parseAge(MIN_AGE, "MIN_AGE");
  const maxAge = parseAge(MAX_AGE, "MAX_AGE");
  
  if (minAge > maxAge) {
    throw new Error("MIN_AGE must be less than or equal to MAX_AGE.");
  }
  
  // 2-5. 初期化とコントラクト接続
  
  // 6. 年齢範囲検証
  const exists = await api.verifyAgeRange(contract, minAge, maxAge);
  
  // 7. 結果表示
  if (exists) {
    console.log(`✅ Patients in age range ${minAge}-${maxAge} exist.`);
    logger.info(`Age range verification: true`, { minAge, maxAge });
  } else {
    console.log(`❌ No patients in age range ${minAge}-${maxAge}.`);
    logger.info(`Age range verification: false`, { minAge, maxAge });
  }
};
```

### 4. api.ts拡張

**注意**: 既存のCounter関連の関数（`getCounterLedgerState`, `counterContractInstance`, `joinContract`, `deploy`, `increment`, `displayCounterValue`）は**そのまま残します**。Patient Registry用の関数を**追加**します。

**新規エクスポート**:
```typescript
// ========================================
// Patient Registry関連の関数（新規追加）
// ========================================

// Patient Registryコントラクトインスタンス
export const patientRegistryContractInstance: PatientRegistryContract = 
  new PatientRegistry.Contract(patientRegistryWitnesses);

// コントラクトに接続
export const joinPatientRegistryContract = async (
  providers: PatientRegistryProviders,
  contractAddress: string,
): Promise<DeployedPatientRegistryContract> => {
  const contract = await findDeployedContract(providers, {
    contractAddress,
    contract: patientRegistryContractInstance,
    privateStateId: "patientRegistryPrivateState",
    initialPrivateState: {},
  });
  logger.info(
    `Joined Patient Registry contract at: ${contract.deployTxData.public.contractAddress}`
  );
  return contract;
};

// 患者登録
export const registerPatient = async (
  contract: DeployedPatientRegistryContract,
  age: bigint,
  gender: bigint,
  condition: string,
): Promise<FinalizedTxData> => {
  logger.info("Registering patient...", { age, gender, condition });
  
  // 症状をハッシュ化
  const conditionHash = hashCondition(condition);
  
  // registerPatient circuitを呼び出し
  const finalizedTxData = await contract.callTx.registerPatient(
    age,
    gender,
    conditionHash
  );
  
  logger.info(
    `Registration transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`
  );
  
  return finalizedTxData.public;
};

// 統計情報取得
export const getRegistrationStats = async (
  contract: DeployedPatientRegistryContract,
): Promise<RegistrationStats> => {
  logger.info("Fetching registration statistics...");
  
  // getRegistrationStats circuitを呼び出し
  const stats = await contract.callTx.getRegistrationStats();
  
  return {
    totalCount: stats[0],
    maleCount: stats[1],
    femaleCount: stats[2],
    otherCount: stats[3],
  };
};

// 年齢範囲検証
export const verifyAgeRange = async (
  contract: DeployedPatientRegistryContract,
  minAge: bigint,
  maxAge: bigint,
): Promise<boolean> => {
  logger.info("Verifying age range...", { minAge, maxAge });
  
  // verifyAgeRange circuitを呼び出し
  const exists = await contract.callTx.verifyAgeRange(minAge, maxAge);
  
  return exists;
};

// ヘルパー: 症状のハッシュ化
const hashCondition = (condition: string): bigint => {
  // SHA-256でハッシュ化し、bigintに変換
  const hash = createHash('sha256')
    .update(condition)
    .digest('hex');
  return BigInt('0x' + hash.substring(0, 16)); // 最初の64ビットを使用
};
```

### 5. common-types.ts拡張

**新規型定義**:
```typescript
import type { PatientRegistry } from '../../../contract/dist/index.js';

// Patient Registryプロバイダー型
export type PatientRegistryProviders = {
  privateStateProvider: PrivateStateProvider<typeof PatientRegistryPrivateStateId>;
  publicDataProvider: PublicDataProvider;
  zkConfigProvider: ZkConfigProvider<PatientRegistryCircuitKeys>;
  proofProvider: ProofProvider;
  walletProvider: WalletProvider;
  midnightProvider: MidnightProvider;
};

// Patient Registryコントラクト型
export type PatientRegistryContract = InstanceType<typeof PatientRegistry.Contract>;

// デプロイ済みPatient Registryコントラクト型
export type DeployedPatientRegistryContract = {
  contract: PatientRegistryContract;
  deployTxData: {
    public: {
      contractAddress: ContractAddress;
      txId: TransactionId;
      blockHeight: bigint;
    };
  };
  callTx: {
    registerPatient: (
      age: bigint,
      gender: bigint,
      conditionHash: bigint
    ) => Promise<FinalizedTxData>;
    getRegistrationStats: () => Promise<[bigint, bigint, bigint, bigint]>;
    verifyAgeRange: (minAge: bigint, maxAge: bigint) => Promise<boolean>;
  };
};

// 統計情報型
export type RegistrationStats = {
  totalCount: bigint;
  maleCount: bigint;
  femaleCount: bigint;
  otherCount: bigint;
};

// Patient Registryプライベート状態ID
export const PatientRegistryPrivateStateId = 'patientRegistryPrivateState' as const;

// Patient Registry circuit keys
export type PatientRegistryCircuitKeys = 
  | 'registerPatient'
  | 'getRegistrationStats'
  | 'verifyAgeRange';
```

## データフロー

### 患者登録フロー

```
1. ユーザー入力（環境変数）
   ↓
2. 環境変数検証
   ├─ PATIENT_AGE: 0-150の整数
   ├─ PATIENT_GENDER: 0, 1, 2のいずれか
   └─ PATIENT_CONDITION: 非空文字列
   ↓
3. 症状のハッシュ化
   condition → SHA-256 → bigint
   ↓
4. コントラクト呼び出し
   registerPatient(age, gender, conditionHash)
   ↓
5. トランザクション送信
   ↓
6. ブロックチェーンに記録
   ├─ registrationCount++
   ├─ maleCount++ (gender=0の場合)
   ├─ femaleCount++ (gender=1の場合)
   ├─ otherCount++ (gender=2の場合)
   └─ ageRangeExists[minAge-maxAge] = true
   ↓
7. 結果表示
```

### 統計取得フロー

```
1. コントラクトアドレス指定
   ↓
2. コントラクトに接続
   ↓
3. getRegistrationStats呼び出し
   ↓
4. レジャー状態から統計取得
   ├─ registrationCount
   ├─ maleCount
   ├─ femaleCount
   └─ otherCount
   ↓
5. フォーマットして表示
```

### 年齢範囲検証フロー

```
1. 年齢範囲指定（MIN_AGE, MAX_AGE）
   ↓
2. 範囲の妥当性検証
   MIN_AGE ≤ MAX_AGE
   ↓
3. verifyAgeRange呼び出し
   ↓
4. コントラクト内で検証
   ageRangeExists[minAge-maxAge]をチェック
   ↓
5. 結果（true/false）を返す
   ↓
6. 結果表示
```

## エラーハンドリング

### 共通エラーハンドリングパターン

```typescript
const main = async () => {
  let wallet: Wallet | undefined;
  let providers: Providers | undefined;
  
  try {
    // メイン処理
  } catch (error) {
    // エラーログ
    if (logger !== undefined) {
      if (error instanceof Error) {
        logger.error(`Operation failed: ${error.message}`);
        logger.debug(error.stack ?? "");
      } else {
        logger.error(`Operation failed: ${String(error)}`);
      }
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  } finally {
    // リソースクリーンアップ
    if (providers !== undefined) {
      await closeIfPossible(
        providers.privateStateProvider,
        "private state provider"
      );
    }
    if (wallet !== undefined) {
      await closeIfPossible(wallet, "wallet");
    }
  }
};
```

### 個別エラーケース

1. **環境変数未設定**
```typescript
if (value === undefined || value.trim() === "") {
  throw new Error(`${varName} is required. Please set the environment variable.`);
}
```

2. **無効な値**
```typescript
if (age < 0 || age > 150) {
  throw new Error(`PATIENT_AGE must be between 0 and 150. Received: ${age}`);
}
```

3. **コントラクトアドレス無効**
```typescript
try {
  assertIsContractAddress(address);
} catch (error) {
  throw new Error(`Invalid contract address: ${address}`);
}
```

4. **ネットワーク接続失敗**
```typescript
try {
  await wallet.connect();
} catch (error) {
  throw new Error(
    `Failed to connect to ${network} network. ` +
    `Please check your network configuration.`
  );
}
```

## 環境設定

### .env.example更新

```bash
# ========================================
# Network Configuration
# ========================================
# Options: standalone, testnet-local, testnet
NETWORK_ENV_VAR=testnet

# ========================================
# Wallet Configuration
# ========================================
# Your wallet seed (KEEP SECRET!)
SEED_ENV_VAR=your-wallet-seed-here

# Cache file for wallet state
CACHE_FILE_ENV_VAR=patient-registry.state

# ========================================
# Contract Configuration
# ========================================
# Deployed contract address
CONTRACT_ADDRESS=0x...

# ========================================
# Patient Registration Parameters
# ========================================
# Patient age (0-150)
PATIENT_AGE=45

# Patient gender (0=Male, 1=Female, 2=Other)
PATIENT_GENDER=0

# Patient condition (will be hashed)
PATIENT_CONDITION=Hypertension

# ========================================
# Age Range Verification Parameters
# ========================================
# Minimum age for verification
MIN_AGE=40

# Maximum age for verification
MAX_AGE=60

# ========================================
# Optional: Custom Endpoints
# ========================================
# RPC_URL=https://rpc.testnet-02.midnight.network/
# INDEXER_URL=https://indexer.testnet-02.midnight.network/
```

### package.json更新

```json
{
  "scripts": {
    "deploy:patient-registry": "node --experimental-specifier-resolution=node --loader ts-node/esm scripts/deploy-patient-registry.ts",
    "register:patient": "node --experimental-specifier-resolution=node --loader ts-node/esm scripts/register-patient.ts",
    "stats:patient-registry": "node --experimental-specifier-resolution=node --loader ts-node/esm scripts/get-stats.ts",
    "verify:age-range": "node --experimental-specifier-resolution=node --loader ts-node/esm scripts/verify-age-range.ts"
  }
}
```

## 使用例

### 1. 患者登録

```bash
# 環境変数設定
export NETWORK_ENV_VAR=testnet
export SEED_ENV_VAR=your-seed
export CONTRACT_ADDRESS=0x123456...
export PATIENT_AGE=45
export PATIENT_GENDER=0
export PATIENT_CONDITION="Hypertension"

# 実行
pnpm register:patient
```

**出力例**:
```
[INFO] Registering patient on 'testnet' network
[INFO] Target contract address: 0x123456...
[INFO] Patient data: age=45, gender=0 (Male), condition=Hypertension
[INFO] Hashing condition...
[INFO] Calling registerPatient circuit...
[INFO] Registration transaction: 0xabcdef... (block 12345)
Patient registered. txId=0xabcdef...
```

### 2. 統計取得

```bash
# 環境変数設定
export NETWORK_ENV_VAR=testnet
export SEED_ENV_VAR=your-seed
export CONTRACT_ADDRESS=0x123456...

# 実行
pnpm stats:patient-registry
```

**出力例**:
```
[INFO] Fetching statistics from 'testnet' network
[INFO] Target contract address: 0x123456...

=== Patient Registry Statistics ===
Total Registrations: 150
Male: 75
Female: 60
Other: 15
===================================
```

### 3. 年齢範囲検証

```bash
# 環境変数設定
export NETWORK_ENV_VAR=testnet
export SEED_ENV_VAR=your-seed
export CONTRACT_ADDRESS=0x123456...
export MIN_AGE=40
export MAX_AGE=60

# 実行
pnpm verify:age-range
```

**出力例**:
```
[INFO] Verifying age range on 'testnet' network
[INFO] Target contract address: 0x123456...
[INFO] Age range: 40-60
[INFO] Calling verifyAgeRange circuit...
✅ Patients in age range 40-60 exist.
```

## セキュリティ考慮事項

### 1. 症状データのハッシュ化

```typescript
// 症状は常にハッシュ化してからコントラクトに送信
const hashCondition = (condition: string): bigint => {
  const hash = createHash('sha256')
    .update(condition)
    .digest('hex');
  return BigInt('0x' + hash.substring(0, 16));
};
```

### 2. 環境変数の検証

```typescript
// すべての環境変数を検証
const validateEnvVars = () => {
  const required = [
    'NETWORK_ENV_VAR',
    'SEED_ENV_VAR',
    'CONTRACT_ADDRESS',
  ];
  
  for (const varName of required) {
    if (!process.env[varName]) {
      throw new Error(`${varName} is required`);
    }
  }
};
```

### 3. ログの機密情報除外

```typescript
// ログに機密情報を含めない
logger.info("Registering patient", {
  age,
  gender,
  // conditionは含めない（ハッシュのみ）
  conditionHash: conditionHash.toString(16),
});
```

## テスト戦略

### 1. 単体テスト

```typescript
describe('parseAge', () => {
  it('should parse valid age', () => {
    expect(parseAge('45')).toBe(45n);
  });
  
  it('should throw for invalid age', () => {
    expect(() => parseAge('200')).toThrow();
    expect(() => parseAge('-1')).toThrow();
  });
});
```

### 2. 統合テスト

```bash
# Standalone環境でテスト
export NETWORK_ENV_VAR=standalone
pnpm test:register:patient
pnpm test:stats:patient-registry
pnpm test:verify:age-range
```

### 3. E2Eテスト

```bash
# Testnet環境でテスト
export NETWORK_ENV_VAR=testnet
./test-e2e.sh
```

## パフォーマンス考慮事項

1. **ウォレット状態のキャッシュ**: 毎回同期しないようにキャッシュを活用
2. **バッチ処理**: 複数患者の登録は並列化可能
3. **統計取得の最適化**: 頻繁にアクセスする場合はキャッシュを検討

## 拡張性

将来的な機能追加を考慮した設計:

1. **バッチ登録**: 複数患者を一度に登録
2. **データエクスポート**: 統計データをCSV/JSON形式でエクスポート
3. **リアルタイム監視**: 登録イベントをリアルタイムで監視
4. **Web UI**: CLIをラップしたWeb UIの提供

## 参考資料

- 既存のcounterスクリプト: `pkgs/cli/scripts/deploy.ts`, `pkgs/cli/scripts/increment.ts`
- Midnight Documentation: https://docs.midnight.network/
- helixchain参考実装: `references/helixchain/contracts/scripts/`
