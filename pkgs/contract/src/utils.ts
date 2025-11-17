/**
 * Utility functions for Patient Registry Contract
 */

import { createHash } from "crypto";
import { Gender } from "./types";

/**
 * Validate age is within acceptable range (0-150 years)
 * @param age - Age to validate
 * @returns true if valid, false otherwise
 */
export function validateAge(age: number): boolean {
  return age >= 0 && age <= 150;
}

/**
 * Convert Gender enum to numeric code for Compact contract
 * @param gender - Gender enum value
 * @returns Numeric code (0=MALE, 1=FEMALE, 2=OTHER)
 */
export function genderToCode(gender: Gender): bigint {
  return BigInt(gender);
}

/**
 * Convert numeric code to Gender enum
 * @param code - Numeric code from contract
 * @returns Gender enum value
 */
export function codeToGender(code: bigint): Gender {
  const numCode = Number(code);
  if (numCode === 0) return Gender.MALE;
  if (numCode === 1) return Gender.FEMALE;
  return Gender.OTHER;
}

/**
 * Hash condition data to Field value
 * @param condition - Condition string to hash
 * @returns Field value as bigint (within Field range)
 */
export function hashCondition(condition: string): bigint {
  const hash = createHash("sha256").update(condition).digest();
  // Convert first 32 bytes to bigint
  let result = BigInt(0);
  for (let i = 0; i < Math.min(hash.length, 32); i++) {
    result = (result << BigInt(8)) | BigInt(hash[i]);
  }
  // Midnightの最大Field値でモジュロ演算を行い、範囲内に収める
  const MAX_FIELD = BigInt(
    "52435875175126190479447740508185965837690552500527637822603658699938581184512",
  );
  return result % MAX_FIELD;
}

/**
 * Format registration stats for display
 * @param stats - Registration stats tuple
 * @returns Formatted object
 */
export function formatStats(stats: [bigint, bigint, bigint, bigint]): {
  total: number;
  male: number;
  female: number;
  other: number;
} {
  return {
    total: Number(stats[0]),
    male: Number(stats[1]),
    female: Number(stats[2]),
    other: Number(stats[3]),
  };
}
