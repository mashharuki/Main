# Contract Unit Test Logs

```bash
 RUN  v4.0.8 /Users/harukikondo/git/Main/pkgs/contract

 ✓ src/test/patient-registry.test.ts (9 tests) 4ms
   ✓ Patient Registry Utils (9)
     ✓ validateAge (2)
       ✓ should accept valid ages 1ms
       ✓ should reject invalid ages 0ms
     ✓ genderToCode (1)
       ✓ should convert gender to code 0ms
     ✓ codeToGender (1)
       ✓ should convert code to gender 0ms
     ✓ hashCondition (3)
       ✓ should generate consistent hashes 0ms
       ✓ should generate different hashes for different conditions 0ms
       ✓ should return bigint 0ms
     ✓ formatStats (2)
       ✓ should format stats correctly 0ms
       ✓ should handle zero values 0ms

 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  10:17:43
   Duration  145ms (transform 29ms, setup 0ms, collect 40ms, tests 4ms, environment 0ms, prepare 5ms)
```