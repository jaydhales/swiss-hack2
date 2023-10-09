import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";
import { HttpNetworkConfig } from "hardhat/types";
import { HardhatEthersProvider } from "@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider";
import { JsonRpcProvider } from "ethers";
import { signer } from "@openzeppelin/upgrades/lib/test/helpers/signing";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

export const getStorageAtZero = async (address: string, message: string) =>
  console.log({ [message]: await ethers.provider.getStorage(address, "0x0") });

export const sendQuery = async (
  provider: HardhatEthersProvider | JsonRpcProvider,
  destination: any,
  data: string
) => {
  const rpcUrl = (network.config as HttpNetworkConfig).url;

  const [encKey, useKey] = await encryptDataField(rpcUrl, data);
  const response = await provider.call({
    to: destination,
    data: encKey,
  });

  return await decryptNodeResponse(rpcUrl, response, useKey);
};

const sendTx = async (
  signer: HardhatEthersSigner,
  destination: string,
  data: string,
  value: number
) => {
  // Get the RPC link from the network configuration
  const rpclink = (network.config as HttpNetworkConfig).url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpclink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

const main = async () => {
  const contract = "0x1e3808497594c4017FE9D0fd9E9dE79603d62525";
  await getStorageAtZero("0x0", "checking slot 0 before transaction");

  const [signer] = await ethers.getSigners();

  const storageContract = await ethers.getContractAt("StoreString", contract);

  const tx = await sendTx(
    signer,
    contract,
    storageContract.interface.encodeFunctionData("setSecret", [
      "You Know Nothing",
    ]),
    0
  );
  await tx.wait();

  const res = await sendQuery(
    signer.provider,
    contract,
    storageContract.interface.encodeFunctionData("getSecret")
  );

  console.log({
    Response: storageContract.interface.decodeFunctionResult(
      "getSecret",
      res
    )[0],
  });

  await getStorageAtZero("0x0", "checking slot 0 after transaction");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
