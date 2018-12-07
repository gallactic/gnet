'use strict'

var Keys        = require('../keys');
var keys = new Keys;

const SEND_TX_TYPE = 0x1
module.exports = class Transaction {

    constructor(intergallactic) {
        this.igc = intergallactic;
    }

    send(toAddress, amount, priv_key) {
        const account = keys.getAccountInfo(priv_key)
        
        const myTx = {
            from: [{
                address: account.address,
                amount: amount
            }],
            to: [{
                address: toAddress,
                amount: amount
            }]
        };

        return this.signAndBroadcast(myTx, priv_key, SEND_TX_TYPE)
    }

    transact() {
        let myTx = this.buildTxn(fromAddress, toAddress, amount)
    }

    bond() {
        //TODO
    }

    unbond() {
        //TODO
    }

    randomTransact() {
        //TODO
    }

    signAndBroadcast(txnObject, priv_key, txnType) {

        const newTxn = new this.igc.Transaction(txnObject, { type: txnType });

        return newTxn.signNBroadcast(priv_key).then(data => {
            return (data);
        })
    }
}