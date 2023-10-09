import { deploy } from "./deploy-main";

const deployOnSepolia = async () => await deploy("Swiss");

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployOnSepolia().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
