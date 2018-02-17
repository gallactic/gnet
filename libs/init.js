'use strict'

var fs = require("fs");
var promise = require("promise");

var Schema = {
    project_path : process.cwd(),
    snack_path : __dirname,
    test : "/test",
    contracts : "/contracts",
    migration : "/migration",
    migration_output:"/migration_output_",
    build : "/build",
    accounts : "/accounts",
    account_list: "/account_list.json",
    default_account: "/account.json",
    transactions: "/transactions",
    random_transactions: "/random_transactions.json",
    template: "/templates",
    config_file : "/config.json",
    link_order_file: "/link_order.json"   
}

var ProjectSchema = {

    createSchema: function(){
        return new promise(function (fulfil,reject){
            var callback = function(error , data){
                if(error)
                    reject(error);
            }
            try{
                fs.copyFileSync(Schema.snack_path +Schema.template + Schema.config_file, Schema.project_path + Schema.config_file);
                fs.mkdirSync(Schema.project_path + Schema.build);
                fs.mkdirSync(Schema.project_path + Schema.contracts);
                fs.mkdirSync(Schema.project_path + Schema.migration);
                fs.mkdirSync(Schema.project_path + Schema.test);
                fs.mkdirSync(Schema.project_path + Schema.accounts);
                fs.mkdirSync(Schema.project_path + Schema.transactions);
                fs.copyFileSync(Schema.snack_path +Schema.template + Schema.account_list, Schema.project_path + Schema.accounts + Schema.account_list);

                fulfil();
            }
            catch(ex){
                console.log(ex);
                reject(ex);
            }
    });
    },

    listContracts: function() {
        return new promise(function (fulfil,reject){
            var dir = require("node-dir");
            var path = require("path");
            try{
                let dirPath = Schema.project_path + Schema.contracts;
                dir.files(dirPath, function(err, files) {
                    if (err) reject(err);
                      
                    files = files.filter(function(file) {
                        return path.extname(file) == ".sol" && path.basename(file)[0] != ".";                
                    });
                    if(files.length ==0)
                        reject("There is no .sol file in this directory!!");
    
                    fulfil(files);
                });
            }
            catch(ex){
                reject(ex);
            }
        });           
    },

    getContractsNames: function() {        
        return new promise(function (fulfil,reject){
            var dir = require("node-dir");
            var path = require("path");
            try{                
                let dirPath = Schema.project_path + Schema.contracts;
                dir.files(dirPath, function(err, files) {
                    if (err) reject(err);
                      
                    files = files.filter(function(file) {
                        return path.extname(file) == ".sol" && path.basename(file)[0] != ".";                                      
                    });

                    if(files.length ==0) 
                        reject("There is no sol file in this directory!!");

                    for(var i=0 ; i< files.length ; i++)
                        files[i] = path.parse(files[i]).name;

                    fulfil(files);
                });
            }
            catch(ex){
                reject(ex);
            }

        });       
    }
}
module.exports = {ProjectSchema,Schema};
