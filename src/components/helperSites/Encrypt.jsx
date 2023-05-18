import CryptoJS from 'crypto-js';

const Encrypt = (data, secretPass) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretPass
  ).toString();
  return encryptedData;
};

export default Encrypt;
