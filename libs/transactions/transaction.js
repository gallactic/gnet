'use strict'

var Keys        = require('../keys');
var keys = new Keys;

const SEND_TX_TYPE = 0x1
const BOND_TX_TYPE  = 0x3;
const UNBOND_TX_TYPE = 0x4;
module.exports = class Transaction {

    constructor(intergallactic) {
        this.igc = intergallactic;
    }

    send(toAddress, amount, priv_key) {
        const account = keys.getAccountInfo(priv_key)
        
        const myTx = {
            from: [{
                address: account.acAddress,
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

    bond(pubKey,amount,fee,priv_key) {
        const account = keys.getAccountInfo(priv_key)
        const vaAccount = keys.getInfoByPublicKey(pubKey)

        const myTx = {
            from: {
                address: account.acAddress,
                amount: amount
            },
            to: {
                address: vaAccount.vaAddress,
                amount: amount
            },
            publicKey: pubKey,
            gasLimit: fee
        };

        return this.signAndBroadcast(myTx, priv_key, BOND_TX_TYPE)
    }

    unbond(address,amount,fee,priv_key) {
        const account = keys.getAccountInfo(priv_key)

        const myTx = {
            from: {
                address: account.vaAddress,
                amount: amount
            },
            to: {
                address: address,
                amount: amount
            },
            gasLimit: fee
        };

        return this.signAndBroadcast(myTx, priv_key, UNBOND_TX_TYPE)
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