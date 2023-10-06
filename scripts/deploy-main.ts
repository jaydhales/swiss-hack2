import { ethers } from "hardhat";

export async function deploy(chain: string) {
  const store = await ethers.deployContract("StoreString");
  await store.waitForDeployment();

  console.log({
    contract: store.target,
    status: "deployed",
    network: chain,
  });

  return store.target;
}
