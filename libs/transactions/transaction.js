'use strict'

const SEND_TX_TYPE = 0x1
module.exports = class Transaction {

    constructor(intergallactic) {
        this.transaction = intergallactic.Transaction;
    }

    send(fromAddress, toAddress, amount, priv_key) {
        let myTx = this.buildTxn(fromAddress, toAddress, amount)

        const sendTx = new this.transaction(myTx, { type: SEND_TX_TYPE });
        return sendTx.signNBroadcast(priv_key).then(data => {
            return data;
        }).catch(ex => {
            throw ex;
        })

    }

    transact() {
        //TODO 
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

    buildTxn(fromAddress, toAddress, amount) {
        const myTx = {
            from: [{
                address: fromAddress,
                amount: amount
            }],
            to: [{
                address: toAddress,
                amount: amount
            }]
        };
        return myTx;
    }
}