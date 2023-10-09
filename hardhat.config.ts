import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { configDotenv } from "dotenv";

configDotenv();

const { MUMBAI_RPC, PRIV, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    mumbai: {
      url: MUMBAI_RPC,

      accounts: [PRIV!],
    },
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [PRIV!],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
