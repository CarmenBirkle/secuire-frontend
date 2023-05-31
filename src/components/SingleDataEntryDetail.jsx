import { icons } from './helperSites/IconsDataEntry';
import { dummyIcon } from './helperSites/IconsDataEntry';
import { useTranslation } from 'react-i18next';
import deleteIcon from './../img/icon-delete.svg';
import editIcon from './../img/icon-work.svg';
import arrowIcon from './../img/arrow.svg';
/**
 * Display Single DataEntry Overview component with Name
 * @returns for each DataEntry an Overview component
 */
const SingleDataEntryDetail = ({
  dataEntry,
  removeDataEntry,
  setSelectedId,
  setShowDetail,
  setEditMode
}) => {
  const { t } = useTranslation(['main']);
  
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
  };



//TODO Inline styling entfernen, wenn in css definiert
  const renderDataEntryDetail = () => {
    switch (dataEntry.category) {
      case 'login':
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
            <span>{t('username')}:</span>
            <div>{dataEntry.username}</div>
            <span>{t('url')}:</span>
            <div>{dataEntry.url}</div>
            <span>{t('comment')}:</span>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <img
              style={{ width: '30px' }}
              src={deleteIcon}
              alt={t('remove')}
              onClick={handleDeleteClick}
            />
            <img
              style={{ width: '30px' }}
              src={editIcon}
              alt={t('edit')}
              onClick={handleEditClick}
            />
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
            <span>{t('comment')}:</span>:
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <img
              style={{ width: '30px' }}
              src={deleteIcon}
              alt={t('remove')}
              onClick={handleDeleteClick}
            />
            <img
              style={{ width: '30px' }}
              src={editIcon}
              alt={t('edit')}
              onClick={handleEditClick}
            />
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
            <span>{t('expirationdate')}:</span>
            <div>{dataEntry.expirationdate}</div>
            <span>{t('pin')}:</span>
            <div>{dataEntry.pin}</div>
            <span>{t('cvv')}:</span>
            <div>{dataEntry.cvv}:</div>
            <span>{t('comment')}:</span>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <img
              style={{ width: '30px' }}
              src={deleteIcon}
              alt={t('remove')}
              onClick={handleDeleteClick}
            />
            <img
              style={{ width: '30px' }}
              src={editIcon}
              alt={t('edit')}
              onClick={handleEditClick}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
     <>
     <img
              style={{ width: '30px' }}
              src={arrowIcon}
              alt={t('back')}
              onClick={handleCloseClick}
            />
     {renderDataEntryDetail()}
     </>
  );
};

export default SingleDataEntryDetail;
