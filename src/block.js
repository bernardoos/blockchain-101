const SHA256 = require('crypto-js/sha256');

export default class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        // The calculation of the hash must be at the end so to ensure that all data is assigned correctly before calculation
        this.hash = this.calculateHash();

        console.log(timestamp)
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined, nonce: " + this.nonce + ", hash: " + this.hash);
    }

    hasValidTransactions() {
        // Traverse all transactions within the block, verifying them one by one
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}