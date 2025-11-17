# Contract Unit Test Logs

```bash
[TEMP] Skipping version check: compiled=0.8.1, runtime=0.9.0

 ✓ src/test/patient-registry.test.ts (33 tests) 195ms
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
   ✓ Patient Registry Contract (24)
     ✓ constructor (3)
       ✓ should initialize all counters to 0 24ms
       ✓ should set initial state to UNREGISTERED 6ms
       ✓ should generate deterministic initial state 20ms
     ✓ registerPatient (8)
       ✓ should register a male patient successfully 8ms
       ✓ should register a female patient successfully 7ms
       ✓ should register other gender patient successfully 7ms
       ✓ should handle multiple patient registrations 10ms
       ✓ should accept age = 0 (boundary test) 6ms
       ✓ should accept age = 150 (boundary test) 6ms
       ✓ should reject age > 150 5ms
       ✓ should handle unknown gender code as OTHER 6ms
     ✓ getRegistrationStats (3)
       ✓ should return initial stats (all zeros) 5ms
       ✓ should return correct stats after single registration 7ms
       ✓ should return correct stats after multiple registrations 14ms
     ✓ verifyAgeRange (7)
       ✓ should return true for age within range 4ms
       ✓ should return true for age at minimum boundary 4ms
       ✓ should return true for age at maximum boundary 4ms
       ✓ should return false for age below minimum 4ms
       ✓ should return false for age above maximum 4ms
       ✓ should handle edge case where min equals max 4ms
       ✓ should work with zero age 4ms
     ✓ Integration: Real-world scenarios (3)
       ✓ should handle typical patient registration workflow 7ms
       ✓ should support age-based research eligibility check 4ms
       ✓ should maintain accurate statistics across multiple registrations 20ms

 Test Files  1 passed (1)
      Tests  33 passed (33)
   Start at  10:53:41
   Duration  400ms (transform 66ms, setup 0ms, collect 102ms, tests 195ms, environment 0ms, prepare 6ms)
```