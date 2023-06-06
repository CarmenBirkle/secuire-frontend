import { useTranslation } from 'react-i18next';
import { icons } from './helperSites/IconsDataEntry';
import { dummyIcon } from './helperSites/IconsDataEntry';

/**
 * Display Single DataEntry Overview component with Name
 * @returns for each DataEntry an Overview component
 */
const SingleDataEntry = ({
  dataEntry,
  removeDataEntry,
  setSelectedId,
  setShowDetail,
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

  const handleCardClick = () => {
    setSelectedId(dataEntry.id);
    setShowDetail(true);
  };

  const renderDataEntry = () => {
    switch (dataEntry.category) {
      case 'login':
        return (
          <>
            {/* <label htmlFor="favourite">{t('favourite')}:</label> */}
            {/* <input
              id="favourite"
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            /> */}
            <div>
              <img
                style={{ width: '30px' }}
                src={icons[dataEntry.selectedIcon] || dummyIcon}
              />
            </div>
            <div>{t('subject')}:</div>
            <div>{dataEntry.subject}</div>
          </>
        );
      case 'safenote':
        return (
          <>
            {/* <label htmlFor="favourite">{t('favourite')}:</label> */}
            {/* <input
              type="checkbox"
              id="favourite"
              checked={dataEntry.favourite ? true : false}
              readOnly
            /> */}
            <div>
              <img
                style={{ width: '30px' }}
                src={icons[dataEntry.selectedIcon] || dummyIcon}
              />
            </div>
            <div>{t('subject')}:</div>
            <div>{dataEntry.subject}</div>
          </>
        );
      case 'paymentcard':
        return (
          <>
            {/* <label htmlFor="favourite">{t('favourite')}:</label>
            <input
              id="favourite"
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            /> */}
            <div>
              <img
                style={{ width: '30px' }}
                src={icons[dataEntry.selectedIcon] || dummyIcon}
              />
            </div>
            <div>{t('subject')}:</div>
            <div>{dataEntry.subject}</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dataEntry" onClick={handleCardClick}>
      {renderDataEntry()}
    </div>
  );
};

export default SingleDataEntry;
