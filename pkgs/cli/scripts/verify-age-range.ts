// This file is part of NextMed Patient Registry
// Copyright (C) 2025 NextMed Team
// SPDX-License-Identifier: Apache-2.0

import * as dotenv from "dotenv";
import type { Logger } from "pino";
import * as api from "../src/api.js";
import {
  type Config,
  StandaloneConfig,
  TestnetLocalConfig,
  TestnetRemoteConfig,
} from "../src/config.js";
import { createLogger } from "../src/utils/logger-utils.js";

dotenv.config();

const {
  NETWORK_ENV_VAR,
  SEED_ENV_VAR,
  CONTRACT_ADDRESS,
  MIN_AGE,
  MAX_AGE,
  CACHE_FILE_ENV_VAR,
} = process.env;

/**
 * 年齢範囲検証CLIスクリプト
 *
 * 環境変数:
 * - NETWORK_ENV_VAR: ネットワーク (standalone | testnet-local | testnet)
 * - SEED_ENV_VAR: ウォレットシード（必須）
 * - CONTRACT_ADDRESS: Patient Registryコントラクトアドレス（必須）
 * - MIN_AGE: 最小年齢 0-150（必須）
 * - MAX_AGE: 最大年齢 0-150（必須）
 * - CACHE_FILE_ENV_VAR: ウォレット状態のキャッシュファイル名（オプション）
 */

type SupportedNetwork =
  | "standalone"
  | "testnet-local"
  | "testnet"
  | "testnet-remote";

/**
 * 環境変数からネットワークを解決
 */
const resolveNetwork = (value: string | undefined): SupportedNetwork => {
  const normalized = (value ?? "testnet").toLowerCase();
  if (normalized === "testnet") {
    return "testnet";
  }
  switch (normalized) {
    case "testnet-remote":
    case "standalone":
    case "testnet-local":
      return normalized;
    default:
      throw new Error(
        `Unsupported network '${value}'. Supported: standalone, testnet-local, testnet`,
      );
  }
};

/**
 * ネットワークに応じた設定を構築
 */
const buildConfig = (network: SupportedNetwork): Config => {
  switch (network) {
    case "standalone":
      return new StandaloneConfig();
    case "testnet-local":
      return new TestnetLocalConfig();
    case "testnet":
    case "testnet-remote":
    default:
      return new TestnetRemoteConfig();
  }
};

/**
 * ウォレットシードの検証
 */
const ensureSeed = (seed: string | undefined): string => {
  if (seed === undefined || seed.trim() === "") {
    throw new Error("SEED_ENV_VAR is required. Please set the wallet seed.");
  }
  return seed.trim();
};

/**
 * コントラクトアドレスの検証
 */
const ensureContractAddress = (address: string | undefined): string => {
  if (address === undefined || address.trim() === "") {
    throw new Error(
      "CONTRACT_ADDRESS is required. Please set the deployed contract address.",
    );
  }
  return address.trim();
};

/**
 * 年齢のパース（0-150の範囲チェック）
 */
const parseAge = (value: string | undefined, varName: string): bigint => {
  if (value === undefined || value.trim() === "") {
    throw new Error(
      `${varName} is required. Please set the age value (0-150).`,
    );
  }
  const age = Number(value);
  if (!Number.isSafeInteger(age) || age < 0 || age > 150) {
    throw new Error(`${varName} must be between 0 and 150. Received: ${value}`);
  }
  return BigInt(age);
};

/**
 * デフォルトのキャッシュファイル名を生成
 */
const defaultCacheName = (seed: string, network: SupportedNetwork): string => {
  const prefix = seed.substring(0, 8);
  return `${prefix}-patient-registry-${network}.state`;
};

/**
 * リソースのクローズ（best-effort）
 */
const closeIfPossible = async (
  resource: unknown,
  label: string,
): Promise<void> => {
  if (resource !== null && typeof resource === "object") {
    const maybeClosable = resource as { close?: () => unknown };
    if (typeof maybeClosable.close === "function") {
      try {
        await Promise.resolve(maybeClosable.close());
      } catch (error) {
        if (logger !== undefined) {
          if (error instanceof Error) {
            logger.warn(`Failed to close ${label}: ${error.message}`);
            logger.debug(error.stack ?? "");
          } else {
            logger.warn(`Failed to close ${label}: ${String(error)}`);
          }
        }
      }
    }
  }
};

let logger: Logger | undefined;

/**
 * メイン処理
 */
const main = async () => {
  // 1. 環境変数の検証
  const network = resolveNetwork(NETWORK_ENV_VAR);
  const seed = ensureSeed(SEED_ENV_VAR);
  const contractAddress = ensureContractAddress(CONTRACT_ADDRESS);
  const minAge = parseAge(MIN_AGE, "MIN_AGE");
  const maxAge = parseAge(MAX_AGE, "MAX_AGE");
  const cacheFileName = CACHE_FILE_ENV_VAR ?? defaultCacheName(seed, network);

  // MIN_AGE ≤ MAX_AGEの検証
  if (minAge > maxAge) {
    throw new Error(
      `MIN_AGE must be less than or equal to MAX_AGE. MIN_AGE=${minAge}, MAX_AGE=${maxAge}`,
    );
  }

  // 2. 設定とロガーの初期化
  const config = buildConfig(network);
  logger = await createLogger(config.logDir);
  api.setLogger(logger);

  logger.info("=".repeat(60));
  logger.info("Age Range Verification");
  logger.info("=".repeat(60));
  logger.info(`Network: ${network}`);
  logger.info(`Contract Address: ${contractAddress}`);
  logger.info(`Age Range: ${minAge} - ${maxAge}`);
  logger.info(`Cache file: ${cacheFileName}`);
  logger.info("=".repeat(60));

  let wallet:
    | Awaited<ReturnType<typeof api.buildWalletAndWaitForFunds>>
    | undefined;
  let providers:
    | Awaited<ReturnType<typeof api.configurePatientRegistryProviders>>
    | undefined;

  try {
    // 3. ウォレット作成
    logger.info("Building wallet and waiting for funds...");
    wallet = await api.buildWalletAndWaitForFunds(config, seed, cacheFileName);

    // 4. プロバイダー設定
    logger.info("Configuring providers...");
    providers = await api.configurePatientRegistryProviders(wallet, config);

    // 5. コントラクトに接続
    logger.info("Connecting to Patient Registry contract...");
    const contract = await api.joinPatientRegistryContract(
      providers,
      contractAddress,
    );

    // 6. 年齢範囲検証
    logger.info("Verifying age range...");
    const exists = await api.verifyAgeRange(contract, minAge, maxAge);

    // 7. 結果表示
    logger.info("=".repeat(60));
    if (exists) {
      logger.info("✅ Verification Result: Patients exist in the age range");
      logger.info("=".repeat(60));
      console.log(`\n✅ Patients in age range ${minAge}-${maxAge} exist.`);
      console.log(
        `\nThis means there are registered patients whose age falls within the specified range.`,
      );
    } else {
      logger.info("❌ Verification Result: No patients in the age range");
      logger.info("=".repeat(60));
      console.log(`\n❌ No patients in age range ${minAge}-${maxAge}.`);
      console.log(
        `\nThis means there are no registered patients whose age falls within the specified range.`,
      );
    }

    // 8. 状態保存
    await api.saveState(wallet, cacheFileName);
  } catch (error) {
    // エラーハンドリング
    if (logger !== undefined) {
      if (error instanceof Error) {
        logger.error(`Age range verification failed: ${error.message}`);
        logger.debug(error.stack ?? "");
      } else {
        logger.error(`Age range verification failed: ${String(error)}`);
      }
    } else {
      console.error("❌ Age range verification failed:", error);
    }
    process.exitCode = 1;
  } finally {
    // リソースクリーンアップ
    if (providers !== undefined) {
      await closeIfPossible(
        providers.privateStateProvider,
        "private state provider",
      );
    }
    if (wallet !== undefined) {
      await closeIfPossible(wallet, "wallet");
    }
  }
};

/**
 * エントリーポイント
 */
await main();
