// aktuell noch zum spielen und funktionen testen rund um die verschlüsselung
import CryptoJS from 'crypto-js';
import { useState } from 'react';

const CreateDataEntry = () => {
  const [text, setText] = useState(null);
  const [data, setData] = useState('encrypt');
  // encryptedData is the encrypted data that will be stored in the database
  // decryptedData is the decrypted data that will be shown to the user

  const [encrptedData, setEncrptedData] = useState('');
  const [decrptedData, setDecrptedData] = useState('');
  // TODO  currently hardcoded, discuss which secretPass to use. PW of the user in clear text ?
  const secretPass = 'XkhZG4fW2t2W';
  const cryptetPW = 'U2FsdGVkX1+w61vCiMZ2XT8aDXNcsJcoSlVchfzuAew='; // 123456

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptValue = encryptData();
    console.log('eingabe:', text);
  };

  const handleSubmitDeCrypt = (e) => {
    e.preventDefault();
    const decryptValue = decryptData();
  };

  //   verschlüsselt Daten
  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    setEncrptedData(data);
    //TODO console.log delete after testing
    console.log('verschlüsselt:', data);
  };

  // entschlüsselt Daten
  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(cryptetPW, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
    //TODO console.log delete after testing
    console.log('entschlüsselt:', data);
  };

  return (
    <>
      <h6>Minimalbeispiel verschlüsselung </h6>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="text"
          name="password"
          required
          placeholder="Password"
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit"> Submit</button>
      </form>
      <h6>Minimalbeispiel entschlüsselung</h6>
      <form onSubmit={handleSubmitDeCrypt}>
        <input
          type="text"
          id="data"
          name="password"
          required
          placeholder="Password"
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit"> Submit</button>
      </form>
    </>
  );
};
export default CreateDataEntry;
