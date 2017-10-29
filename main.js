
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
        this.has = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
    
}

class Blockchain {
    constructor () {
        this.chain = [];
    }

    createGenesisBlock(){
        return new Block(0, "10/29/2017", "Genesis Block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}