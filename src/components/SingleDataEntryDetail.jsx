import { useState } from 'react';
import { icons } from './helperSites/IconsDataEntry';
import { dummyIcon } from './helperSites/IconsDataEntry';
import { useTranslation } from 'react-i18next';
import deleteIcon from './../img/icon-delete.svg';
import editIcon from './../img/icon-work.svg';
import arrowIcon from './../img/arrow.svg';
import copyIcon from './../img/icon-copy.svg'
import hideIcon from './../img/hide.png'
import showIcon from './../img/show.png'
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

  // Bereich löschen - das noch auslagern in Axios Datei:

  const handleDeleteClick = async () => {
    console.log('Delete DataEntry with id: ', dataEntry.id);
    //TODO:Backend Call and delete DataEntry
    // try {
    //   const response = await axios.delete(
    //     `https://your-api-url.com/endpoint/${dataEntry.id}`
    //   );
    //   if (response.status === 200) {
    //     removeDataEntry(dataEntry.id);
    //     setSelectedId(null);
    //     setShowDetail(false);
    //   } else {
    //     console.log('Fehler beim Löschen des Datensatzes');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
          <section className='singleEntry'>
            <table>
              <tr>
                <td><label htmlFor="favourite">{t('favourite')}:</label></td>
                <td><input 
                  id="favourite"
                  type="checkbox"
                  checked={dataEntry.favourite ? true : false}
                  readOnly/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}><img className='entryImage' src={icons[dataEntry.selectedIcon] || dummyIcon} />
                </td>
              </tr>
              <tr>
                <td>{t('subject')}:</td>
                <td>{dataEntry.subject}</td>
              </tr>
              <tr>
                <td>{t('username')}:</td>
                <td>
                  {dataEntry.username}
                  <img
                    className='icon_circle'
                    onClick={() => copyToClipboard(dataEntry.username)}
                    src={copyIcon}
                    alt={t('copy')}
                  />
                </td>
              </tr>
              <tr>
                <td>{t('password')}:</td>
                <td>
                  {showSecret ? (<p>{dataEntry.password}</p>) : ( <p> *******</p>)}
                  <div onClick={togglePasswordVisibility}>
                    {showSecret ? (
                      <img className='icon_circle_blue' src={hideIcon} alt={t('hide')} />
                    ) : (
                      <img className='icon_circle_blue' src={showIcon} alt={t('show')} />
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
                </td>
              </tr>
              <tr>
                <td>{t('url')}:</td>
                <td>{dataEntry.url}</td>
              </tr>
              <tr>
                <td>{t('comment')}:</td>
                <td>{dataEntry.comment}</td>
              </tr>
            </table>

            {renderCustomTopics()}
            <div className='main_icons_bg'>
              <img
                className='icon_button icon_circle_white'           
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
            <label htmlFor="favourite">{t('favourite')}:</label>
            <input
              id="favourite"
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            />
            <div>
              <img
                style={{ width: '30px' }}
                src={icons[dataEntry.selectedIcon] || dummyIcon}
              />
            </div>
            <span>{t('subject')}:</span>
            <div>{dataEntry.subject}</div>
            <span>{t('note')}:</span>
            <div>{dataEntry.note}</div>
            <span>{t('comment')}:</span>:<div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div className='main_icons_bg'>
            <img
                className='icon_button icon_circle_white'           
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
          </>
        );
      case 'paymentcard':
        return (
          <>
            <label htmlFor="favourite">{t('favourite')}:</label>
            <input
              id="favourite"
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            />
            <div>
              <img
                style={{ width: '30px' }}
                src={icons[dataEntry.selectedIcon] || dummyIcon}
              />
            </div>
            <span>{t('subject')}:</span>
            <div>{dataEntry.subject}</div>
            <span>{t('cardtype')}:</span>
            <div>{dataEntry.cardtype}</div>
            <span>{t('owner')}:</span>
            <div>{dataEntry.owner}</div>
            <span>{t('cardnumber')}:</span>
            <div>{dataEntry.cardnumber}</div>
            <img
              onClick={() => copyToClipboard(dataEntry.cardnumber)}
              style={{ width: '30px' }}
              src={copyIcon}
              alt={t('copy')}
            />
            <span>{t('expirationdate')}:</span>
            <div>{dataEntry.expirationdate}</div>
            <span>{t('pin')}:</span>
             {showSecret ? (
              <span>{dataEntry.pin}</span>
            ) : (
              <span>****</span>
            )}
            <div onClick={togglePasswordVisibility}>
              {showSecret ? (
                <img style={{ width: '30px' }} src={hideIcon} alt={t('hide')} />
              ) : (
                <img style={{ width: '30px' }} src={showIcon} alt={t('show')} />
              )}
            </div>
            <img
              onClick={() => copyToClipboard(dataEntry.pin)}
              style={{ width: '30px' }}
              src={copyIcon}
              alt={t('copy')}
            />
            <span>{t('cvv')}:</span>
            <div>{dataEntry.cvv}:</div>
            <span>{t('comment')}:</span>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div className='main_icons_bg'>
            <img
                className='icon_button icon_circle_white'           
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
