![gnet](https://image.ibb.co/m5Y6DK/gnet1.png "gnet")

-----------------------
This document has inspired by truffle README.md

gnet is a node.js app which already is under development, aiming to facilitate working with Gallactic.

### with gnet you will have these facilities:

* Easily install and uninstall Gallactic.
* Built-in smart contract compilation, linking, deployment.
* Having interaction with blockchain(Gallactic) directly via linux terminal.
* Automated contract testing with Mocha and Chai(will be added in future).
* Network management for deploying to many public & private networks.
* Interactive console for direct contract communication(will be added in future).

### Install

```
$ npm install -g gnet
```

### Quick Usage

```
Send transaction

$ gnet send  <address> <amount> <priv_key>

```

For a default set of contracts and tests, run the following within an empty project directory:

```
Initialize project:

$ gnet init
```

From there, you can run `gnet compile`, `gnet migrate` and `gnet test`(will be implemented in future) to compile your contracts, deploy those contracts to the network, and run their associated unit tests.

```
Compile smart contracts:

$ gnet compile

it will compile all the contracts which are already inside the contract folder and makes the Bytecodes and ABIs and put them in the build directory.
```
```
Deploy smart contracts:

$ gnet migrate [accountname]

[accountname] is optional, if you do not want to use default account you can save your account in a standard account json file in the accounts folder and name it 'account.json'.

```
Be sure you launch the Gallactic and put all contracts on the contract folder before running these commands.

```
Call smart contract's functions:

$ gnet call <contract_name> <function_name> <parameters_list>  // Yet to be implemented

The parameters are pretty clear the only thing you need to care is parameters_list, its format must be like this:   var1,var2,...,varK (comma separated)

```

```
    Usage: gnet [options] [command]

  gnet

  Options:

    -V, --version                                                        output the version number
    -h, --help                                                           output usage information

  Commands:

    install|insl                                                         
    install gallactic blockchain, and copy the files to the home directory (.gallactic),   
    No need to initialize project for this command.
    
    uninstall|unsl                                                       
    uninstall gallactic blockchain, and back up the files to the home directory (gallactic-backup),   
    No need to initialize project for this command.
    
    run|rn                                                               
    run gallactic blockchain,you need install gallactic first!,   
    No need to initialize project for this command.
    
    init|int                                                             
    Initialize project, makes folders and files which are needed for starting a dapp project.
    
    compile|cmp                                                          
    Compile all contracts in contracts folder and makes artifacts in the build folder  
    you need to initialize a project before using this command.
    
    migrate|mgt [options] [accountname]                                  
    deploy contracts on the Gallactic  
    you need to initialize a project before using this command.
    
    account_info| ainf <address>
    Get account info of a specific address 
    you may need to initialize a project before using this command
    
    validator_info| vinf <address>
    Get validator info of a specific validator address 
    No need to initialize a project before using this command
    
    list_accounts|lacnt                                                  
    Load all accounts  
    you need to initialize a project before using this command.
    
    default_accounts|dacnt                                               
    List all predefined accounts  
    No need to initialize a project before using this command.
    
    create_account|crtac <pass_phrase>                                   
    Creates an account and saves the encrypted private key in $HOME/g_keystore.
    No need to initialize a project before using this command.
    
    balance|blnc <address>                                               
    Get balance of a specefic account  
    No need to initialize a project before using this command.
    
    stakes|stk <address>
    Get stakes of validator account
    No need to initialize a project before using this command
    
    sequence|seq <address>                                              
    Get sequence of a specefic account  
    No need to initialize a project before using this command.
    
    inspect|insp <address>
    Inspect details of a specific account stored in the local keystore(g_keystore). 
    This will display private key and public key.
    No need to initialize a project before using this command.
    
    transact|tx [options] <priv_key> <data> <address> <fee> <gas_limit>  
    (Unsafe!) Do regular transaction to a contract, you need pass the private key of sender and address of contract  
    you need to initialize a project before using this command.
    
    bond|bnd [options] <public_key> <stakes> <fee> <priv_key>
    (safe) To do Bond transaction, you need pass the validator publickey, stake amount, transaction fee, and private key of sender 
    you may need to initialize a project before using this command.
    
    unbond|ubnd [options] <address> <stakes> <fee> <priv_key>        
    (safe) To do Unbond transaction, you need pass account address, stake amount, transaction fee and private key of the validator 
    you may need to initialize a project before using this command.
    
    send|snd [options] <address> <amount> <priv_key>                  
    (safe) To do regular transaction, you need to pass the address of the receiver, amount and the private key of sender 
    you need to initialize a project before using this command.
    
    call|calf <contract_name> <function_name> [parameters_list]   //Yet to be implemented        
    Calls the function of specefic contract, you need to pass the list of parameters like this var1,var2,...,varK ,comma separated,   
    You need to initialize a project before using this command.
    
    chain_id|chid                                                        
    Get chain id of the blockchain  
    You need to initialize a project before using this command.
    
    genesis_hash|genhash                                                 
    Get Genesis Hash of the blockchain  
    You need to initialize a project before using this command.
    
    latest_block_height|lbckh                                            
    Get Latest Block Hash of the blockchain  
    You need to initialize a project before using this command.   
    
    info|inf                                                             
    Get Info of the blockchain  
    You need to initialize a project before using this command.
    
    latest_block|lblck                                                   
    Get Latest Block of the blockchain  
    You may need to initialize a project before using this command.
    
    block|blck <block_height>                                            
    Get the specific Block of the blockchain  
    You may need to initialize a project before using this command.
        
    list_transactions|ltxs <block_height>                                
    Get transactions of the specific Block   
    You may need to initialize a project before using this command.
      
    config|conf                                                          
    Get the current config of the gnet  
    If you haven't created any project gallactic url will be http://127.0.0.1:1337/rpc by default  
    You may need to initialize a project before using this command.
```

### Example :
* Calculator

```
pragma solidity 0.4.18;

contract Calculator {

    function Sum(int x1, int x2) public pure returns(int) {

        return (x1 + x2);
    }

    function Mul(int x1, int x2) public pure returns(int) {

        return (x1 * x2);
    }

    function Div(int x1, int x2) public pure returns(int) {

        return (x1 / x2);
    }

    function Sub(int x1, int x2) public pure returns(int) {

        return (x1 - x2);
    }

}

```
```
ahmad@blockchain:~/projects/calculator$ gnet compile

[ '/home/ahmad/projects/calculator/contracts/Calculator.sol' ]
Compiling ./contracts/Calculator.sol...
Compile finished successfully!!!
Artifacts have been created successfully!!!

ahmad@blockchain:~/projects/calculator$ gnet migrate

1)Calculator  :  

6060604052341561000f57600080fd5b6101d08061001e6000396000f300606060405260043610610062576000357c01000000000000000000000000000000000
00000000000000000000000900463ffffffff168063166dec531461006757806375aac69e146100a7578063eb638f12146100e7578063fa94904d14610127575b
600080fd5b341561007257600080fd5b6100916004808035906020019091908035906020019091905050610167565b60405180828152602001915050604051809
10390f35b34156100b257600080fd5b6100d16004808035906020019091908035906020019091905050610174565b604051808281526020019150506040518091
0390f35b34156100f257600080fd5b610111600480803590602001909190803590602001909190505061018a565b6040518082815260200191505060405180910
390f35b341561013257600080fd5b6101516004808035906020019091908035906020019091905050610197565b60405180828152602001915050604051809103
90f35b6000818303905092915050565b6000818381151561018157fe5b05905092915050565b6000818301905092915050565b60008183029050929150505600a
165627a7a723058207a1e93b6e5c4865a3bdbe8b35dc915a6e4d372e4f70c73338ff905d3f9e1f3c40029

Address : 28F6FCF5278157FF68476E9E165B6FDA406A4E10

Calculator has been successfully deployed! 

ahmad@blockchain:~/projects/calculator$ gnet call Calculator Mul 12,10
"120"

```

### Contributing
All contributions are welcome: use-cases, documentation, code, patches, bug reports, feature requests, etc. 
### License

MIT
