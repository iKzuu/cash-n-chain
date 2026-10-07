// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract CashLedger {
    struct Transaction {
        bytes32 dataHash;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Transaction) private transactions;

    event TransactionRecorded(
        string indexed transactionId,
        bytes32 dataHash,
        uint256 timestamp
    );

    function recordTransaction(
        string calldata transactionId,
        bytes32 dataHash
    ) external {
        require(
            !transactions[transactionId].exists,
            "Transaction already exists"
        );

        transactions[transactionId] = Transaction({
            dataHash: dataHash,
            timestamp: block.timestamp,
            exists: true
        });

        emit TransactionRecorded(
            transactionId,
            dataHash,
            block.timestamp
        );
    }

    function getTransaction(
        string calldata transactionId
    )
        external
        view
        returns (
            bytes32 dataHash,
            uint256 timestamp,
            bool exists
        )
    {
        Transaction memory transaction = transactions[transactionId];

        return (
            transaction.dataHash,
            transaction.timestamp,
            transaction.exists
        );
    }
}