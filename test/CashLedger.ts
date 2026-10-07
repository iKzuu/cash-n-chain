import { expect } from "chai";
import { keccak256, toUtf8Bytes } from "ethers";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("CashLedger", function () {
  it("Should record and retrieve a transaction hash", async function () {
    const cashLedger = await ethers.deployContract("CashLedger");

    await cashLedger.waitForDeployment();

    const transactionId = "TRX-001";

    const dataHash = keccak256(toUtf8Bytes("TRX-001|Budi|50000|income|Kas Oktober"));

    await cashLedger.recordTransaction(transactionId, dataHash);

    const result = await cashLedger.getTransaction(transactionId);

    expect(result[0]).to.equal(dataHash);
    expect(result[2]).to.equal(true);
  });
});
