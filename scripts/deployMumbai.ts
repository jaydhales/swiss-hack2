import { deploy } from "./deploy-main";

const deployOnMumbai = async () => await deploy("Mumbai");

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployOnMumbai().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
