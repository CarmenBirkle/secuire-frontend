import CryptoJS from 'crypto-js';

const Decrypt = (encryptedData, secretPass) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretPass);
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export default Decrypt;
