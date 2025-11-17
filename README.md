# NextMed

## Setup

### Install Dependencies

```bash
pnpm install
```

### Install Submodules

This project uses Git submodules. When setting up for the first time or reinstalling submodules, run the following command:

```bash
git submodule update --init --recursive
```

**Command Options:**

* `--init` - Initialize uninitialized submodules
* `--recursive` - Recursively process submodules within submodules

**Other Useful Commands:**

* Update a specific submodule: `git submodule update --init references/helixchain`
* Update to latest commit: `git submodule update --remote`
* Update all to latest: `git submodule update --remote --recursive`

## Start Development Server

```bash
pnpm dev
```

## Contract Build

```bash
pnpm contract compact:all
```

## Contract Test

```bash
pnpm contract test
```

## Contract's CLI Build

```bash
pnpm cli build
```

## Testnet ZKProof Server Start

```bash
docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'
```

```bash
docker ps
```

localhost:6300でサーバーが起動していればOK

```bash
CONTAINER ID   IMAGE                          COMMAND                  CREATED          STATUS          PORTS                                         NAMES
a62d9787f7a1   midnightnetwork/proof-server   "/nix/store/qa9fb15p…"   25 seconds ago   Up 24 seconds   0.0.0.0:6300->6300/tcp, [::]:6300->6300/tcp   flamboyant_roentgen
```

## Contarct Deploy (via CLI)

```bash
pnpm cli deploy:patient-registry
```

デプロイ後に`.env`の`CONTRACT_ADDRESS`の値を更新する必要あり

## Register Patient Data (via CLI)

```bash
pnpm cli run register:patient
```

## Check Status of Patient Data (via CLI)

```bash
pnpm cli run stats:patient-registry
```

## Verify Patient Data (via CLI)

```bash
pnpm cli run verify:age-range
```