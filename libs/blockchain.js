'use strict'

var Intergallactic  = require('intergallactic');
var Promise         = require('promise');
var blockChain;

module.exports = class Blockchain{

    constructor(connectionUrl){
        let intergallactic = new Intergallactic({ url: connectionUrl, protocol: 'jsonrpc' });
        blockChain = intergallactic.gltc;
    }

    getGenesisHash(){
        
        return blockChain.getChainId()
            .then(data => {
                return data;
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
        return new Promise(function (resolve, reject) {
            blockChain.getLatestBlock((error,data)=>{
                if(data){                                               
                    resolve(data.Block.header.height);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }
    
    getLatestBlock(){
        return new Promise(function (resolve, reject) {
            blockChain.getLatestBlock((error,data)=>{
                if(data){                                               
                    resolve(data);
                }    
                else{
                    reject(error);   
                } 
            })
        });
        
    }

    getBlock(height){        
        return new Promise(function (resolve, reject) {
            blockChain.getBlock(height,(error,data)=>{
                if(data){                                               
                    resolve(data);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }

    getBlockTxs(height){        
        return new Promise(function (resolve, reject) {
            blockChain.getBlockTransactions(height,(error,data)=>{
                if(data){                                               
                    resolve(data);
                }    
                else{
                    reject(error);   
                } 
            })
        });
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