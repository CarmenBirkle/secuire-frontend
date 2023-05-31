import { icons } from './helperSites/IconsDataEntry';
import { dummyIcon } from './helperSites/IconsDataEntry';
import { useTranslation } from 'react-i18next';

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
            <div onClick={handleCloseClick}>Placeholder Close Button</div>
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
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.username}</div>
            <div>{dataEntry.url}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div onClick={handleEditClick}>Placeholder Edit Button</div>
          </>
        );
      case 'safenote':
        return (
          <>
            <div onClick={handleCloseClick}>Placeholder Close Button</div>
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
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.note}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div onClick={handleEditClick}>Placeholder Edit Button</div>
          </>
        );
      case 'paymentcard':
        return (
          <>
            <div onClick={handleCloseClick}>Placeholder Close Button</div>
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
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.cardtype}</div>
            <div>{dataEntry.owner}</div>
            <div>{dataEntry.cardnumber}</div>
            <div>{dataEntry.expirationdate}</div>
            <div>{dataEntry.pin}</div>
            <div>{dataEntry.cvv}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div onClick={handleEditClick}>Placeholder Edit Button</div>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderDataEntryDetail()}</>;
};

export default SingleDataEntryDetail;
