"use strict";

module.exports = class Transaction {
  constructor(intergallactic) {
    this.igc = intergallactic;
  }

  send(address, amount, priv_key) {
    const myTx = {
      to: address,
      amount: amount
    };
    const newTxn = new this.igc.Transaction(myTx);
    return newTxn.send(priv_key);
  }

  permission(address, perm_value, priv_key) {
    const myTx = {
      to: address,
      amount: amount,
      permissions:perm_value,
      set: true
    };
    const newTxn = new this.igc.Transaction(myTx);
    return newTxn.permission(priv_key);
  }

  bond(pubKey, amount, priv_key) {
    const myTx = {
      to: address,
      amount: amount,
      publicKey: pubKey
    };
    const newTxn = new this.igc.Transaction(myTx);
    return newTxn.bond(priv_key);
  }

  unbond(address, amount, priv_key) {
    const myTx = {
      to: address,
      amount: amount
    };
    const newTxn = new this.igc.Transaction(myTx);
    return newTxn.send(priv_key);
  }

  call(to, gaslimit, amount, data) {
    const myTx = {
      to: to,
      gasLimit: gaslimit,
      amount: amount,
      data: data
    };
    const newTxn = new this.igc.Transaction(myTx);
    return newTxn.call(priv_key);
  }
};
