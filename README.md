# Monad flavored Hardhat starter

A Hardhat project configured for [Monad](https://www.monad.xyz) testnet and mainnet. It includes a sample `Counter` contract, tests, and a Hardhat Ignition module that deploys that contract.

This repository follows the official starter at [monad-developers/hardhat-monad](https://github.com/monad-developers/hardhat-monad) (MIT). Network settings match that template and the current [Monad docs](https://docs.monad.xyz):

| Network | Chain ID | RPC URL |
| --- | --- | --- |
| Monad Testnet | `10143` | `https://testnet-rpc.monad.xyz` |
| Monad Mainnet | `143` | `https://rpc.monad.xyz` |

## Project structure

```
hardhat-monad/
├── contracts/
│   └── Counter.sol              # Sample counter
├── test/
│   └── Counter.ts               # Tests for Counter
├── ignition/
│   └── modules/
│       └── Counter.ts           # Ignition deployment module
├── .env.example                 # Environment variable placeholders
├── hardhat.config.ts            # Compiler and Monad networks
├── package.json
├── tsconfig.json
└── LICENSE                      # MIT
```

## Prerequisites

- Node.js 20 or newer

## Install

```bash
git clone https://github.com/1lilong/hardhat-monad.git
cd hardhat-monad
npm install
```

## Environment

Copy the example env file and fill in your own values locally. `.env` is gitignored. Do not commit a private key or an API key.

```bash
cp .env.example .env
```

```
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

- `PRIVATE_KEY` is the hex private key of the account that deploys contracts. It is only required for testnet or mainnet deployment. Local tests do not use it.
- `ETHERSCAN_API_KEY` is sent to MonadScan (Etherscan API v2) when you verify a contract. Create one at [etherscan.io/apidashboard](https://etherscan.io/apidashboard). Verification also uses Sourcify through MonadVision and does not need this key.

Leave both values empty if you only want to compile and run tests.

## Test

```bash
npm test
```

That runs `hardhat test` against the in-process Hardhat network. You can also run:

```bash
npx hardhat test
npx hardhat compile
```

## Deploy

Deployments use [Hardhat Ignition](https://hardhat.org/ignition).

### Local node

Start a node in one terminal:

```bash
npx hardhat node
```

Deploy from another:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts
```

### Monad Testnet

Fund the deployer account with testnet MON from the [faucet](https://faucet.monad.xyz), set `PRIVATE_KEY` in `.env`, then:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadTestnet
```

Redeploy to a new address:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadTestnet --reset
```

Verify on MonadVision (Sourcify) and MonadScan:

```bash
npx hardhat verify <CONTRACT_ADDRESS> --network monadTestnet
```

Explorers:

- [MonadVision testnet](https://testnet.monadvision.com)
- [MonadScan testnet](https://testnet.monadscan.com)

The verify command can print an error even when verification succeeded. Check the explorer pages.

### Monad Mainnet

Set `PRIVATE_KEY` in `.env` to an account that holds mainnet MON, then:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadMainnet
```

Redeploy to a new address:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadMainnet --reset
```

Verify:

```bash
npx hardhat verify <CONTRACT_ADDRESS> --network monadMainnet
```

Explorers:

- [MonadVision](https://monadvision.com)
- [MonadScan](https://monadscan.com)

## Counter contract

`contracts/Counter.sol` is the sample from the official starter:

- `x` is the public counter and starts at `0`
- `inc()` adds `1` and emits `Increment(1)`

## Attribution

Derived from the official Monad Hardhat starter:

https://github.com/monad-developers/hardhat-monad

That project is MIT licensed. This repository keeps the MIT license. See [LICENSE](LICENSE).

## Further reading

- [Monad docs](https://docs.monad.xyz)
- [Network information (mainnet)](https://docs.monad.xyz/developer-essentials/network-information)
- [Network information (testnet)](https://docs.monad.xyz/developer-essentials/testnet)
- [Hardhat on Monad](https://docs.monad.xyz/tooling-and-infra/toolkits/hardhat)
- [Hardhat documentation](https://hardhat.org/docs)
- [Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started)
