import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ignition-viem";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
// An empty placeholder from .env.example is not a key. Omit it so compile and
// test can load this config; deployment still requires PRIVATE_KEY.
const accounts = PRIVATE_KEY === "" ? [] : [PRIVATE_KEY];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.30",
    settings: {
      evmVersion: "osaka",
      metadata: {
        bytecodeHash: "ipfs", // Required for Sourcify verification
      },
    },
  },
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      accounts,
      chainId: 10143,
    },
    monadMainnet: {
      url: "https://rpc.monad.xyz",
      accounts,
      chainId: 143,
    },
  },
  sourcify: {
    enabled: true,
    apiUrl: "https://sourcify-api-monad.blockvision.org",
    browserUrl: "https://testnet.monadvision.com",
  },
  etherscan: {
    enabled: true,
    apiKey: {
      monadTestnet: ETHERSCAN_API_KEY,
      monadMainnet: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "monadTestnet",
        chainId: 10143,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api?chainid=10143",
          browserURL: "https://testnet.monadscan.com",
        },
      },
      {
        network: "monadMainnet",
        chainId: 143,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api?chainid=143",
          browserURL: "https://monadscan.com",
        },
      },
    ],
  },
};

export default config;
