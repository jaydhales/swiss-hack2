import { ethers } from "hardhat";
import { getStorageAtZero } from "./interactWithSwiss";

const main = async () => {
  const contract = "0x0";
  await getStorageAtZero(contract, "checking slot 0 before transaction");

  const [signer] = await ethers.getSigners();

  const storageContract = await ethers.getContractAt("StoreString", contract);

  const tx = await storageContract.setSecret("Another Secret");
  await tx.wait();

  await getStorageAtZero(contract, "checking slot 0 after transaction");

  console.log({
    Response: await storageContract.getSecret(),
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
