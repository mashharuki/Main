import { describe, expect, test } from "vitest";
import { Gender } from "../types";
import {
  codeToGender,
  formatStats,
  genderToCode,
  hashCondition,
  validateAge,
} from "../utils";

describe("Patient Registry Utils", () => {
  describe("validateAge", () => {
    test("should accept valid ages", () => {
      expect(validateAge(0)).toBe(true);
      expect(validateAge(30)).toBe(true);
      expect(validateAge(150)).toBe(true);
    });

    test("should reject invalid ages", () => {
      expect(validateAge(-1)).toBe(false);
      expect(validateAge(151)).toBe(false);
      expect(validateAge(200)).toBe(false);
    });
  });

  describe("genderToCode", () => {
    test("should convert gender to code", () => {
      expect(genderToCode(Gender.MALE)).toBe(BigInt(0));
      expect(genderToCode(Gender.FEMALE)).toBe(BigInt(1));
      expect(genderToCode(Gender.OTHER)).toBe(BigInt(2));
    });
  });

  describe("codeToGender", () => {
    test("should convert code to gender", () => {
      expect(codeToGender(BigInt(0))).toBe(Gender.MALE);
      expect(codeToGender(BigInt(1))).toBe(Gender.FEMALE);
      expect(codeToGender(BigInt(2))).toBe(Gender.OTHER);
      expect(codeToGender(BigInt(99))).toBe(Gender.OTHER); // default
    });
  });

  describe("hashCondition", () => {
    test("should generate consistent hashes", () => {
      const hash1 = hashCondition("diabetes");
      const hash2 = hashCondition("diabetes");
      expect(hash1).toBe(hash2);
    });

    test("should generate different hashes for different conditions", () => {
      const hash1 = hashCondition("diabetes");
      const hash2 = hashCondition("hypertension");
      expect(hash1).not.toBe(hash2);
    });

    test("should return bigint", () => {
      const hash = hashCondition("test");
      expect(typeof hash).toBe("bigint");
    });
  });

  describe("formatStats", () => {
    test("should format stats correctly", () => {
      const stats: [bigint, bigint, bigint, bigint] = [
        BigInt(100),
        BigInt(40),
        BigInt(50),
        BigInt(10),
      ];
      const formatted = formatStats(stats);

      expect(formatted).toEqual({
        total: 100,
        male: 40,
        female: 50,
        other: 10,
      });
    });

    test("should handle zero values", () => {
      const stats: [bigint, bigint, bigint, bigint] = [
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
      ];
      const formatted = formatStats(stats);

      expect(formatted).toEqual({
        total: 0,
        male: 0,
        female: 0,
        other: 0,
      });
    });
  });
});

// ========================================
// コントラクト統合テスト
// ========================================
import { PatientRegistrySimulator } from "./patient-registry-simulator.js";

describe("Patient Registry Contract", () => {
  describe("constructor", () => {
    test("should initialize all counters to 0", () => {
      const simulator = new PatientRegistrySimulator();
      const ledger = simulator.getLedger();

      expect(ledger.registrationCount).toBe(0n);
      expect(ledger.maleCount).toBe(0n);
      expect(ledger.femaleCount).toBe(0n);
      expect(ledger.otherCount).toBe(0n);
      expect(ledger.ageGroupCount).toBe(0n);
    });

    test("should set initial state to UNREGISTERED", () => {
      const simulator = new PatientRegistrySimulator();
      const ledger = simulator.getLedger();

      // state: 0 = UNREGISTERED, 1 = REGISTERED, 2 = VERIFIED
      expect(ledger.state).toBe(0);
    });

    test("should generate deterministic initial state", () => {
      const simulator1 = new PatientRegistrySimulator();
      const simulator2 = new PatientRegistrySimulator();

      expect(simulator1.getLedger()).toEqual(simulator2.getLedger());
    });
  });

  describe("registerPatient", () => {
    test("should register a male patient successfully", () => {
      const simulator = new PatientRegistrySimulator();
      const conditionHash = hashCondition("diabetes");

      const ledger = simulator.registerPatient(
        BigInt(30),
        BigInt(0), // MALE
        conditionHash,
      );

      expect(ledger.registrationCount).toBe(1n);
      expect(ledger.maleCount).toBe(1n);
      expect(ledger.femaleCount).toBe(0n);
      expect(ledger.otherCount).toBe(0n);
      expect(ledger.state).toBe(1); // REGISTERED
    });

    test("should register a female patient successfully", () => {
      const simulator = new PatientRegistrySimulator();
      const conditionHash = hashCondition("hypertension");

      const ledger = simulator.registerPatient(
        BigInt(45),
        BigInt(1), // FEMALE
        conditionHash,
      );

      expect(ledger.registrationCount).toBe(1n);
      expect(ledger.maleCount).toBe(0n);
      expect(ledger.femaleCount).toBe(1n);
      expect(ledger.otherCount).toBe(0n);
    });

    test("should register other gender patient successfully", () => {
      const simulator = new PatientRegistrySimulator();
      const conditionHash = hashCondition("asthma");

      const ledger = simulator.registerPatient(
        BigInt(25),
        BigInt(2), // OTHER
        conditionHash,
      );

      expect(ledger.registrationCount).toBe(1n);
      expect(ledger.maleCount).toBe(0n);
      expect(ledger.femaleCount).toBe(0n);
      expect(ledger.otherCount).toBe(1n);
    });

    test("should handle multiple patient registrations", () => {
      const simulator = new PatientRegistrySimulator();

      // 1人目: 男性
      simulator.registerPatient(
        BigInt(30),
        BigInt(0),
        hashCondition("diabetes"),
      );

      // 2人目: 女性
      simulator.registerPatient(
        BigInt(45),
        BigInt(1),
        hashCondition("hypertension"),
      );

      // 3人目: その他
      const ledger = simulator.registerPatient(
        BigInt(25),
        BigInt(2),
        hashCondition("asthma"),
      );

      expect(ledger.registrationCount).toBe(3n);
      expect(ledger.maleCount).toBe(1n);
      expect(ledger.femaleCount).toBe(1n);
      expect(ledger.otherCount).toBe(1n);
    });

    test("should accept age = 0 (boundary test)", () => {
      const simulator = new PatientRegistrySimulator();

      const ledger = simulator.registerPatient(
        BigInt(0),
        BigInt(0),
        hashCondition("condition"),
      );

      expect(ledger.registrationCount).toBe(1n);
    });

    test("should accept age = 150 (boundary test)", () => {
      const simulator = new PatientRegistrySimulator();

      const ledger = simulator.registerPatient(
        BigInt(150),
        BigInt(0),
        hashCondition("condition"),
      );

      expect(ledger.registrationCount).toBe(1n);
    });

    test("should reject age > 150", () => {
      const simulator = new PatientRegistrySimulator();

      expect(() => {
        simulator.registerPatient(
          BigInt(151),
          BigInt(0),
          hashCondition("condition"),
        );
      }).toThrow();
    });

    test("should handle unknown gender code as OTHER", () => {
      const simulator = new PatientRegistrySimulator();

      const ledger = simulator.registerPatient(
        BigInt(30),
        BigInt(99), // 未定義のコード
        hashCondition("condition"),
      );

      expect(ledger.otherCount).toBe(1n);
    });
  });

  describe("getRegistrationStats", () => {
    test("should return initial stats (all zeros)", () => {
      const simulator = new PatientRegistrySimulator();
      const stats = simulator.getRegistrationStats();

      expect(stats).toEqual([0n, 0n, 0n, 0n]);
    });

    test("should return correct stats after single registration", () => {
      const simulator = new PatientRegistrySimulator();

      simulator.registerPatient(
        BigInt(30),
        BigInt(0),
        hashCondition("diabetes"),
      );

      const stats = simulator.getRegistrationStats();
      expect(stats).toEqual([1n, 1n, 0n, 0n]); // [total, male, female, other]
    });

    test("should return correct stats after multiple registrations", () => {
      const simulator = new PatientRegistrySimulator();

      // 男性2人、女性3人、その他1人を登録
      simulator.registerPatient(BigInt(30), BigInt(0), hashCondition("d1"));
      simulator.registerPatient(BigInt(35), BigInt(0), hashCondition("d2"));
      simulator.registerPatient(BigInt(40), BigInt(1), hashCondition("d3"));
      simulator.registerPatient(BigInt(45), BigInt(1), hashCondition("d4"));
      simulator.registerPatient(BigInt(50), BigInt(1), hashCondition("d5"));
      simulator.registerPatient(BigInt(55), BigInt(2), hashCondition("d6"));

      const stats = simulator.getRegistrationStats();
      expect(stats).toEqual([6n, 2n, 3n, 1n]);
    });
  });

  describe("verifyAgeRange", () => {
    test("should return true for age within range", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(30), BigInt(20), BigInt(40))).toBe(
        true,
      );
      expect(simulator.verifyAgeRange(BigInt(25), BigInt(18), BigInt(65))).toBe(
        true,
      );
    });

    test("should return true for age at minimum boundary", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(20), BigInt(20), BigInt(40))).toBe(
        true,
      );
    });

    test("should return true for age at maximum boundary", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(40), BigInt(20), BigInt(40))).toBe(
        true,
      );
    });

    test("should return false for age below minimum", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(19), BigInt(20), BigInt(40))).toBe(
        false,
      );
    });

    test("should return false for age above maximum", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(41), BigInt(20), BigInt(40))).toBe(
        false,
      );
    });

    test("should handle edge case where min equals max", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(30), BigInt(30), BigInt(30))).toBe(
        true,
      );
      expect(simulator.verifyAgeRange(BigInt(29), BigInt(30), BigInt(30))).toBe(
        false,
      );
      expect(simulator.verifyAgeRange(BigInt(31), BigInt(30), BigInt(30))).toBe(
        false,
      );
    });

    test("should work with zero age", () => {
      const simulator = new PatientRegistrySimulator();

      expect(simulator.verifyAgeRange(BigInt(0), BigInt(0), BigInt(10))).toBe(
        true,
      );
    });
  });

  describe("Integration: Real-world scenarios", () => {
    test("should handle typical patient registration workflow", () => {
      const simulator = new PatientRegistrySimulator();

      // 初期状態の確認
      expect(simulator.getLedger().state).toBe(0); // UNREGISTERED

      // 患者登録
      const age = BigInt(35);
      const genderCode = genderToCode(Gender.FEMALE);
      const conditionHash = hashCondition("Type 2 Diabetes");

      simulator.registerPatient(age, genderCode, conditionHash);

      // 登録後の状態確認
      const ledger = simulator.getLedger();
      expect(ledger.state).toBe(1); // REGISTERED
      expect(ledger.registrationCount).toBe(1n);

      // 統計情報の確認
      const stats = simulator.getRegistrationStats();
      const formatted = formatStats(stats);
      expect(formatted.total).toBe(1);
      expect(formatted.female).toBe(1);
    });

    test("should support age-based research eligibility check", () => {
      const simulator = new PatientRegistrySimulator();

      // 研究対象: 40-65歳の患者
      const patientAge = BigInt(50);
      const isEligible = simulator.verifyAgeRange(
        patientAge,
        BigInt(40),
        BigInt(65),
      );

      expect(isEligible).toBe(true);
    });

    test("should maintain accurate statistics across multiple registrations", () => {
      const simulator = new PatientRegistrySimulator();

      // 10人の患者を登録（様々な年齢と性別）
      const patients = [
        { age: 25, gender: 0 }, // 男性
        { age: 30, gender: 1 }, // 女性
        { age: 35, gender: 0 }, // 男性
        { age: 40, gender: 1 }, // 女性
        { age: 45, gender: 2 }, // その他
        { age: 50, gender: 0 }, // 男性
        { age: 55, gender: 1 }, // 女性
        { age: 60, gender: 0 }, // 男性
        { age: 65, gender: 1 }, // 女性
        { age: 70, gender: 2 }, // その他
      ];

      patients.forEach((patient, index) => {
        simulator.registerPatient(
          BigInt(patient.age),
          BigInt(patient.gender),
          hashCondition(`condition_${index}`),
        );
      });

      const stats = simulator.getRegistrationStats();
      const formatted = formatStats(stats);

      expect(formatted.total).toBe(10);
      expect(formatted.male).toBe(4);
      expect(formatted.female).toBe(4);
      expect(formatted.other).toBe(2);
    });
  });
});
