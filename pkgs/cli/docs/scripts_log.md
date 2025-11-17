# 各種コントラクトのメソッドを呼び出した時のログ

## Register Patient Data 

```bash
[17:02:19.122] INFO (57550): ============================================================
[17:02:19.124] INFO (57550): Patient Registration
[17:02:19.124] INFO (57550): ============================================================
[17:02:19.125] INFO (57550): Network: testnet-remote
[17:02:19.125] INFO (57550): Contract Address: 0200f683ce77beddfed112fdb915dde64f5075c7f2ccdbf319fd8738e89e131806cc
[17:02:19.125] INFO (57550): Patient Age: 45
[17:02:19.125] INFO (57550): Patient Gender: Male
[17:02:19.125] INFO (57550): Patient Condition: Hypertension
[17:02:19.126] INFO (57550): Cache file: 
[17:02:19.126] INFO (57550): ============================================================
[17:02:19.126] INFO (57550): Building wallet and waiting for funds...
[17:02:19.127] INFO (57550): File path for save file not found, building wallet from scratch
[17:02:19.195] INFO (57550): Your wallet seed is: <seed>
[17:02:19.196] INFO (57550): Your wallet address is: mn_shield-addr_test1j60pvf0u72y45z38hcmqznl99nmmvcggd9m3ns7zeszq9vuxverqxqx9vusaru5xcy9thmflusv6w5qpf4azghfcd7k84ef3mq8hzjg3hvyt3rtf
[17:02:19.196] INFO (57550): Your wallet balance is: 0
[17:02:19.196] INFO (57550): Waiting to receive tokens...
[17:02:19.200] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 0, transactions=0
[17:02:29.367] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 7700, transactions=8
[17:02:40.197] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 7677, transactions=46
[17:02:50.531] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 7659, transactions=75
[17:03:01.147] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 7653, transactions=83
[17:03:12.178] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 7580, transactions=126
[17:03:24.688] INFO (57550): Waiting for funds. Backend lag: 0, wallet lag: 0, transactions=153
[17:03:24.689] INFO (57550): Your wallet balance is: 1007514293
[17:03:24.689] INFO (57550): Configuring providers...
[17:03:24.714] INFO (57550): Connecting to Patient Registry contract...
[17:03:25.708] INFO (57550): Joined Patient Registry contract at: 0200f683ce77beddfed112fdb915dde64f5075c7f2ccdbf319fd8738e89e131806cc
[17:03:25.708] INFO (57550): Registering patient...
[17:03:25.708] INFO (57550): Registering patient... age=45, gender=0
[17:03:25.708] INFO (57550): Condition hashed successfully
[17:04:00.447] INFO (57550): Registration transaction 000000008ab446788586e043781eb10729e87b0c9a9d021c6752b4f4e29501302863e693 added in block 2599043
[17:04:00.448] INFO (57550): ============================================================
[17:04:00.448] INFO (57550): ✅ Registration Successful!
[17:04:00.449] INFO (57550): ============================================================
[17:04:00.449] INFO (57550): Transaction Hash: 000000008ab446788586e043781eb10729e87b0c9a9d021c6752b4f4e29501302863e693
[17:04:00.449] INFO (57550): Block Height: 2599043
[17:04:00.449] INFO (57550): ============================================================

✅ Patient registered successfully!
Transaction Hash: 000000008ab446788586e043781eb10729e87b0c9a9d021c6752b4f4e29501302863e693
Block Height: 2599043

Patient Details:
  Age: 45
  Gender: Male
  Condition: Hypertension (hashed)
[17:04:00.451] INFO (57550): Not saving cache as sync cache was not defined
```

## Check Status of Patient Data (via CLI)

```bash
[17:24:54.308] INFO (66954): Waiting for funds. Backend lag: 0, wallet lag: 7673, transactions=82
[17:25:04.373] INFO (66954): Waiting for funds. Backend lag: 0, wallet lag: 0, transactions=157
[17:25:04.414] INFO (66954): Your wallet balance is: 1006896126
[17:25:04.414] INFO (66954): Configuring providers...
[17:25:04.597] INFO (66954): Connecting to Patient Registry contract...
[17:25:05.091] INFO (66954): Joined Patient Registry contract at: 0200f683ce77beddfed112fdb915dde64f5075c7f2ccdbf319fd8738e89e131806cc
[17:25:05.091] INFO (66954): Fetching registration statistics...
[17:25:05.091] INFO (66954): Fetching registration statistics...
[error=Indexer WebSocket connection closed] | Connection lost: Indexer WebSocket connection closed
[17:25:32.859] DEBUG (66954): === Debug: statsResult structure ===
[17:25:32.860] DEBUG (66954): statsResult.public keys: nextContractState, publicTranscript, partitionedTranscript, tx, status, txId, txHash, blockHeight, blockHash
[17:25:32.860] DEBUG (66954): nextContractState found in statsResult
[17:25:32.861] DEBUG (66954): Ledger state accessed successfully
[17:25:32.862] DEBUG (66954): registrationCount: 1
[17:25:32.862] DEBUG (66954): maleCount: 1
[17:25:32.863] DEBUG (66954): femaleCount: 0
[17:25:32.864] DEBUG (66954): otherCount: 0
[17:25:32.866] INFO (66954): Statistics retrieved successfully
    totalCount: "1"
    maleCount: "1"
    femaleCount: "0"
    otherCount: "0"

==================================================
   Patient Registry Statistics
==================================================
Total Registrations: 1
--------------------------------------------------
Gender Distribution:
  Male:   1
  Female: 0
  Other:  0
==================================================

[17:25:32.867] INFO (66954): Statistics retrieved successfully
    totalCount: "1"
    maleCount: "1"
    femaleCount: "0"
    otherCount: "0"
[17:25:32.867] INFO (66954): Not saving cache as sync cache was not defined
```

## Verify Patient Data (via CLI)

```bash
[17:34:33.720] INFO (70696): ============================================================
[17:34:33.722] INFO (70696): Patient Registry Contract Verification
[17:34:33.722] INFO (70696): ============================================================
[17:34:33.722] INFO (70696): Network: testnet-remote
[17:34:33.722] INFO (70696): Cache file: 
[17:34:33.723] INFO (70696): ============================================================
[17:34:33.723] INFO (70696): Loading deployment info...
[17:34:33.724] INFO (70696): Contract Address: 0200f683ce77beddfed112fdb915dde64f5075c7f2ccdbf319fd8738e89e131806cc
[17:34:33.724] INFO (70696): Deployed At: 2025-11-17T16:57:39.614Z
[17:34:33.725] INFO (70696): Deployer: mn_shield-addr_test1j60pvf0u72y45z38hcmqznl99nmmvcggd9m3ns7zeszq9vuxverqxqx9vusaru5xcy9thmflusv6w5qpf4azghfcd7k84ef3mq8hzjg3hvyt3rtf
[17:34:33.725] INFO (70696): Building wallet...
[17:34:33.725] INFO (70696): File path for save file not found, building wallet from scratch
[17:34:33.791] INFO (70696): Your wallet seed is: <seed>
[17:34:33.791] INFO (70696): Your wallet address is: mn_shield-addr_test1j60pvf0u72y45z38hcmqznl99nmmvcggd9m3ns7zeszq9vuxverqxqx9vusaru5xcy9thmflusv6w5qpf4azghfcd7k84ef3mq8hzjg3hvyt3rtf
[17:34:33.792] INFO (70696): Your wallet balance is: 0
[17:34:33.792] INFO (70696): Waiting to receive tokens...
[17:34:33.795] INFO (70696): Waiting for funds. Backend lag: 0, wallet lag: 0, transactions=0
[17:34:46.132] INFO (70696): Waiting for funds. Backend lag: 0, wallet lag: 0, transactions=164
[17:34:46.132] INFO (70696): Your wallet balance is: 1005966166
[17:34:46.133] INFO (70696): Configuring providers...
[17:34:46.157] INFO (70696): Connecting to contract...
[17:34:46.343] INFO (70696): Joined Patient Registry contract at: 0200f683ce77beddfed112fdb915dde64f5075c7f2ccdbf319fd8738e89e131806cc
[17:34:46.343] INFO (70696): 
[17:34:46.343] INFO (70696): ============================================================
[17:34:46.343] INFO (70696): Test 1: Checking initial registration stats
[17:34:46.344] INFO (70696): ============================================================
[17:34:46.344] INFO (70696): Fetching registration statistics...
[17:35:16.232] DEBUG (70696): === Debug: statsResult structure ===
[17:35:16.233] DEBUG (70696): statsResult.public keys: nextContractState, publicTranscript, partitionedTranscript, tx, status, txId, txHash, blockHeight, blockHash
[17:35:16.233] DEBUG (70696): nextContractState found in statsResult
[17:35:16.234] DEBUG (70696): Ledger state accessed successfully
[17:35:16.235] DEBUG (70696): registrationCount: 3
[17:35:16.235] DEBUG (70696): maleCount: 2
[17:35:16.236] DEBUG (70696): femaleCount: 1
[17:35:16.237] DEBUG (70696): otherCount: 0
[17:35:16.239] INFO (70696): Statistics retrieved successfully
    totalCount: "3"
    maleCount: "2"
    femaleCount: "1"
    otherCount: "0"
[17:35:16.239] INFO (70696): Initial stats - Total: 3, Male: 2, Female: 1, Other: 0
[17:35:16.239] INFO (70696): 
[17:35:16.239] INFO (70696): ============================================================
[17:35:16.239] INFO (70696): Test 2: Testing patient registration
[17:35:16.239] INFO (70696): ============================================================
[17:35:16.239] INFO (70696): Registering male patient (Age: 30, Gender: Male, Condition: Diabetes)...
[17:35:16.239] INFO (70696): Registering patient... age=30, gender=0
[17:35:16.240] INFO (70696): Condition hashed successfully
[17:35:45.375] INFO (70696): Registration transaction 00000000467154a184b60a601aadebdb9af652917d2ce343e64653d5d50ed9ead9e32267 added in block 2599347
[17:35:45.376] INFO (70696): ✅ Male patient registered successfully
[17:35:45.377] INFO (70696): Checking updated registration stats...
[17:35:45.377] INFO (70696): Fetching registration statistics...
[17:36:16.624] DEBUG (70696): === Debug: statsResult structure ===
[17:36:16.624] DEBUG (70696): statsResult.public keys: nextContractState, publicTranscript, partitionedTranscript, tx, status, txId, txHash, blockHeight, blockHash
[17:36:16.625] DEBUG (70696): nextContractState found in statsResult
[17:36:16.625] DEBUG (70696): Ledger state accessed successfully
[17:36:16.626] DEBUG (70696): registrationCount: 4
[17:36:16.627] DEBUG (70696): maleCount: 3
[17:36:16.628] DEBUG (70696): femaleCount: 1
[17:36:16.628] DEBUG (70696): otherCount: 0
[17:36:16.631] INFO (70696): Statistics retrieved successfully
    totalCount: "4"
    maleCount: "3"
    femaleCount: "1"
    otherCount: "0"
[17:36:16.631] INFO (70696): After male registration - Total: 4, Male: 3, Female: 1, Other: 0
[17:36:16.631] INFO (70696): ✅ Male patient registration verified
[17:36:16.632] INFO (70696): 
[17:36:16.632] INFO (70696): Registering female patient (Age: 45, Gender: Female, Condition: Hypertension)...
[17:36:16.632] INFO (70696): Registering patient... age=45, gender=1
[17:36:16.632] INFO (70696): Condition hashed successfully
[17:36:46.054] INFO (70696): Registration transaction 000000009605ec612327031a23fad48995d16de8b24ae7ed28d762c9a4563bc4e9f1bec4 added in block 2599356
[17:36:46.054] INFO (70696): ✅ Female patient registered successfully
[17:36:46.054] INFO (70696): Fetching registration statistics...
[17:37:16.182] DEBUG (70696): === Debug: statsResult structure ===
[17:37:16.182] DEBUG (70696): statsResult.public keys: nextContractState, publicTranscript, partitionedTranscript, tx, status, txId, txHash, blockHeight, blockHash
[17:37:16.182] DEBUG (70696): nextContractState found in statsResult
[17:37:16.182] DEBUG (70696): Ledger state accessed successfully
[17:37:16.183] DEBUG (70696): registrationCount: 5
[17:37:16.183] DEBUG (70696): maleCount: 3
[17:37:16.184] DEBUG (70696): femaleCount: 2
[17:37:16.184] DEBUG (70696): otherCount: 0
[17:37:16.185] INFO (70696): Statistics retrieved successfully
    totalCount: "5"
    maleCount: "3"
    femaleCount: "2"
    otherCount: "0"
[17:37:16.186] INFO (70696): After female registration - Total: 5, Male: 3, Female: 2, Other: 0
[17:37:16.186] INFO (70696): ✅ Female patient registration verified
[17:37:16.186] INFO (70696): 
[17:37:16.186] INFO (70696): ============================================================
[17:37:16.186] INFO (70696): Test 3: Testing age range verification
[17:37:16.186] INFO (70696): ============================================================
[17:37:16.186] INFO (70696): Testing age 30 in range [18, 65]...
[17:37:16.186] INFO (70696): Verifying age range...
    age: "30"
    minAge: "18"
    maxAge: "65"
[17:37:16.186] INFO (70696): Age range verification completed
    age: "30"
    minAge: "18"
    maxAge: "65"
    isInRange: true
[17:37:16.186] INFO (70696): ✅ Age in range verification passed
[17:37:16.186] INFO (70696): Testing age 15 in range [18, 65]...
[17:37:16.186] INFO (70696): Verifying age range...
    age: "15"
    minAge: "18"
    maxAge: "65"
[17:37:16.186] INFO (70696): Age range verification completed
    age: "15"
    minAge: "18"
    maxAge: "65"
    isInRange: false
[17:37:16.186] INFO (70696): ✅ Age below range verification passed
[17:37:16.186] INFO (70696): Testing age 70 in range [18, 65]...
[17:37:16.186] INFO (70696): Verifying age range...
    age: "70"
    minAge: "18"
    maxAge: "65"
[17:37:16.186] INFO (70696): Age range verification completed
    age: "70"
    minAge: "18"
    maxAge: "65"
    isInRange: false
[17:37:16.186] INFO (70696): ✅ Age above range verification passed
[17:37:16.187] INFO (70696): Testing boundary values...
[17:37:16.187] INFO (70696): Verifying age range...
    age: "18"
    minAge: "18"
    maxAge: "65"
[17:37:16.187] INFO (70696): Age range verification completed
    age: "18"
    minAge: "18"
    maxAge: "65"
    isInRange: true
[17:37:16.187] INFO (70696): Verifying age range...
    age: "65"
    minAge: "18"
    maxAge: "65"
[17:37:16.187] INFO (70696): Age range verification completed
    age: "65"
    minAge: "18"
    maxAge: "65"
    isInRange: true
[17:37:16.187] INFO (70696): ✅ Boundary value verification passed
[17:37:16.187] INFO (70696): 
[17:37:16.187] INFO (70696): ============================================================
[17:37:16.187] INFO (70696): ✅ ALL VERIFICATION TESTS PASSED!
[17:37:16.187] INFO (70696): ============================================================
[17:37:16.187] INFO (70696): Summary:
[17:37:16.187] INFO (70696):   Initial total count: 3
[17:37:16.187] INFO (70696):   Final total count: 5
[17:37:16.187] INFO (70696):   Patients registered: 2
[17:37:16.187] INFO (70696):   Male patients: 3
[17:37:16.187] INFO (70696):   Female patients: 2
[17:37:16.187] INFO (70696):   Other patients: 0
[17:37:16.187] INFO (70696): 
[17:37:16.187] INFO (70696): All contract functions are working correctly!
[17:37:16.187] INFO (70696): ============================================================

✅ Contract verification successful!
All tests passed. Contract is working as expected.
[17:37:16.188] INFO (70696): Not saving cache as sync cache was not defined
```