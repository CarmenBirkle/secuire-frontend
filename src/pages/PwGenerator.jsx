import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import copyIcon from './../img/icon-copy.svg';

const PwGenerator = () => {
  const { t } = useTranslation(['pwgenerator']);
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [successUserFeedback, setSuccessUserFeedback] = useState(null);
  const [errorUserFeedback, setErrorUserFeedback] = useState(null);

  const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbersList = '0123456789';
  const symbolsList = '!@#$%^&*()?-_=+[{]}';

  const generatePassword = (e) => {
    e.preventDefault();
  let characterList ='';
    if (lowercase) {
      characterList += lowercaseList;
    }
    if (uppercase) {
      characterList += uppercaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolsList;
    }
    console.log('generatePassword');
    console.log(characterList);

    let tempPassword = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }
    setPassword(tempPassword);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
        setSuccessUserFeedback('text erfolgreich kopiert');
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
        setErrorUserFeedback('text konnte nicht kopiert werden');
        // TODO Userfeedback - text konnte nicht kopiert werden
      });
  };

  return (
    <>
      <h2>{t('pwgenerator')}</h2>
      <p>KLick me if you're happy</p>
      <input type="text" value={password} />
      <img
        className="icon_circle"
        onClick={() => copyToClipboard(password)}
        src={copyIcon}
        alt={t('copy')}
      />
      {/* //TODO Info wenn erfolgreich kopiert */}
      {successUserFeedback && (
        <p className="errorMessage">{successUserFeedback}</p>
      )}
      {errorUserFeedback && <p className="errorMessage">{errorUserFeedback}</p>}

      <form action="">
        <label htmlFor="myRange">Password Length</label>
        <p>{passwordLength}</p>
        <input
          type="range"
          min="8"
          max="30"
          defaultValue={passwordLength}
          id="myRange"
          onChange={(event) => setPasswordLength(event.currentTarget.value)}
        />

        <input
          type="checkbox"
          id="lowercase"
          checked={lowercase}
          onChange={() => setLowercase(!lowercase)}
        />
        <label htmlFor="lowercase">include Lower Case (a-z)</label>

        <input
          type="checkbox"
          id="uppercase"
          checked={uppercase}
          onChange={() => setUppercase(!uppercase)}
        />
        <label htmlFor="uppercase">include Upper Case (A-Z)</label>

        <input
          type="checkbox"
          id="numbers"
          checked={numbers}
          onChange={() => setNumbers(!numbers)}
        />
        <label htmlFor="numeric">include Numbers (0-9)</label>

        <input
          type="checkbox"
          id="symbols"
          checked={symbols}
          onChange={() => setSymbols(!symbols)}
        />
        <label htmlFor="alphanumeric">include Symbols(&-#)</label>

        <button onClick={generatePassword}>Generate</button>
      </form>
    </>
  );
};
export default PwGenerator;
