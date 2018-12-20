#!/usr/bin/env node
'use strict'
const program = require('commander');
var Actions = require('./actions');

var fs = require('fs');

var config;

try{
  
  let config_path =  process.cwd() + "/config.json";
  if (fs.existsSync(config_path)) {
      let content = fs.readFileSync(config_path);
      config = JSON.parse(content);        
  }  
}
catch(ex){
  console.log(ex);
}

var actions = new Actions(config);
  program
  .version('0.0.5')
  .description('gnet');

  program
  .command('install')
  .alias('insl')
  .description('\ninstall gallactic blockchain, and copy the files to the home directory (.gallactic), \
  \nNo need to initialize project for this command.\n\n')
  .action(() => actions.installGallactic());

  program
  .command('uninstall')
  .alias('unsl')
  .description('\nuninstall gallactic blockchain, and back up the files to the home directory (gallactic-backup), \
  \nNo need to initialize project for this command.\n\n')
  .action(() => actions.uninstallGallactic());

  program
  .command('run')
  .alias('rn')
  .description('\nrun gallactic blockchain,you need install gallactic first!, \
  \nNo need to initialize project for this command.\n\n')
  .action(() => actions.run());

  program
  .command('init')
  .alias('int')
  .description('\nInitialize project, makes folders and files which are needed for starting a dapp project.\n\n')
  .action(() => actions.init());

  program
  .command('compile')
  .alias('cmp')
  .description('\nCompile all contracts in contracts folder and makes artifacts in the build folder\
  \nyou need to initialize a project before using this command.\n\n')
  .action(() => actions.compileAll());

  program
  .command('test')
  .alias('tst')
  .description('\n runs tests in test folder with .js extension\
  \n snak test integrates mocha and chai for testing\
  \nyou need to initialize a project before using this command.\n\n')
  .action(() => actions.testAll());

  program
  .command('migrate [accountname]')
  .option('-f, --force', 'Forcefully migrate the contracts')
  .alias('mgt')
  .description('\ndeploy contract on the Gallactic\
  \nyou need to initialize a project before using this command.\n\n')
  .action((accountname,cmd) => actions.migrate(accountname,cmd.force));

  program
  .command('list_accounts')
  .alias('lacnt')
  .description('\nLoad all accounts\
  \nyou need to initialize a project before using this command.\n\n')
  .action(() => actions.loadAccounts());

  program
  .command('default_accounts')
  .alias('dacnt')
  .description('\nList all predefined accounts\
  \nNo need to initialize a project before using this command.\n\n')
  .action(() => actions.getDefaultAccounts());

  program
  .command('create_account <pass_phrase>')
  .alias('crtac')
  .description("\nCreates an account and saves the encrypted json file in $HOME/g_keystore , \
  \nNo need to initialize a project before using this command.\n\n")
  .action((pass_phrase) => actions.createAccount(pass_phrase));

  program
  .command('stakes <address>')
  .alias('stk')
  .description("\nGet stakes of validator account\
  \nNo may need to initialize a project before using this command.\n\n")
  .action((address) => actions.getStakes(address));
  
  program
  .command('balance <address>')
  .alias('blnc')
  .description("\nGet balance of a specific account\
  \nNo need to initialize a project before using this command.\n\n")
  .action((address) => actions.getBalance(address));

  program
  .command('inspect <address> <pass_phrase>')
  .alias('insp')
  .description("\nInspect details of a specific account. This will display private key and public key.\
  \nNo need to initialize a project before using this command.\n\n")
  .action((address, pass_phrase) => actions.inspectAccount(address, pass_phrase));

  program
  .command('sequence <address>')
  .alias('seq')
  .description("\nGet sequence of a specific account\
  \nNo need to initialize a project before using this command.\n\n")
  .action((address) => actions.getSequence(address));

  program
  .command('transact <priv_key> <data> <address> <fee> <gas_limit>')
  .option('-u, --unsafe', 'unsafe sending transaction')
  .alias('tx')
  .description('\n(Unsafe!) Do regular transaction to a contract, you need pass the private key of sender and address of contract\
  \nyou need to initialize a project before using this command.\n\n')
  .action((priv_key,data,address,fee,gas_limit,cmd) => actions.transact(priv_key,data,address,fee,gas_limit,cmd.unsafe));

  program
  .command('bond <public_key> <amount> <fee> <priv_key>')
  .option('-u, --unsafe', 'unsafe transaction') //TODO (unsafe should be implemented using privatekey)
  .alias('bnd')
  .description('\n(safe) Do Bond transaction, you need pass the validator publickey, stake amount, transaction fee, and private key of sender \
  \nyou may need to initialize a project before using this command.\n\n')
  .action((public_key,amount,fee,priv_key) => actions.broadcastBond(public_key,parseInt(amount),parseInt(fee),priv_key));

  program
  .command('unbond <address> <amount> <fee> <priv_key>')
  .option('-u, --unsafe', 'unsafe sending transaction')
  .alias('ubnd')
  .description('\n(safe) Do Unbond transaction, you need pass account address, stake amount, transaction fee and private key of the validator \
  \nyou may need to initialize a project before using this command.\
  \nNote: you should be a validator to do unbond transaction.\n\n')
  .action((address,amount,fee,priv_key) => actions.broadcastUnbond(address,parseInt(amount),parseInt(fee),priv_key)); 

  program
  .command('send <address> <amount> <priv_key>')
  .option('-u, --unsafe', 'unsafe sending transaction') //TODO (unsafe should be implemented using privatekey)
  .alias('snd')
  .description('\n(safe) Do regular transaction, you need to pass the address of the receiver, amount and the private key of sender \
  \nyou may need to initialize a project before using this command.\n\n')
  .action((address,amount,priv_key) => actions.send(address,parseInt(amount),priv_key));

  program
  .command('*')
  .action(function(others){
    console.log('[Error] There isn\'t any command for "%s" \n\
    please type gnet -h for more helps.\n', others);  
  });

  program
  .command('call <contract_name> <function_name> [parameters_list]')
  .alias('calf')
  .description("\nCalls the function of specific contract, you need to pass the list of parameters like this var1,var2,...,varK ,comma separated, \
  \nYou need to initialize a project before using this command.\n\n")
  .action((contract_name,function_name,parameters_list) => actions.callFunction(contract_name,function_name,parameters_list));

  program
  .command('chain_id')
  .alias('chid')
  .description("\nGet chain id of the blockchain\
  \nYou need to initialize a project before using this command.\n\n")
  .action(() => actions.getChainId());

  program
  .command('genesis_hash')
  .alias('genhash')
  .description("\nGet Genesis Hash of the blockchain\
  \nYou need to initialize a project before using this command.\n\n")
  .action(() => actions.getGenesisHash());

  program
  .command('latest_block_height')
  .alias('lbckh')
  .description("\nGet Latest Block Hash of the blockchain\
  \nYou need to initialize a project before using this command.\n\n")
  .action(() => actions.getLatestBlockHeight());

  program
  .command('info')
  .alias('inf')
  .description("\nGet Info of the blockchain\
  \nYou need to initialize a project before using this command.\n\n")
  .action(() => actions.getInfo());

  program
  .command('latest_block')
  .alias('lblck')
  .description("\nGet Latest Block of the blockchain\
  \nYou may need to initialize a project before using this command.\n\n")
  .action(() => actions.getLatestBlock());

  program
  .command('block  <block_height>')
  .alias('blck')
  .description("\nGet the specific Block of the blockchain\
  \nYou may need to initialize a project before using this command.\n\n")
  .action((block_height) => actions.getBlock(parseInt(block_height)));

  program
  .command('list_transactions  <block_height>')
  .alias('ltxs')
  .description("\nGet transactions of the specific Block \
  \nYou may need to initialize a project before using this command.\n\n")
  .action((block_height) => actions.getBlockTxs(parseInt(block_height)));

  program
  .command('config')
  .alias('conf')
  .description("\nGet the current config of the gnet\
  \nIf you haven't created any project gallactic url will be http://127.0.0.1:1337/rpc by default\
  \nYou may need to initialize a project before using this command.\n\n")
  .action(() => actions.getConfig());



program.parse(process.argv);
