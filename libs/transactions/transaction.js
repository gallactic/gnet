'use strict'


var gallacticDbFactory = require('burrow-db');

module.exports = class Transaction {

    constructor(connectionUrl) {   

        let gallactic   = gallacticDbFactory.createInstance(connectionUrl);
        this._Trx     = gallactic.txs();  
        let TenderKeys   = require("tenderkeys");
        this._tenderKeys = new TenderKeys;
        this.connectionUrl = connectionUrl;      
    }

    sign(privKey,tx){                
                
        let signature = this._tenderKeys.sign(privKey,tx);
        return signature.toString("hex");
    }

    generateAccount(privateKey) {
        let pubKey = this._tenderKeys.getPubKeyFromPrivKey(privateKey);
        let address = this._tenderKeys.getAddressFromPrivKey(privateKey);  
        
        return { address: address, pubKey: pubKey , privKey: privateKey };
    }

    broadcastTx(tx){ 
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this._Trx.broadcastTx(tx,(error,data)=>{
                if(data){                                               
                    resolve(data);
                }    
                else{
                    reject(error);   
                } 
            })
        }); 
    }

}