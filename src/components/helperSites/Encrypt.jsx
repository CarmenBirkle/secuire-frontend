/**
 * Encrypts data using a secret password.
 *
 * This method encrypts the given data using the provided secret password.
 * It converts the data to a JSON string, encrypts it using the AES algorithm,
 * and returns the encrypted data as a Base64-encoded string.
 *
 * @param data The data to be encrypted.
 * @param secretPass The secret password used for encryption.
 * @return The encrypted data as a Base64-encoded string.
 * @throws Exception If an error occurs during encryption.
 */import CryptoJS from 'crypto-js';

const Encrypt = (data, secretPass) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretPass
  ).toString();
  return encryptedData;
};

export default Encrypt;
