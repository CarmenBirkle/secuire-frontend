import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { encryptObject } from './helperSites/Encrypt';
import { icons } from './helperSites/IconsDataEntry'; 
import { placeholderIcon} from './helperSites/IconsDataEntry';
import { createDataEntry } from './helperSites/Axios.jsx';




const CreateDataEntry = ({ setShowCreateDataEntry }) => {
  const { t } = useTranslation(['main']);
  const [category, setCategory] = useState('login');
  const [favourite, setFavourite] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
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
  const [showIconSelection, setShowIconSelection] = useState(false);
  const [errMsg, setErrMsg] = useState('');

 const resetState = () => {
   setFavourite(false);
   setSubject('');
   setSelectedIcon(null);
   setUsername('');
   setPassword('');
   setUrl('');
   setComment('');
   setNote('');
   setPin('');
   setCardnumber('');
   setExpirationdate('');
   setOwner('');
   setCvv('');
   setCardtype('');
   setCustomTopics([]);
 };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreateDataEntry(false);
    const inputData = {
      category,
      favourite,
      selectedIcon,
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
    console.log('Klartext: Eingabe Submit: ', inputData);

    const encryptedData = encryptObject(
      inputData,
      process.env.REACT_APP_SECRET
    );

    //TODO delete in production
    console.log('Verschlüsselt: Eingabe aus Submit:', encryptedData);
    //TODO error handling definieren
    //Send Data to Backend
    createDataEntry(encryptedData,setErrMsg)
      .then((response) => {
        console.log('Erfolgreiche Übertragung:', response);
      })
      .catch((error) => {
        console.error('Fehler beim Übertragen der Daten:', error);
        // if(!error.response){ // lost connection to server
        //    setErrMsg('No Server Response');
        // }else if (error.response?.status === 400) {
        //   setErrMsg('Bad Request');
        // }setErrMsg('Something went wrong');
      });

  };

  /**
   * Resets the customTopics array only when the category changes.
   * @param {Array} dependencies - An array of dependencies which includes the category value.
   * When the category value changes, the useEffect hook is triggered.
   */

  useEffect(() => {
    resetState();
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

  function getMinimumDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    return `${year}-${month}`;
  }




//  icon selection

     const handleIconSelect = (index) => {
       setSelectedIcon(index);
       setShowIconSelection(false);
     };

   const IconSelectionModal = () => {
     return (
       <div>
         <h4>Wähle ein Icon:</h4>
         <div>
           {icons.map((icon, index) => (
             <div
               key={index}
               onClick={() => handleIconSelect(index)}
               style={{ cursor: 'pointer' }}
             >
               <img style={{ width: '30px' }} src={icon} alt={icon} />
             </div>
           ))}
         </div>
       </div>
     );
   };
   
   // TODO Inline with wieder entfernen wenn classe definiert
   const renderSelectedIcon = () => {
     return (
       <img
         style={{ width: '30px' }}
         src={selectedIcon !== null ? icons[selectedIcon] : placeholderIcon}
         alt={selectedIcon !== null ? `Icon ${selectedIcon}` : 'Choose Icon'}
       />
     );
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
      {errMsg && <div>{errMsg}</div>}
      <select
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="login">{t('login')}</option>
        <option value="safenote">{t('safenotes')}</option>
        <option value="paymentcard">{t('paymentcards')} </option>
      </select>
      {showIconSelection && (
        <IconSelectionModal handleIconSelect={handleIconSelect} />
      )}
      <form onSubmit={handleSubmit}>
        {/* form-elements for login-type */}
        {category === 'login' && (
          <fieldset>
            <div onClick={() => setShowIconSelection(true)}>
              {renderSelectedIcon()}
            </div>
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
              type="text"
              id="url"
              name="url"
              placeholder={t('url')}
              pattern="^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9-_\.]+\.[a-zA-Z]+(:\d+)?(\/[a-zA-Z\d\.\-_]*)*"
              title="Gebe eine URL an: www.placeholder.de"
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

        {/* form-elements for safenote-type */}
        {category === 'safenote' && (
          <fieldset>
            <div onClick={() => setShowIconSelection(true)}>
              {renderSelectedIcon()}
            </div>
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
        {/* form-elements for paymentcard-type */}
        {category === 'paymentcard' && (
          <fieldset>
            <div onClick={() => setShowIconSelection(true)}>
              {renderSelectedIcon()}
            </div>
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
              min={getMinimumDate()}
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
        <button type="button" onClick={() => setShowCreateDataEntry(false)}>
          {t('cancel')}
        </button>

        <button className="submitButton" type="submit">
          {t('submit')}
        </button>
      </form>
    </>
  );
};
export default CreateDataEntry;
