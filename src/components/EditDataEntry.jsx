// import Decrypt from './helperSites/Decrypt';
import { useState, useEffect, useContext } from 'react';
import { icons } from './helperSites/IconsDataEntry';
import { dummyIcon } from './helperSites/IconsDataEntry';
import { useTranslation } from 'react-i18next';
import axios from 'axios';



const EditDataEntry = ({ dataEntry, setEditMode }) => {

 




  const initialState = {
    id: dataEntry.id,
    category: dataEntry.category,
    favourite: dataEntry.favourite,
    selectedIcon: dataEntry.selectedIcon,
    subject: dataEntry.subject,
    username: dataEntry.username,
    password: dataEntry.password,
    url: dataEntry.url,
    comment: dataEntry.comment,
    note: dataEntry.note,
    pin: dataEntry.pin,
    cardnumber: dataEntry.cardnumber,
    expirationdate: dataEntry.expirationdate,
    owner: dataEntry.owner,
    cvv: dataEntry.cvv,
    cardtype: dataEntry.cardtype,
    customTopics: dataEntry.customTopics,
  };

   const [state, setState] = useState(initialState);

  //  console.log('Initial state nach instanziierung: ', initialState);


  const { t } = useTranslation(['main']);

  console.log('ursprungsdaten: ', dataEntry);
  console.log('state: vor änderung ', state)



  const handleInputChange = (field, value) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
      // console.log('initialState: ', initialState);
        console.log(`Updated field ${field}: `, value);
        // console.log('state nach änderung: ', state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit - abgesendet: ', state);

  }




  return (
    <>
      EditDataEntry
      <form onSubmit={handleSubmit}>
        {/* form-elements for login */}
        {state.category === 'login' && (
          <fieldset>
            {/* <div onClick={() => setShowIconSelection(true)}>
              {renderSelectedIcon()}
            </div> */}
            <label htmlFor="favourite">{t('favourite')}</label>
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
              type="text"
              id="username"
              name="username"
              required
              placeholder={t('username')}
              value={state.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={t('password')}
              value={state.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <input
              type="text"
              id="url"
              name="url"
              placeholder={t('url')}
              pattern="^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9-_\.]+\.[a-zA-Z]+(:\d+)?(\/[a-zA-Z\d\.\-_]*)*"
              title="Gebe eine URL an: www.placeholder.de"
              value={state.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
            />
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              value={state.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
            />
            {/* {renderFields()}
            <button type="button" onClick={handleAddField}>
              {t('addField')}
            </button> */}
          </fieldset>
        )}

        {/* form-elements for safenotes */}
        {state.category === 'safenote' && (
          <fieldset>
            {/* <div onClick={() => setShowIconSelection(true)}>
              {renderSelectedIcon()}
            </div> */}
            <label htmlFor="favourite">{t('favourite')}</label>
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
            {/* {renderFields()}
            <button type="button" onClick={handleAddField}>
              {t('addField')}
            </button> */}
          </fieldset>
        )}
        {state.category === 'paymentcard' && (
          <fieldset>
            {/* <div onClick={() => setShowIconSelection(true)}>
              {renderSelectedIcon()}
            </div> */}
            <label htmlFor="favourite">{t('favourite')}</label>
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
            {/* {renderFields()}
            <button type="button" onClick={handleAddField}>
              {t('addField')}
            </button> */}
          </fieldset>
        )}
        <button
          type="button"
          // onClick={() => setShowCreateDataEntry(false)}
        >
          {t('cancel')}
        </button>

        <button type="submit"> {t('submit')}</button>
      </form>
    </>
  );
};
export default EditDataEntry;
