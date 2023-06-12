import { useEffect, useState } from 'react';
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
  const [selectedChoice, setSelectedChoice] = useState([
    'lowercase',
    'uppercase',
    'numbers',
    'symbols',
  ]);

  const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbersList = '0123456789';
  const symbolsList = '!@#$%^&*()?-_=+[{]}';

  /**
   * Function to generate a password.
   * @param {Object} e - optional event object to prevent default action.
   * The function creates a characterList string based on the user's selection of lowercase, uppercase, numbers, and symbols.
   * A loop is then used to create a password of a certain length (passwordLength),
   * with characters randomly picked from the characterList.
   * The password is then stored in the state variable.
   */
  const generatePassword = (e) => {
    if (e) e.preventDefault();
    let characterList = '';
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
    let tempPassword = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }
    setPassword(tempPassword);
  };

  /**
   * Function to manage the selection of checkboxes.
   * @param {string} type - Represents the checkbox value.
   * The function checks if the selected value already exists in the 'tempChoice' array.
   * If it exists, it's removed, otherwise, it's added.
   * The updated 'tempChoice' array is then stored back in the 'selectedChoice' state.
   */
  const handleCheckbox = (type) => {
    let tempChoice = selectedChoice;
    if (tempChoice.includes(type)) {
      const index = tempChoice.indexOf(type);
      tempChoice.splice(index, 1);
    } else {
      tempChoice.push(type);
    }
    setSelectedChoice(tempChoice);
  };

  /**
   * React's useEffect hook is used here to call the `generatePassword` function
   * whenever there's a change in the `passwordLength` state.
   */
  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  /**
   * This function attempts to copy the provided `text` to the user's clipboard.
   * If the operation is successful, it logs a confirmation message to the console and sets
   * a success message to the state. If the operation fails, it logs the error to the console
   * and sets an error message to the state.
   */
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
        setSuccessUserFeedback(t('successCopy'));
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
        setErrorUserFeedback(t('failedCopy'));
      });
  };

  return (
    <>
      <h2>{t('pwgenerator')}</h2>
      <p>{t('clickme')}</p>
      <p type="text" value={password}>
        {password}
      </p>
      <img
        className="icon_circle"
        onClick={() => copyToClipboard(password)}
        src={copyIcon}
        alt={t('copy')}
      />

      {successUserFeedback && (
        <p className="errorMessage">{successUserFeedback}</p>
      )}
      {errorUserFeedback && <p className="errorMessage">{errorUserFeedback}</p>}

      <form action="">
        <label htmlFor="myRange">{t('length')}</label>
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
          disabled={
            selectedChoice.length === 1 && selectedChoice.includes('lowercase')
          }
          onChange={() => {
            setLowercase(!lowercase);
            handleCheckbox('lowercase');
          }}
        />
        <label htmlFor="lowercase">{t('lowercase')}</label>
        <input
          type="checkbox"
          id="uppercase"
          disabled={
            selectedChoice.length === 1 && selectedChoice.includes('uppercase')
          }
          checked={uppercase}
          onChange={() => {
            setUppercase(!uppercase);
            handleCheckbox('uppercase');
          }}
        />
        <label htmlFor="uppercase">{t('uppercase')}</label>
        <input
          type="checkbox"
          id="numbers"
          disabled={
            selectedChoice.length === 1 && selectedChoice.includes('numbers')
          }
          checked={numbers}
          onChange={() => {
            setNumbers(!numbers);
            handleCheckbox('numbers');
          }}
        />
        <label htmlFor="numbers">{t('numbers')}</label>
        <input
          type="checkbox"
          id="symbols"
          disabled={
            selectedChoice.length === 1 && selectedChoice.includes('symbols')
          }
          checked={symbols}
          onChange={() => {
            setSymbols(!symbols);
            handleCheckbox('symbols');
          }}
        />
        <label htmlFor="symbols">{t('symbols')}</label>
        <button onClick={generatePassword}>Generate</button>
      </form>
    </>
  );
};
export default PwGenerator;
