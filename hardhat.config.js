/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // Add other networks as needed (mainnet, testnet, etc.)
  },
  paths: {
    artifacts: './src/artifacts',
  },
};