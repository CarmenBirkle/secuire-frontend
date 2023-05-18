import Decrypt from './helperSites/Encrypt';
import CryptoJS from 'crypto-js';

const EditDataEntry = () => {
  const cryptedData = {
    category: 'U2FsdGVkX19PmVfObo0+PvplM/i6pWcNl4i3YVyDYzM=',
    favourite: 'U2FsdGVkX1+Ra7NjD+SsOLKfZSpyuy5XtFSHwGFFDh4=',
    subject: 'U2FsdGVkX19MImWb6DBsGfxCg7IDePjvosb6Q8RZyHyMFS9UPQJHcZNwk+Dio5rS',
    username: null,
    password: null,
    url: null,
    comment: 'U2FsdGVkX1+YvjTlGmslsgR04ZltvaPrltMvLJ1zWvE=',
    note: 'U2FsdGVkX19z5idIaYAjQ5a7gRB3lZrC/lb2O6IX3lMVxv/PatVS3downCl8JFFp',
    pin: null,
    cardnumber: null,
    expirationdate: null,
    owner: null,
    cvv: null,
    cardtype: null,
    customTopics:
      'U2FsdGVkX18hVntxDChGIT22oocJ9B6+PPuP5tFwm0k4+wLo6ceE17i3WdfgC7RzixSq5YqmgtRVJfA0zKJr+PmnEl0jkNCQqiMt2ZntehGtk20vI3MMgDVMyj1burEWodPfWCnBvi3n7d6CF1S6xhCss70Q2jvA7HKt2QDfA6K6iUZz54fF4KWHUjYACK5oMs+gqfg32ch6SbvWyaORKBwcEiOaxNjIdhuy0X5SRyVQ1SJwx7666U6H7aN6D30R',
  };
  
  const decryptedData = {};


for (const key in cryptedData) {
  if (cryptedData.hasOwnProperty(key)) {
    const encryptedValue = cryptedData[key];

    // Überspringe Nullwerte
    if (encryptedValue !== null) {
      let decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        process.env.REACT_APP_SECRET
      ).toString(CryptoJS.enc.Utf8);

      // Versuche die entschlüsselten Werte zu parsen
      try {
        decryptedValue = JSON.parse(decryptedValue);
      } catch (e) {
        // Nichts tun, wenn der Wert nicht geparst werden kann
      }

      decryptedData[key] = decryptedValue;
    } else {
      decryptedData[key] = null;
    }
  }
}



  console.log('1. Variante',decryptedData);


  return <div>EditDataEntry</div>;
};
export default EditDataEntry;
