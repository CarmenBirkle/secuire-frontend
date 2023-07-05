import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { encryptObject } from './helperSites/Encrypt';
import { dummyIcon } from './helperSites/IconsDataEntry';
import { icons } from './helperSites/IconsDataEntry';
import cancelIcon from './../img/icon-close.svg';
import deleteIcon from './../img/icon_delete_blue.svg';
import addIcon from './../img/icon_add_blue.svg';
import { updatedDataEntry,checkPasswordSecurity, } from './helperSites/Axios.jsx';
import validator from 'validator';
 

const EditDataEntry = ({
  dataEntry,
  setEditMode,
  setSelectedId,
  setShowDetail,
  setReloadData,
}) => {
  const initialState = {
    category: dataEntry.category,
    favourite: dataEntry.favourite || '',
    selectedIcon: dataEntry.selectedIcon || '',
    subject: dataEntry.subject || '',
    username: dataEntry.username || '',
    password: dataEntry.password || '',
    url: dataEntry.url || '',
    comment: dataEntry.comment || '',
    note: dataEntry.note || '',
    pin: dataEntry.pin || '',
    cardnumber: dataEntry.cardnumber || '',
    expirationdate: dataEntry.expirationdate || '',
    owner: dataEntry.owner || '',
    cvv: dataEntry.cvv || '',
    cardtype: dataEntry.cardtype || '',
    customTopics: dataEntry.customTopics || [],
  };
  const { t } = useTranslation(['main']);
  const [state, setState] = useState(initialState);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconSelection, setShowIconSelection] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [customTopics, setCustomTopics] = useState(
    dataEntry.customTopics || []
  );
  const [countLeaks, setCountLeaks] = useState(null);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState(false);

  // TODO entfernen
  console.log('ursprungsdaten: ', dataEntry);
  console.log('state: vor änderung ', state);
  console.log('id:', dataEntry.id);


  const handleInputChange = (field, value) => {
    if (field === 'url') {
      const isValidUrl = validator.isURL(value, { require_protocol: false });

      if (!isValidUrl) {
        setUrlError('Please enter a valid URL.');
      } else {
        setUrlError(null); // Kein Fehler
      }
    }

    // Zustandsaktualisierung für alle Felder
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit - abgesendet: ', state);
    setShowDetail(true);
    setEditMode(false);

    const updatedEntry = {
      ...state,
      customTopics: customTopics.map((field) => ({
        fieldName: field.fieldName,
        fieldValue: field.fieldValue,
      })),
    };


    console.log('Aktualisierter Datensatz:', updatedEntry);
    const encryptedData = encryptObject(
      updatedEntry,
      process.env.REACT_APP_SECRET
    );
    console.log('Verschlüsselte Daten: ', encryptedData);

    try {
      console.log('Verschlüsselte Daten: ', encryptedData);
      const response = await updatedDataEntry(dataEntry.id, encryptedData);
      setReloadData((oldValue) => !oldValue);
      console.log('erfolgreich gespeichert')
      return response.data;
    } catch (error) {
      console.error('Fehler beim Übertragen der Daten:', error);
    }

    setShowDetail(true);
    setSelectedId(dataEntry.id);
  };

  const handleCancel = () => {
    setShowDetail(true);
    setEditMode(false);
  };

  const handleAddField = () => {
    const newField = { fieldName: '', fieldValue: '' };
    setCustomTopics([...customTopics, newField]);
    setState((prevState) => ({
      ...prevState,
      customTopics: [...prevState.customTopics, newField],
    }));
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...customTopics];
    updatedFields.splice(index, 1);
    setCustomTopics(updatedFields);
  };

 
  const handleFieldChange = (index, fieldKey, value) => {
    console.log(`Eingabe in Feld ${index} (${fieldKey}): ${value}`);
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
        <img
          className="icon_button"
          src={deleteIcon}
          alt={t('remove')}
          onClick={() => handleRemoveField(index)}
        />
      </div>
    ));
  };

  // Icon selection
  const handleIconSelect = (index) => {
    setSelectedIcon(index);
    setState((prevState) => ({ ...prevState, selectedIcon: index }));
    setShowIconSelection(false);
  };

  const renderSelectedIcon = () => {
    return (
      <img
        className="entryImage"
        src={
          state.selectedIcon !== null && state.selectedIcon !== undefined
            ? icons[state.selectedIcon]
            : dummyIcon
        }
        alt={
          state.selectedIcon !== null && state.selectedIcon !== undefined
            ? `Icon ${state.selectedIcon}`
            : 'Choose Icon'
        }
      />
    );
  };

  const IconSelectionModal = () => {
    return (
      <div>
        <h2 className="subheadline">Icon:</h2>
        <div className="entryImageCenter">
          {icons.map((icon, index) => (
            <div
              key={index}
              onClick={() => handleIconSelect(index)}
              style={{ cursor: 'pointer' }}
            >
              <img className="entryImage" src={icon} alt={icon} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  function getMinimumDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // january is 0
    return `${year}-${month}`;
  }

  useEffect(() => {
    if (countLeaks !== null) {
      setErrMsg(` ${countLeaks}`);
    }
  }, [countLeaks]);

  return (
    <>
      {showIconSelection && (
        <IconSelectionModal handleIconSelect={handleIconSelect} />
      )}

      <form className="dataentry" onSubmit={handleSubmit}>
        {/* form-elements for login */}
        {state.category === 'login' && (
          <fieldset>
            {/* <p className="noSpace">{t('chooseIcon')}</p>
            <div
              className="entryImageCenter"
              onClick={() => setShowIconSelection(true)}
            >
              {renderSelectedIcon()}
            </div> */}
            {!showIconSelection && (
              <>
                <p className="noSpace">{t('chooseIcon')}</p>
                <div
                  className="entryImageCenter"
                  onClick={() => setShowIconSelection(true)}
                >
                  {renderSelectedIcon()}
                </div>
              </>
            )}
            <label className="visible-label" htmlFor="favourite">
              {t('favourite')}
            </label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              checked={state.favourite}
              placeholder={t('favourite')}
              onChange={(e) => handleInputChange('favourite', e.target.checked)}
            />

            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              value={state.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />

            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder={t('username')}
              value={state.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
            {errMsg && (
              <p className="errorMessage">
                {t('dataLeak')}
                {errMsg}
              </p>
            )}

            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={t('password')}
              value={state.password}
              onChange={(e) => {
                handleInputChange('password', e.target.value);
                setErrMsg(null);
              }}
              onBlur={(e) => {
                if (e.target.value !== '') {
                  checkPasswordSecurity(e.target.value, setCountLeaks).then(
                    (isValid, count) => {
                      if (!isValid) {
                      }
                    }
                  );
                }
              }}
            />

            <input
              type="text"
              id="url"
              name="url"
              placeholder={t('url')}
              value={state.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              required
            />
            {urlError && <p className="errorMessage">{urlError}</p>}
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              value={state.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
            />
            {renderFields()}
            <p className="noSpace">{t('createCF')}</p>
            <img
              className="icon_button"
              src={addIcon}
              alt={t('addField')}
              onClick={handleAddField}
            />
          </fieldset>
        )}

        {/* form-elements for safenotes */}
        {state.category === 'safenote' && (
          <fieldset>
            {/* <p className="noSpace">{t('chooseIcon')}</p>
            <div
              className="entryImageCenter"
              onClick={() => setShowIconSelection(true)}
            >
              {renderSelectedIcon()}
            </div> */}
            {!showIconSelection && (
              <>
                <p className="noSpace">{t('chooseIcon')}</p>
                <div
                  className="entryImageCenter"
                  onClick={() => setShowIconSelection(true)}
                >
                  {renderSelectedIcon()}
                </div>
              </>
            )}
            <label className="visible-label" htmlFor="favourite">
              {t('favourite')}
            </label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={state.favourite}
              placeholder={t('favourite')}
              onChange={(e) => handleInputChange('favourite', e.target.checked)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              value={state.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
            <input
              type="note"
              id="note"
              name="note"
              placeholder={t('note')}
              value={state.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
            />
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              value={state.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
            />

            {renderFields()}
            <p className="noSpace">{t('createCF')}</p>
            <img
              className="icon_button"
              src={addIcon}
              alt={t('addField')}
              onClick={handleAddField}
            />
          </fieldset>
        )}
        {state.category === 'paymentcard' && (
          <fieldset>
            {/* <p className="noSpace">{t('chooseIcon')}</p>
            <div
              className="entryImageCenter"
              onClick={() => setShowIconSelection(true)}
            >
              {renderSelectedIcon()}
            </div> */}
            {!showIconSelection && (
              <>
                <p className="noSpace">{t('chooseIcon')}</p>
                <div
                  className="entryImageCenter"
                  onClick={() => setShowIconSelection(true)}
                >
                  {renderSelectedIcon()}
                </div>
              </>
            )}
            <label className="visible-label" htmlFor="favourite">
              {t('favourite')}
            </label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={state.favourite}
              placeholder={t('favourite')}
              onChange={(e) => handleInputChange('favourite', e.target.checked)}
            />

            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              value={state.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
            <select
              name="cardtype"
              id="cardtype"
              value={state.cardtype}
              onChange={(e) => handleInputChange('cardtype', e.target.value)}
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
              value={state.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
            />
            <input
              type="number"
              inputMode="numeric"
              id="number"
              name="number"
              required
              placeholder={t('cardnumber')}
              value={state.cardnumber}
              onChange={(e) => handleInputChange('cardnumber', e.target.value)}
            />
            <input
              type="month"
              id="expirationdate"
              name="expirationdate"
              placeholder={t('expirationdate')}
              value={state.expirationdate}
              min={getMinimumDate()}
              onChange={(e) =>
                handleInputChange('expirationdate', e.target.value)
              }
            />
            <input
              type="password"
              id="pin"
              name="pin"
              placeholder={t('pin')}
              value={state.pin}
              onChange={(e) => handleInputChange('pin', e.target.value)}
            />
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder={t('cvv')}
              value={state.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
            />
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              value={state.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
            />
            {renderFields()}
            <p className="noSpace">{t('createCF')}</p>
            <img
              className="icon_button"
              src={addIcon}
              alt={t('addField')}
              onClick={handleAddField}
            />
          </fieldset>
        )}
        <div className="main_icons_bg">
          <img
            className="icon_button"
            src={cancelIcon}
            alt={t('cancel')}
            onClick={() => handleCancel()}
          />

          <button className="icon_button icon_save" type="submit">
            {/*{t('submit')}*/}
          </button>
        </div>
      </form>
    </>
  );
};
export default EditDataEntry;
