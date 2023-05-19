/**
 * Provides encryption functionality using AES algorithm.
 */
import CryptoJS from 'crypto-js';

/**
 * Encrypts single data and returns the encrypted result as a string.
 *
 * @param data The data to be encrypted.
 * @param secretPass The secret password used for encryption.
 * @return The encrypted data as a string.
 */
export const Encrypt = (data, secretPass) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretPass
  ).toString();
  return encryptedData;
};

/**
 * Encrypts the multiple fields of the given input data object and returns an object
 *
 * @param inputData The input data object containing the fields to be encrypted.
 * @param secretPass The secret password used for encryption.
 * @return A new object with the encrypted fields.
 */
export const encryptObject = (inputData, secretPass) => {
  const encryptedData = {};

  for (const field in inputData) {
    console.log('Secret aus create', secretPass);
    if (inputData.hasOwnProperty(field)) {
      if (inputData[field] !== null) {
        encryptedData[field] = Encrypt(inputData[field], secretPass);
      } else {
        encryptedData[field] = null;
      }
    }
  }

  return encryptedData;
};
