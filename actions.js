'use strict'

var Intergallactic  = require('intergallactic');
var os     = require('os');
var Logger = require('./libs/logger');
var logger = new Logger();

module.exports = class Action {

    constructor(config){

        if(config == undefined){
            this._Config = {
                config_name:"config.json",
                gallactic_url:"http://127.0.0.1:1337/rpc",
                gallactic_path:"$HOME/gallactic"
            }
        }
        else{
            this._Config = config;
        }
        
        this.intergallactic = new Intergallactic({ url: this._Config.gallactic_url, protocol: 'jsonrpc' });

        this._blockchain = null;
        this._safeTx     = null;
        this._accounts   = null;
        this._compile    = null;
        this._test       = null;
        this._project    = null;
        this._functions  = null; 
        this._keys       = null;       
    } 

    _txHandler(){
        if (this._safeTx != null){
            return this._safeTx;
        }
        else{
            let SafeTx = require("./libs/transactions/transaction");
            this._safeTx = new SafeTx(this.intergallactic);
            return this._safeTx;
        }
    } 

    _accountHandler(){
        if (this._accounts != null){
            return this._accounts;
        }
        else{
            let Accounts = require("./libs/accounts") ;
            this._accounts = new Accounts(this.intergallactic);
            return this._accounts;
        }
    } 

    _keyHandler(){
        if (this._keys != null){
            return this._keys;
        } else {
            let Keys = require("./libs/keys") ;
            this._keys = new Keys();
            return this._keys;
        }
    } 

    _compileHandler(){
        if (this._compile != null){
            return this._compile;
        }
        else{
            let Compile  = require("./libs/compile");
            this._compile = new Compile();
            return this._compile;
        }
    } 

    _testHandler(){
        if (this._test != null){
            return this._test;
        }
        else{
            let Test  = require("./libs/test");
            this._test = new Test();
            return this._test;
        }
    } 

    _projectHandler(){
        if (this._project != null){
            return this._project;
        }
        else{
            let Project  = require("./libs/project");
            this._project = new Project();    
            return this._project;
        }
    } 

    _blockchainHandler(){
        if (this._blockchain != null){
            return this._blockchain;
        }
        else{
            let Blockchain = require("./libs/blockchain");
            this._blockchain = new Blockchain(this.intergallactic);
            return this._blockchain;
        }
    }   

    _deployHandler(){
        if(this.deploy != null){
            return this.deploy;
        }            
        else{
            let Deploy  = require("./libs/deploy");
            this.deploy = new Deploy(this.intergallactic);
            return this.deploy;
        }         
    }

    _functionHandler(){
        if(this._functions != null){
            return this._functions;
        }            
        else{
            let Functions  = require("./libs/functions");
            this._functions = new Functions();
            return this._functions;
        }         
    }

    getConfig(){        
        try{            
            logger.console(JSON.stringify(this._Config,null,4));
            return this._Config;         
        }
        catch(ex){
            logger.error(ex);
        }
    }

    compileAll(){
        try{                        
            this._compileHandler().compileAll();            
        }
        catch(ex){
            logger.error(ex);
        }
    }

    testAll(){
        try{                        
            this._testHandler().testAll();            
        }
        catch(ex){
            logger.error(ex);
        }
    }

    migrate(accountName,isForce){
        try{             
            let Link = require("./libs/link");  
            let linker = new Link();   
            var _this  = this;
            linker.getDeployOrder().then(function(linkOrder){                           
                try{
                    _this._deployHandler().deployAll(linkOrder, accountName,isForce);               
                }
                catch(ex)
                {
                    logger.error(ex);
                }    
            }).catch(err=>{
                logger.error(err);

            });             
        }
        catch(ex){
            logger.error(ex);
        }
    }
    
    transact(privateKey,data,address,fee,gasLimit,unsafe){   
        if(unsafe === true){
            this._txHandler().transact(privateKey,data,address,fee,gasLimit).then(data => {
                logger.console(JSON.stringify(data,null,4));
            })
            .catch(function(ex) {
                logger.error(JSON.stringify(ex,null,4));           
            });
        }   
        else{
            this.broadcastCall(privateKey,data,address,fee,gasLimit);
        }          
    }

    send(address,amount,priv_key){   
        return this._txHandler().send(address,amount,priv_key).then(data =>{
            logger.console("Safe Send Tx result :\n" + JSON.stringify(data,null,4));
        }).catch(ex => {
            logger.error(ex);
        });   
    }

    permission(address,perm_value,priv_key){   
        return this._txHandler().permission(address,perm_value,priv_key).then(data =>{
            logger.console("Safe permission Tx result :\n" + JSON.stringify(data,null,4));
        }).catch(ex => {
            logger.error(ex);
        });   
    }
    
    randomTransact(count){
        try{            
            this._txHandler().randomTransact(count,logger);
        }
        catch(ex){
            logger.error(ex);
        }
    }

    accountInfo(address){
        this._accountHandler().accountInfo(address)
        .then(account => {
            logger.console("Account Info:\n" + JSON.stringify(account,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    validatorInfo(address){
        this._accountHandler().validatorInfo(address)
        .then(validator => {
            logger.console("Validator Info:\n" + JSON.stringify(validator,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    loadAccounts(){
        this._accountHandler().loadAccounts()
        .then(accounts => {
            logger.console("accounts :\n" + JSON.stringify(accounts,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    getDefaultAccounts(){
        this._accountHandler().getDefaultAccounts()
        .then(accounts => {
            logger.console("Default accounts :\n" + JSON.stringify(accounts,null,4));
        })
        .catch(function(ex) {
            logger.error(ex);           
        });
    }

    createAccount(passPhrase){
        this._keyHandler().createAccount(passPhrase)
        .then(account => {
            logger.console("An encrypted keyfile for the account " + account + " is saved in $HOME/g_keystore")
        })
        .catch(function(ex) {
            logger.error(ex);           
        });
    }

    inspectAccount(address, passPhrase){
        this._keyHandler().inspectAccount(address, passPhrase)
        .then(account => {
            logger.console(`\nAddress: ${address}\nPrivate key: ${account.privateKey}\nPublic key: ${account.publicKey}`);
        })
        .catch((ex) => {
            logger.error(ex);
        });
    }

    getBalance(address){
        this._accountHandler().getBalance(address)
        .then(balance => {
            logger.console("Balance : " + balance);
        })
        .catch(function(ex) {
            logger.error(ex);           
        });
    }

    getStakes(address){
        this._accountHandler().getStakes(address)
        .then(stakes => {
            logger.console("Stakes : " + stakes);
        })
        .catch(function(ex) {
            logger.error(ex);           
        });
    }

    getSequence(address){
        this._accountHandler().getSequence( address)
        .then(sequence => {
            logger.console("Sequence : " + sequence);
        })
        .catch(function(ex) {
            logger.error(ex);           
        });
    }

    init(){
        try{             
            this._projectHandler().createSchema();
        }
        catch(ex){
            logger.error(ex);
        }
    }

    callFunction(contract_name,function_name,parameters_list){
        
        try{
            this._functionHandler().callFunction(this._Config.gallactic_url,contract_name,function_name,parameters_list);
        }
        catch(ex){
            logger.error(ex);   
        }
    }

    getChainId(){
        return this._blockchainHandler().getChainId()
        .then(chainId => {
            logger.console("Chain ID :\n" + JSON.stringify(chainId,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }
    
    getGenesisHash(){
        return this._blockchainHandler().getGenesisHash()
        .then(genesisHash => {
            logger.console("Genesis Hash :\n" + genesisHash);
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    getInfo(){
        return this._blockchainHandler().getInfo()
        .then(info => {
            logger.console("info block :\n" +  JSON.stringify(info,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    getLatestBlock(){
        return this._blockchainHandler().getLatestBlock()
        .then(block => {
            logger.console("Latest block :\n" + JSON.stringify(block,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }
    
    getLatestBlockHeight(){          
        return this._blockchainHandler().getLatestBlockHeight()
        .then(latestBlockHeight => {
            logger.console("Ltest block height :" + latestBlockHeight);
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    getBlock(height){
        return this._blockchainHandler().getBlock(height)
        .then(block => {
            logger.console("block :\n" + JSON.stringify(block,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    getBlockTxs(height){
        return this._blockchainHandler().getBlockTxs(height)
        .then(txs => {
            logger.console("block :\n" + JSON.stringify(txs,null,4));
            return txs;
        })
        .catch(ex => {
            logger.error(ex);
        });
    }

    getBlockTxsNo(height){
        return this._blockchainHandler().getBlockTxsNo(height)
        .then(txNo => {
            return ({txNo:txNo,height:height});
            //logger.console("Tx Number :\n" + JSON.stringify(block,null,4));
        })
        .catch(ex => {
            logger.error(ex);
        });
    }


    broadcastCall(privKey,data,address,gasLimit,fee){                
        return this._callTxHandler().broadcast(privKey,address,gasLimit,fee,data).then(data =>{
            logger.console("Safe Transact Tx result :\n" + JSON.stringify(data,null,4));
        }).catch(ex => {
            logger.error(ex);
        });
    }

    broadcastBond(pubKey,amount,privKey){                
        return this._txHandler().bond(pubKey,amount,privKey).then(data =>{
            logger.console("Safe Bond Tx result :\n" + JSON.stringify(data,null,4));
        }).catch(ex => {
            logger.error(ex);
        });
    }

    broadcastUnbond(address,amount,privKey){                
        return this._txHandler().unbond(address,amount,privKey).then(data =>{
            logger.console("Safe Unbond Tx result :\n" + JSON.stringify(data,null,4));
        }).catch(ex => {
            logger.error(ex);
        });
    }

    getChainTxs(from,to){
        var _this = this;
        for(var i = from ; i< to ; i++){
            this.getBlockTxsNo(i).then((data) => {
                console.log("No " + data.height + " ) " + data.txNo);
                if(data.txNo > 0 )
                _this.getBlockTxs(data.height).then(txs => {
                    console.log(data.height + ") \n" + JSON.stringify(txs,null,4));
                });
            });
        }
    }

    installGallactic(){

        let gallactic_files = "";        

        if(os.type() == "Linux")
            gallactic_files = '/gallactic/gallactic-linux';
        else if (os.type() == "Darwin")
            gallactic_files = '/gallactic/gallactic-darwin';              
        else{
            logger.console("snak does not support your OS type: " + os.type());
            return;
        }
        try{
            let shell = require('shelljs');
            let cmd = __dirname + '/gallactic/install.sh ' + __dirname + gallactic_files;
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });
            
        }
        catch(ex){
            logger.error(ex);       
        }
    }

    uninstallGallactic(){
        try{
            let shell = require('shelljs');
            let cmd = __dirname + '/gallactic/uninstall.sh';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });
            
        }
        catch(ex){
            logger.error(ex);       
        }
    }

    run(){
        try{
            let shell = require('shelljs');
            let cmd = __dirname + '/gallactic/gallactic.sh';
            let child = shell.exec(cmd, {async:true});
            child.stdout.on('data', function(data) {
            });            
            
        }
        catch(ex){
            logger.error(ex);       
        }
    }
};