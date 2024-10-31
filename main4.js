const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
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

    mineBlock(difficulty) {
        const start = new Date();
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        const end = new Date();
        const time = (end - start) / 1000;
        console.log(`Bloco Minerado: ${this.hash} in ${time}s`);
        return time;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2023', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        const time = newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        return time;
    }

    calculaMediaTempo(difficulty) {
        let tempoTotal = 0;
        for (let i = 0; i < 10; i++) {
            const block = new Block(0, '01/01/2023', 'Bloco Teste');
            block.difficulty = difficulty;
            tempoTotal += this.addBlock(block);
        }
        const mediaTempo = tempoTotal / 10;
        console.log(`Média de tempo por Dificuldade ${difficulty}: ${mediaTempo}s`);
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

let projetoblock = new Blockchain();

for (let i = 0; i <= 7; i++) {
    projetoblock.difficulty = i;
    console.log(`Minerando bloco ${i} Com a Dificuldade ${projetoblock.difficulty}...`);
    projetoblock.calculaMediaTempo(i);
}
