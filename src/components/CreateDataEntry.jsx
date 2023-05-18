import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Encrypt from './helperSites/Encrypt';

const CreateDataEntry = () => {
  const { t } = useTranslation(['main']);
  const [category, setCategory] = useState('login');
  const [favourite, setFavourite] = useState(false);
  const [subject, setSubject] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [url, setUrl] = useState(null);
  const [comment, setComment] = useState(null);
  const [note, setNote] = useState(null);
  const [pin, setPin] = useState(null);
  const [cardnumber, setCardnumber] = useState(null);
  const [expirationdate, setExpirationdate] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [cardtype, setCardtype] = useState(null);
  const [customTopics, setCustomTopics] = useState([]);

  const secretPass = process.env.REACT_APP_SECRET;

  // Version alle Daten als ein Objekt verschlüsselt
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('submit');
  //   const data = {
  //     category,
  //     favourite,
  //     subject,
  //     username,
  //     password,
  //     url,
  //     comment,
  //     note,
  //     pin,
  //     cardnumber,
  //     expirationdate,
  //     owner,
  //     cvv,
  //     cardtype,
  //     customTopics: customTopics.map((field) => ({
  //       fieldName: field.fieldName,
  //       fieldValue: field.fieldValue,
  //     })),
  //   };

  // TODO delete in production
  // console.log('submit', data);
  // const encryptedData = Encrypt(data, process.env.REACT_APP_SECRET_KEY);
  // console.log('encryptedData', encryptedData);

  //   const encryptedData = {};
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       encryptedData[key] = encryptData(
  //         data[key],
  //         process.env.REACT_APP_SECRET_KEY
  //       );
  //     }
  //   }
  // };

  // bis hier alte Variante nur Infos die auch verschlüsselt werden, ohne Null werte

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('submit');
  //   const inputData = {
  //     category,
  //     favourite,
  //     subject,
  //     username,
  //     password,
  //     url,
  //     comment,
  //     note,
  //     pin,
  //     cardnumber,
  //     expirationdate,
  //     owner,
  //     cvv,
  //     cardtype,
  //     customTopics: customTopics.map((field) => ({
  //       fieldName: field.fieldName,
  //       fieldValue: field.fieldValue,
  //     })),
  //   };

  //   // TODO delete in production
  //   console.log('submit', inputData);

  //   const encryptedData = {};
  //   for (const key in inputData) {
  //     if (inputData.hasOwnProperty(key)) {
  //       encryptedData[key] = Encrypt(
  //         inputData[key],
  //         process.env.REACT_APP_SECRET_KEY
  //       );
  //     }
  //   }

  //   // Handle encrypted data
  //   console.log('Encrypted data:', encryptedData);
  // };

  // bis hier funktionierende neue Variante - wird alphabtisch sortiert

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    const inputData = {
      category,
      favourite,
      subject,
      username,
      password,
      url,
      comment,
      note,
      pin,
      cardnumber,
      expirationdate,
      owner,
      cvv,
      cardtype,
      customTopics: customTopics.map((field) => ({
        fieldName: field.fieldName,
        fieldValue: field.fieldValue,
      })),
    };

    // TODO delete in production
    console.log('submit', inputData);

    const encryptedData = {};
    // for (const key in inputData) {
    //   if (inputData.hasOwnProperty(key)) {
    //     const value = inputData[key];
    //     if (value !== null && value !== undefined) {
    //       encryptedData[key] = Encrypt(value, process.env.REACT_APP_SECRET_KEY);
    //     }
    //   }
    // }

    for (const field in inputData) {
      console.log('secret aus create', process.env.REACT_APP_SECRET_KEY);
      if (inputData.hasOwnProperty(field)) {
        if (inputData[field] !== null) {
          encryptedData[field] = Encrypt(
            inputData[field],
            process.env.REACT_APP_SECRET
          );
        } else {
          encryptedData[field] = null;
        }
      }
    }

    // Handle encrypted data
    console.log('Encrypted data:', encryptedData);
  };

  /**
   * Resets the customTopics array only when the category changes.
   * @param {Array} dependencies - An array of dependencies which includes the category value.
   * When the category value changes, the useEffect hook is triggered.
   */
  useEffect(() => {
    setCustomTopics([]);
  }, [category]);

  const handleAddField = () => {
    setCustomTopics([...customTopics, { fieldName: '', fieldValue: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...customTopics];
    updatedFields.splice(index, 1);
    setCustomTopics(updatedFields);
  };

  const handleFieldChange = (index, fieldKey, value) => {
    const updatedFields = [...customTopics];
    updatedFields[index][fieldKey] = value;
    setCustomTopics(updatedFields);
  };

  const renderFields = () => {
    return customTopics.map((field, index) => (
      <div key={index}>
        <input
          type="text"
          name={`fieldName-${index}`}
          value={field.fieldName}
          placeholder={`${t('varTitle')}${index + 1}`}
          onChange={(e) =>
            handleFieldChange(index, 'fieldName', e.target.value)
          }
        />

        <input
          type="text"
          name={`fieldValue-${index}`}
          value={field.fieldValue}
          placeholder={`${t('var')}${index + 1}`}
          onChange={(e) =>
            handleFieldChange(index, 'fieldValue', e.target.value)
          }
        />

        <button type="button" onClick={() => handleRemoveField(index)}>
          {t('remove')}
        </button>
      </div>
    ));
  };

  return (
    <>
      <select
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="login">{t('login')}</option>
        <option value="safenote">{t('safenotes')}</option>
        <option value="paymentcard">{t('paymentcards')} </option>
      </select>

      <form onSubmit={handleSubmit}>
        {/* form-elements for login */}
        {category === 'login' && (
          <fieldset>
            <label htmlFor="favourite">{t('favourite')}</label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={favourite}
              placeholder={t('favourite')}
              onChange={(e) => setFavourite(e.target.value)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder={t('username')}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={t('password')}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="url"
              id="url"
              name="url"
              placeholder={t('url')}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              onChange={(e) => setComment(e.target.value)}
            />
            {renderFields()}
            <button type="button" onClick={handleAddField}>
              {t('addField')}
            </button>
          </fieldset>
        )}

        {/* form-elements for safenotes */}
        {category === 'safenote' && (
          <fieldset>
            <label htmlFor="favourite">{t('favourite')}</label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={favourite}
              placeholder={t('favourite')}
              onChange={(e) => setFavourite(e.target.value)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="note"
              id="note"
              name="note"
              placeholder={t('note')}
              onChange={(e) => setNote(e.target.value)}
            />

            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              onChange={(e) => setComment(e.target.value)}
            />
            {renderFields()}
            <button type="button" onClick={handleAddField}>
              {t('addField')}
            </button>
          </fieldset>
        )}
        {category === 'paymentcard' && (
          <fieldset>
            <label htmlFor="favourite">{t('favourite')}</label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={favourite}
              placeholder={t('favourite')}
              onChange={(e) => setFavourite(e.target.value)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              onChange={(e) => setSubject(e.target.value)}
            />
            <select
              name="cardtype"
              id="cardtype"
              onChange={(e) => setCardtype(e.target.value)}
            >
              <option value="visa">{t('visa')}</option>
              <option value="master">{t('master')}</option>
              <option value="credit">{t('credit')} </option>
              <option value="giro">{t('giro')} </option>
            </select>
            <input
              type="text"
              id="owner"
              name="owner"
              required
              placeholder={t('owner')}
              onChange={(e) => setOwner(e.target.value)}
            />
            {/* pattern="(http(s)?:\/\/)?(www\.)?[^ ]+" */}
            <input
              type="number"
              inputMode="numeric"
              id="number"
              name="number"
              required
              placeholder={t('cardnumber')}
              onChange={(e) => setCardnumber(e.target.value)}
            />
            <input
              type="month"
              id="expirationdate"
              name="expirationdate"
              placeholder={t('expirationdate')}
              onChange={(e) => setExpirationdate(e.target.value)}
            />
            <input
              type="password"
              id="pin"
              name="pin"
              placeholder={t('pin')}
              onChange={(e) => setPin(e.target.value)}
            />
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder={t('cvv')}
              onChange={(e) => setCvv(e.target.value)}
            />
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              onChange={(e) => setComment(e.target.value)}
            />
            {renderFields()}
            <button type="button" onClick={handleAddField}>
              {t('addField')}
            </button>
          </fieldset>
        )}

        <button type="submit"> {t('submit')}</button>
      </form>
    </>
  );
};
export default CreateDataEntry;
