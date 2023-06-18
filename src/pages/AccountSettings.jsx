import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import deleteIcon from './../img/icon-delete.svg';
import editIcon from './../img/icon-work.svg';
import arrowIcon from './../img/icon_back.svg';
import copyIcon from './../img/icon-copy.svg';
import hideIcon from './../img/icon_hide.svg';
import showIcon from './../img/icon_show.svg';
import PwGenerator from './PwGenerator';





const AccountSettings = ({ user, setUser }) => {
  const { t } = useTranslation(['account']);
   const [buttonPopup, setButtonPopup] = useState(false);
   const togglePopup = () => {
     setButtonPopup(!buttonPopup);
   };

  const handleCloseClick = () => {
    console.log('close');
  }

  const handleDeleteClick = () => {
    console.log ('delete');
  }

  const handleEditClick = () => {
    console.log ('edit');
    togglePopup();
  }

  return (
    <>
      <section>
        <h1>{t('account')}</h1>
        <div className="singleEntry">
          <p>{t('username')}:</p>
          <p>{user.username}</p>
        </div>

        <div className="singleEntry">
          <p>{t('email')}:</p>
          <p>{user.email}</p>
        </div>

        <div className="singleEntry">
          <p>{t('passwordHint')}:</p>
          <p>{user.passwordHint}</p>
        </div>

        <div className="main_icons_bg">
          <img
            className="icon_button"
            src={arrowIcon}
            alt={t('back')}
            onClick={handleCloseClick}
          />
          <img
            className="icon_button"
            src={deleteIcon}
            alt={t('remove')}
            onClick={handleDeleteClick}
          />
          <img
            className="icon_button"
            src={editIcon}
            alt={t('edit')}
            onClick={handleEditClick}
          />
        </div>

        {buttonPopup && (
          <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={togglePopup}></button>
                <PwGenerator />
            </div>
          
          </div>)}
      </section>
    </>
  ); 
};
export default AccountSettings;
