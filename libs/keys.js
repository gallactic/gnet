var gallactickeys = require("gallactickeys");
var schema = require("./schema").Schema;
var Promise = require("promise");

module.exports = class Keys {
 
  constructor() {

  }

  createAccount(pass_phrase) {
    return new Promise((resolve, reject) => {
      try {
        const keyObject = this.createGallacticKey(pass_phrase);
        this.exportToFile(keyObject, err => {
          if (err) {
            reject(err);
          } else {
            resolve(keyObject.address);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create gallactic keyfile encrypted with a password
   * @param {*String} passphrase to encrypt the keyFile
   */
  createGallacticKey(passphrase) {
    var dk = gallactickeys.create();
    var key = gallactickeys.exportAc(
      passphrase,
      dk.keyPair.privateKey,
      dk.salt,
      dk.iv
    );
    return key;
  }

  /**
   * Generate filename for a keystore file.
   * @param {string} address Gallactic address.
   * @return {string} Keystore filename.
   */
  generateKeystoreFilename(address) {
    const filename = "UTC--" + new Date().toISOString() + "--" + address;
    return filename;
  }

  /**
   * Save the encrypted keyfile in hidden keystore
   * @param keyObject of the encrypted privateKey
   */
  exportToFile(keyObject, callback) {
    let outfile, json;
    outfile = this.generateKeystoreFilename(keyObject.address);
    json = JSON.stringify(keyObject);

    const fs = require("fs"),
    path = require("path"),
    homedir = require("os").homedir(),
    keypath = path.join(homedir, schema.g_keystore);

    if (!fs.existsSync(keypath)) {
      fs.mkdirSync(keypath);
    }

    const keyfile = path.join(keypath, outfile + ".json");
    fs.writeFile(keyfile, json, callback);
  }

  inspectAccount(address, passphrase) {
    return new Promise((resolve, reject) => {
      try {
        this.readFileByAddress(address, (error, account) => {
          if(!error) {
            try {
              const privateKey =  gallactickeys.recover(passphrase, account);
              const result = this.getAccountInfo(privateKey)
              resolve(result);
            } catch (err) {
              reject(err);
            }
          } else {
            reject(error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * read file from g_keystore using address
   * @param {*String} address of the keyObject
   * @param {*function} callback 
   */
  readFileByAddress(address, callback) {
    const fs = require("fs"),
    path = require("path"),
    homedir = require("os").homedir(),
    keypath = path.join(homedir, schema.g_keystore);

    if (fs.existsSync(keypath)) {
      let fileFound = false;
      // read g_keystore directory
      fs.readdir(keypath, function(err, items) {
        for (var i=0; i<items.length; i++) {
          const file = items[i];
          const nameArray = file.split('--'); 
          if(nameArray.length > 1) {
            const fileName = nameArray[2].trim();
            if(address+'.json' === fileName) {
                fileFound = true;
                const keyfile = path.join(keypath, file);
                const keyContents = fs.readFileSync(keyfile, 'utf8');
                callback(null, JSON.parse(keyContents));
                break;
            }
          }
        }
        if(!fileFound) {
          callback('Can not find keystore file in storage', null);
        }
      });
    } else {
      callback('Can not find "g_keystore". Create account first.', null);
    }
  }

  /**
   * 
   * @param {*String} privateKey 
   */
  getAccountInfo(privateKey) {
    const result = {};
  
    const publicKeyHex = gallactickeys.utils.crypto.getTmPubKeyByPrivKey(privateKey);
    const publicKey = gallactickeys.utils.crypto.bs58Encode(publicKeyHex, 4);
    const address = gallactickeys.utils.crypto.getTmAddressByPrivKey(privateKey);

    result.privateKey = privateKey;
    result.publicKey = publicKey;
    result.address = address;   
    
    return result;
  }
};