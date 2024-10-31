const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+ this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2023","Genesis block","0");
    }

    getLatesBlock(){
        return this.chain[this.chain.length -1];

    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty)
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    
    }

    isChainValid(){
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
        
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }

}

let projetoblock = new Blockchain();

console.log('Mining Block 1...');
projetoblock.addBlock(new Block(1,"02/02/2023", {amount: 4}));

console.log('Mining Block 2...');
projetoblock.addBlock(new Block(1,"03/03/2023", {amount: 10}));

//console.log('Is blockchain valid?'+ projetoblock.isChainValid());
//projetoblock.chain[1].data = {amount: 100};
//projetoblock.chain[1].hash = projetoblock.chain[1].calculateHash();
//console.log('Is blockchain valid?'+ projetoblock.isChainValid());

//console.log(JSON.stringify(projetoblock, null, 4));