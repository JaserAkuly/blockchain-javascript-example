
const SHA256 = require('crypto-js/sha256');


// Key Terms Defined:
//Index = optional, where the block sits on the chain
//Timestamp = when was the block was created 
//Data = any type of data to be assosiated, IE. If currency, the transaction information
//PreviousHash = string that contains the hash of the block before this one, **Very important as it keeps itengrity in line. 

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Blocked Minted: " + this.hash);
    }
}



class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5
    }

    createGenesisBlock() {
        return new Block(0, "10/29/2017", "Genesis Block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let jAkulyCoin = new Blockchain();


console.log('Mining Block 1...')
jAkulyCoin.addBlock(new Block(1, "10/30/2017", { amount: 4 }));
console.log('Mining Block 2...')
jAkulyCoin.addBlock(new Block(2, "10/31/2017", { amount: 14 }));
console.log('Mining Block 3...')
jAkulyCoin.addBlock(new Block(3, "11/01/2017", { amount: 24 }));