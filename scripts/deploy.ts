import { keccak256, toUtf8Bytes } from "ethers";
import { network } from "hardhat";

const { ethers } = await network.create();

async function main() {
  console.log("Deploying CashLedger...");

  const cashLedger = await ethers.deployContract("CashLedger");

  await cashLedger.waitForDeployment();

  const contractAddress = await cashLedger.getAddress();

  console.log("CashLedger deployed to:");
  console.log(contractAddress);

  const transactions = [
    {
      id: "TRX-001",
      data: "TRX-001|Budi|50000|income|Kas Oktober",
    },
    {
      id: "TRX-002",
      data: "TRX-002|Listrik|150000|expense|Tagihan listrik",
    },
    {
      id: "TRX-003",
      data: "TRX-003|Andi|75000|income|Pembayaran proyek",
    },
  ];

  for (const transaction of transactions) {
    const dataHash = keccak256(toUtf8Bytes(transaction.data));

    console.log("\n==============================");
    console.log("Transaction ID:", transaction.id);
    console.log("Original data:", transaction.data);
    console.log("Data hash:", dataHash);

    const tx = await cashLedger.recordTransaction(transaction.id, dataHash);

    await tx.wait();

    console.log("\nBlockchain TX:", tx.hash);

    const stored = await cashLedger.getTransaction(transaction.id);

    console.log("Stored Hash:", stored[0]);
    console.log("Timestamp:", stored[1].toString());
    console.log("Exists:", stored[2]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
