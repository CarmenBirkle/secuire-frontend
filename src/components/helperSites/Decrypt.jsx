/**
 * @fileOverview Decrypts encrypted data using a secret password.
 *
 * This function decrypts the given encrypted data using the provided secret password.
 * It iterates over the properties of the encrypted data object, decrypts each encrypted value,
 * and stores the decrypted values in a new object.
 * Ignore the id and category field, because it is not encrypted.
 * @param {Object} encryptedData - The encrypted data object.
 * @param {string} secretPass - The secret password used for decryption.
 * @return {Object} The decrypted data object.
 */

import CryptoJS from 'crypto-js';

const Decrypt = (encryptedData, secretPass) => {
  let decryptedData = {};
  for (const key in encryptedData) {
    if (encryptedData.hasOwnProperty(key)) {
      const encryptedValue = encryptedData[key];
      if (key === 'category' || key === 'id' || key === 'userId') {
        decryptedData[key] = encryptedValue;
      } else if (encryptedValue !== null) {
        let decryptedValue = CryptoJS.AES.decrypt(
          encryptedValue,
          secretPass
        ).toString(CryptoJS.enc.Utf8);
        try {
          decryptedValue = JSON.parse(decryptedValue);
        } catch (e) {
        }
        if (key === 'favourite') {
          decryptedData[key] = decryptedValue !== false; 
        } else {
          decryptedData[key] = decryptedValue;
        }
      } else {
        decryptedData[key] = null;
      }
    }
  }
  return decryptedData; 
};


export default Decrypt;

