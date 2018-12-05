'use strict'

var Promise         = require('promise');
var blockChain;

module.exports = class Blockchain{

    constructor(intergallactic){
        blockChain = intergallactic.gallactic;
    }

    getGenesisHash(){
        
        return blockChain.getChainId()
            .then(data => {
                return data.body.result.GenesisHash;
            })
            .catch(err => {
                throw(err)
            })
    }

    getChainId(){        

        return blockChain.getChainId()
            .then(data => {
                return data;
            })
            .catch(err => {
                throw(err)
            })
    }
        
    getInfo(){                
        return blockChain.getInfo()
            .then(data => {
                return data;
            })
            .catch(err => {
                throw(err)
            })
    }
    
    getLatestBlockHeight(){        
        return blockChain.getLatestBlock()
            .then(data => {
                return data.body.result.Block.header.height;
            })
            .catch(err => {
                throw(err)
            })
    }
    
    getLatestBlock(){
        return blockChain.getLatestBlock()
            .then(data => {
                return data.body.result.Block;
            })
            .catch(err => {
                throw(err)
            })
    }

    getBlock(height){        
        return blockChain.getBlock(height)
            .then(data => {
                return data.body.result;
            })
            .catch(err => {
                throw(err)
            })
    }

    getBlockTxs(height){        
        return blockChain.getBlockTxns(height)
            .then(data => {
                return data.body.result;
            })
            .catch(err => {
                throw(err)
            })
    }

    getBlockTxsNo(height){        
        return new Promise(function (resolve, reject) {
            blockChain.getBlock(height,(error,data)=>{
                if(data){                                               
                    resolve(data.ResultBlock.block.header.num_txs);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }

}