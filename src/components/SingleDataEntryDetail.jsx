import { useState } from 'react';
import { icons } from './helperSites/IconsDataEntry';
import { dummyIcon } from './helperSites/IconsDataEntry';
import { useTranslation } from 'react-i18next';
import deleteIcon from './../img/icon-delete.svg';
import editIcon from './../img/icon-work.svg';
import arrowIcon from './../img/icon_back.svg';
import copyIcon from './../img/icon-copy.svg';
import hideIcon from './../img/icon_hide.svg';
import showIcon from './../img/icon_show.svg';
import { deleteDataEntry } from './helperSites/Axios.jsx';
import { Link } from 'react-router-dom';
/**
 * Display Single DataEntry Overview component with Name
 * @returns for each DataEntry an Overview component
 */
const SingleDataEntryDetail = ({
  dataEntry,
  removeDataEntry,
  setSelectedId,
  setShowDetail,
  setEditMode,
}) => {
  const { t } = useTranslation(['main']);
  const [showSecret, setShowSecret] = useState(false);

  const togglePasswordVisibility = () => {
    setShowSecret(!showSecret);
  };


const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
      // TODO Userfeedback - text erfolgreich kopiert ? 
    })
    .catch((error) => {
      console.error('Failed to copy text to clipboard:', error);
      // TODO Userfeedback - text konnte nicht kopiert werden
    });
};




  const renderCustomTopics = () => {
    if (dataEntry.customTopics.length !== 0) {
      return dataEntry.customTopics.map((topic, index) => (
        <div key={index}>
          <strong>{topic.fieldName}</strong>: {topic.fieldValue}
        </div>
      ));
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setShowDetail(false);
  };

  //TODO: complete delete function when backend is ready

  const handleDeleteClick = async () => {
    console.log('Try Delete DataEntry with id: ', dataEntry.id);
    const response = await deleteDataEntry(dataEntry.id);
     if (response) {
     console.log('Dateneintrag erfolgreich gelöscht');
     // TODO Seite aktualisieren ggf. neues fetch ausführen,
   
   } else {
     console.log('Fehler beim Löschen des Dateneintrags');
   }
  };

  /**
   * Is triggered when the user clicks on the close button.
   */
  const handleCloseClick = () => {
    setShowDetail(false);
    setSelectedId(null);
    setShowSecret(false);
  };

  //TODO Inline styling entfernen, wenn in css definiert
  const renderDataEntryDetail = () => {
    switch (dataEntry.category) {
      case 'login':
        return (
          <>
            <section>
              <div className='entryImageCenter'>
                <img className='entryImage' src={icons[dataEntry.selectedIcon] || dummyIcon} />
              </div>
              <div className='singleEntry'>
              <label htmlFor="favourite">{t('favourite')}: </label>
              <input 
                    id="favourite"
                    type="checkbox"
                    checked={dataEntry.favourite ? true : false}
                    readOnly/>
              </div>
              <div className='singleEntry'>
                <p>{t('subject')}:</p>
                <p>{dataEntry.subject}</p>
              </div>
              <div className='singleEntry'>
                <p>{t('username')}:</p>
                <div className='flexbox allignCenter'>
                  <p>{dataEntry.username}</p>
                  <img
                      className='icon_circle'
                      onClick={() => copyToClipboard(dataEntry.username)}
                      src={copyIcon}
                      alt={t('copy')}
                    />
                </div>
              </div>
              <div className='singleEntry'>
                <p>{t('password')}:</p>
                
                  {showSecret ? (<p>{dataEntry.password}</p>) : ( <p> *******</p>)}
                  <div className='flexbox allignCenter'>
                    <div onClick={togglePasswordVisibility}>
                      {showSecret ? (
                        <img className='icon_circle' src={hideIcon} alt={t('hide')} />
                      ) : (
                        <img className='icon_circle' src={showIcon} alt={t('show')} />
                      )}
                    </div>
                    <div>
                      <img
                          className='icon_circle'
                          onClick={() => copyToClipboard(dataEntry.password)}
                          src={copyIcon}
                          alt={t('copy')}
                        />
                    </div>
                </div>
              </div>
              <div className='singleEntry'>
                <p>{t('url')}:</p>
                <a href={dataEntry.url}>{dataEntry.url}</a>
              </div>
              <div className='singleEntry'>
                <p>{t('comment')}:</p>
                <p>{dataEntry.comment}</p>
              </div>

              {renderCustomTopics()}
              <div className='main_icons_bg'>
                <img
                  className='icon_button'           
                  src={arrowIcon}
                  alt={t('back')}
                  onClick={handleCloseClick}
                />
                <img
                  className='icon_button'
                  src={deleteIcon}
                  alt={t('remove')}
                  onClick={handleDeleteClick}
                />
                <img
                  className='icon_button'
                  src={editIcon}
                  alt={t('edit')}
                  onClick={handleEditClick}
                />
                
              </div>
            </section>
          </>
        );
      case 'safenote':
        return (
          <>
            <section>
              <div className='entryImageCenter'>
                  <img className='entryImage' src={icons[dataEntry.selectedIcon] || dummyIcon} />
              </div>
              <div className='singleEntry'>
                <label htmlFor="favourite">{t('favourite')}: </label>
                <input 
                      id="favourite"
                      type="checkbox"
                      checked={dataEntry.favourite ? true : false}
                      readOnly/>
              </div>
              <div className='singleEntry'>
                <p>{t('subject')}:</p>
                <p>{dataEntry.subject}</p>
              </div>
              <div className='singleEntry'>
                <p>{t('note')}:</p>
                <p>{dataEntry.note}</p>
              </div>
              <div className='singleEntry'>
                <p>{t('comment')}:</p>
                <p>{dataEntry.comment}</p>
              </div>

            {renderCustomTopics()}
            <div className='main_icons_bg'>
                <img
                  className='icon_button'           
                  src={arrowIcon}
                  alt={t('back')}
                  onClick={handleCloseClick}
                />
                <img
                  className='icon_button'
                  src={deleteIcon}
                  alt={t('remove')}
                  onClick={handleDeleteClick}
                />
                <img
                  className='icon_button'
                  src={editIcon}
                  alt={t('edit')}
                  onClick={handleEditClick}
                />
              </div>
          </section>
          </>
        );
      case 'paymentcard':
        return (
          <>
          <section>
            <div className='entryImageCenter'>
                <img className='entryImage' src={icons[dataEntry.selectedIcon] || dummyIcon} />
            </div>
            <div className='singleEntry'>
              <label htmlFor="favourite">{t('favourite')}: </label>
              <input 
                id="favourite"
                type="checkbox"
                checked={dataEntry.favourite ? true : false}
                readOnly/>
            </div>
            <div className='singleEntry'>
              <p>{t('subject')}:</p>
              <p>{dataEntry.subject}</p>
            </div>
            <div className='singleEntry'>
              <p>{t('cardtype')}:</p>
              <p>{dataEntry.cardtype}</p>
            </div>
            <div className='singleEntry'>
              <p>{t('owner')}:</p>
              <p>{dataEntry.owner}</p>
            </div>
            <div className='singleEntry'>
              <p>{t('cardnumber')}:</p>
              <div className='flexbox allignCenter'>
                <p>{dataEntry.cardnumber}</p>
                <img
                  onClick={() => copyToClipboard(dataEntry.cardnumber)}
                  className='icon_circle'
                  src={copyIcon}
                  alt={t('copy')}
                />
              </div>
            </div>
            <div className='singleEntry'>
              <p>{t('expirationdate')}:</p>
              <p>{dataEntry.expirationdate}</p>
            </div>
            <div className='singleEntry'>
              <p>{t('pin')}:</p>
              {showSecret ? (
                <p>{dataEntry.pin}</p>
              ) : (
                <p>****</p>
              )}
              <div className='flexbox allignCenter'>
                <div onClick={togglePasswordVisibility}>
                  {showSecret ? (
                    <img className='icon_circle' src={hideIcon} alt={t('hide')} />
                  ) : (
                    <img className='icon_circle' src={showIcon} alt={t('show')} />
                  )}
                </div>
                <div>
                  <img
                    onClick={() => copyToClipboard(dataEntry.pin)}
                    className='icon_circle'
                    src={copyIcon}
                    alt={t('copy')}
                  />
                </div>
              </div>
              <div className='singleEntry'>
                <p>{t('cvv')}:</p>
                <p>{dataEntry.cvv}</p>
              </div>
              <div className='singleEntry'>
                <p>{t('comment')}:</p>
                <p>{dataEntry.comment}</p>
              </div>
            </div>

            {renderCustomTopics()}
            <div className='main_icons_bg'>
                <img
                  className='icon_button'           
                  src={arrowIcon}
                  alt={t('back')}
                  onClick={handleCloseClick}
                />
                <img
                  className='icon_button'
                  src={deleteIcon}
                  alt={t('remove')}
                  onClick={handleDeleteClick}
                />
                <img
                  className='icon_button'
                  src={editIcon}
                  alt={t('edit')}
                  onClick={handleEditClick}
                />
                
              </div>
              </section>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderDataEntryDetail()}
    </>
  );
};

export default SingleDataEntryDetail;
