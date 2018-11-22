
var Intergallactic = require('intergallactic');
var fs              = require('fs');
var path            = require('path'); 
var schema          = require('./schema').Schema;
var Promise         = require('promise');
var accounts        = null;

module.exports = class Accounts {

    constructor(connectionUrl){
        var intergallactic = new Intergallactic({ url: connectionUrl, protocol: 'jsonrpc' });
        accounts = intergallactic.account;
    }
    
    loadAccounts(){
        return accounts.listAccounts()
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    createAccount(pass_phrase){    
        return new Promise(function (resolve, reject) {
            accounts.genPrivAccount(pass_phrase,(error,data)=>{
                if(data){                                               
                    resolve(data);
                }    
                else{
                    reject(error);   
                } 
            })
        }); 
    }
    
    getBalance(address){    
        return new Promise(function (resolve, reject) {
            accounts.getAccount(address,(error,data)=>{
                if(data){                                               
                    resolve(data.Account.Balance);
                }    
                else{
                    reject(error);   
                } 
            })
        }); 
    }

    getSequence(address){    
        return new Promise(function (resolve, reject) {
            accounts.getAccount(address,(error,data)=>{
                if(data){                                               
                    resolve(data.Account.Sequence);
                }    
                else{
                    reject(error);   
                } 
            })
        }); 
    }
        
    getPermissions(address){        
        return new Promise(function (resolve, reject) {
            accounts.getAccount(address,(error,data)=>{
                if(data){                                               
                    resolve(data.Account.Permissions);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }
    
    getStorageRoot(address){        
        return new Promise(function (resolve, reject) {
            accounts.getAccount(address,(error,data)=>{
                if(data){                                               
                    resolve(data.Account.StorageRoot);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }

    getCode(address){    
        return new Promise(function (resolve, reject) {
            accounts.getAccount(address,(error,data)=>{
                if(data){                                               
                    resolve(data.Account.Code);
                }    
                else{
                    reject(error);   
                } 
            })
        });
    }

    getDefaultAccounts(){
        return new Promise(function (resolve, reject) {
            try{  
                let filePath = path.normalize(__dirname + schema.template + schema.account_list);      
                if (fs.existsSync(filePath)) {
                    let account_list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));                                       
                    resolve(account_list);
                }
                else{
                    throw ('The file does not exist : \n' + filepath);
                }
            }    
            catch(ex){
                reject(ex);   
            } 
        });
    }

}