require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20", // Updated to match Advisr contract
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      // HashIO RPC testnet endpoint in the .env file
      url: process.env.RPC_URL,
      // Your ECDSA account private key pulled from the .env file
      accounts: [process.env.OPERATOR_KEY],
      chainId: 296, // Hedera testnet chain ID
      gasPrice: 20000000000, // 20 gwei
      gas: 6000000,
    },
    mainnet: {
      // HashIO RPC mainnet endpoint
      url: process.env.MAINNET_RPC_URL || "https://mainnet.hashio.io/api",
      accounts: process.env.MAINNET_OPERATOR_KEY ? [process.env.MAINNET_OPERATOR_KEY] : [],
      chainId: 295, // Hedera mainnet chain ID
      gasPrice: 20000000000,
      gas: 6000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    }
  },
  etherscan: {
    // Add API key for contract verification if needed
    apiKey: {
      hedera: process.env.ETHERSCAN_API_KEY || "dummy-key"
    },
    customChains: [
      {
        network: "hedera",
        chainId: 295,
        urls: {
          apiURL: "https://server-verify.hashscan.io",
          browserURL: "https://hashscan.io"
        }
      }
    ]
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 20
  },
  mocha: {
    timeout: 40000
  }
};