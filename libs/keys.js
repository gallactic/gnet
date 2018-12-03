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
   * @param {string} address Ethereum address.
   * @return {string} Keystore filename.
   */
  generateKeystoreFilename(address) {
    const filename = "UTC--" + new Date().toISOString() + "--" + address;
    return filename;
  }

  /**
   * Save the encrypted keyfile in hidden keystore
   * @param keyObject
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

    const keyfile = path.join(keypath, outfile + ".json ");
    fs.writeFile(keyfile, json, callback);
  }
};
