/**
* @fileOverview
* CreateDataEntry component for creating a new data entry.
* Renders a form with input fields based on the selected category.
* Allows the user to enter details such as subject, username, password, URL, and more.
*/

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { encryptObject } from './helperSites/Encrypt';
import { icons } from './helperSites/IconsDataEntry';
import { placeholderIcon } from './helperSites/IconsDataEntry';
import { useNavigate } from 'react-router-dom';
import {
  createDataEntry,
  checkPasswordSecurity,
} from './helperSites/Axios.jsx';
import cancelIcon from './../img/icon-close.svg';
import deleteIcon from './../img/icon_delete_blue.svg';
import addIcon from './../img/icon_add_blue.svg';
import PwGenerator from '../pages/PwGenerator';
import validator from 'validator';

const CreateDataEntry = ({
  setShowCreateDataEntry,
  setReloadData,
  user,
  setShowSuccessCreateMsg,
}) => {
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
  const [cardtype, setCardtype] = useState('visa');
  const [customTopics, setCustomTopics] = useState([]);
  const [showIconSelection, setShowIconSelection] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [countLeaks, setCountLeaks] = useState(null);
  const [pwAPIError, setPwAPIError] = useState(null);
  const navigate = useNavigate();
  const [state, setState] = useState({ url: '' });
  const [urlError, setUrlError] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const togglePopup = () => {
    setButtonPopup(!buttonPopup);
  };

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
    setCardtype('visa');
    setCustomTopics([]);
  };
  /** handle the submit and create an data entry objects, sends to the service */

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
    const encryptedData = encryptObject(inputData, user.secretKey);
    createDataEntry(encryptedData, setErrMsg)
      .then((response) => {
        setReloadData((oldValue) => !oldValue);
        setShowSuccessCreateMsg(true);
      })
      .catch((error) => {
        if (!error.response) {
          // lost connection to server
          setErrMsg('No Server Response');
        } else if (error.response?.status === 400) {
          setErrMsg('Bad Request');
        }
        setErrMsg('Something went wrong');
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

  /**
   * If The user added a custom field, the customTopics array is updated.
   */
  const handleAddField = () => {
    setCustomTopics([...customTopics, { fieldName: '', fieldValue: '' }]);
  };

  /**
   * Handles the removal of a field at the specified index from the custom topics array.
   * @param  {number} index - The index of the field to be removed.
   */
  const handleRemoveField = (index) => {
    const updatedFields = [...customTopics];
    updatedFields.splice(index, 1);
    setCustomTopics(updatedFields);
  };

  /**
   * Handles the change of a field value for a custom topic at the specified index.
   * @param {number} index - The index of the custom topic.
   * @param {string} fieldKey - The key of the field to be changed.
   * @param {any} value - The new value for the field.
   */
  const handleFieldChange = (index, fieldKey, value) => {
    const updatedFields = [...customTopics];
    updatedFields[index][fieldKey] = value;
    setCustomTopics(updatedFields);
  };

  /**
   * Returns the minimum date in the format 'YYYY-MM', based on the current date.
   * @returns {string} The minimum date.
   */
  function getMinimumDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    return `${year}-${month}`;
  }

  /**
   * Handles the selection of an icon at the specified index.
   * @param {number} index - The index of the selected icon.
   */
  const handleIconSelect = (index) => {
    setSelectedIcon(index);
    setShowIconSelection(false);
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

  const renderSelectedIcon = () => {
    return (
      <img
        className="entryImage"
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
        <label htmlFor={`cancel-${index}`}>{t('deleteCF')}</label>
        <img
          id={`cancel-${index}`}
          className="icon_button"
          src={deleteIcon}
          alt={t('remove')}
          onClick={() => handleRemoveField(index)}
        />
      </div>
    ));
  };

  /**
   * Checks the password security and sets the error message.
   */
  useEffect(() => {
    if (countLeaks !== null) {
      setErrMsg(` ${countLeaks}`);
    }
  }, [countLeaks]);

  /**
   * Handles the change of the URL value and validates it.
   * @param {string} value - The new value for the URL.
   */
  const handleUrlChange = (value) => {
    const isValidUrl = validator.isURL(value, { require_protocol: false });
    if (!isValidUrl) {
      setUrlError(t('urlError'));
    } else {
      setUrlError(null);
    }
    setUrl(value);
  };

  return (
    <>
      <div className="custom-select">
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="login">{t('login')}</option>
          <option value="safenote">{t('safenotes')}</option>
          <option value="paymentcard">{t('paymentcards')} </option>
        </select>
      </div>

      {showIconSelection && (
        <IconSelectionModal handleIconSelect={handleIconSelect} />
      )}
      <form className="dataentry" onSubmit={handleSubmit}>
        {/* form-elements for login-type */}
        {category === 'login' && (
          <fieldset>
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
            {errMsg && (
              <p className="errorMessage">
                {t('dataLeak')}
                {errMsg}
              </p>
            )}
            {pwAPIError && (
              <p className="infoMessage">
                {pwAPIError === 'pwAPIErrorForbidden'
                  ? t('pwAPIErrorForbidden')
                  : t('pwAPIErrorNotReachable')}
              </p>
            )}
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={t('password')}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrMsg(null);
              }}
              onBlur={(e) => {
                if (e.target.value !== '') {
                  checkPasswordSecurity(
                    e.target.value,
                    setCountLeaks,
                    setPwAPIError
                  ).then((isValid, count) => {
                    if (!isValid) {
                    }
                  });
                }
              }}
            />

            <input
              type="text"
              id="url"
              name="url"
              placeholder={t('url')}
              title="Gebe eine URL an: www.placeholder.de"
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            {urlError && <p className="errorMessage">{urlError}</p>}

            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              onChange={(e) => setComment(e.target.value)}
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

        {/* form-elements for safenote-type */}
        {category === 'safenote' && (
          <fieldset>
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
            <p className="noSpace">{t('createCF')}</p>
            <img
              className="icon_button"
              src={addIcon}
              alt={t('addField')}
              onClick={handleAddField}
            />
          </fieldset>
        )}
        {/* form-elements for paymentcard-type */}
        {category === 'paymentcard' && (
          <fieldset>
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
            onClick={() => setShowCreateDataEntry(false)}
          />

          <button className="icon_button icon_save" type="submit"></button>
        </div>
      </form>

      <button className="popup-button submitButton" onClick={togglePopup}>
        {t('pwGenerator')}
      </button>
      {buttonPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-button" onClick={togglePopup}></button>
            <PwGenerator />
          </div>
        </div>
      )}
    </>
  );
};
export default CreateDataEntry;
