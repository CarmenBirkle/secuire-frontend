import { useTranslation } from 'react-i18next';
/**
 * Display Single DataEntry Overview component with Name
 * @returns for each DataEntry an Overview component
 */
const SingleDataEntry = ({ dataEntry, removeDataEntry }) => {
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

  const renderDataEntry = () => {
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
            <div>{t('subject')}:</div>
            <div>{dataEntry.subject}</div>
            {/* <div>{dataEntry.username}</div>
            <div>{dataEntry.url}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()} */}
          </>
        );
      case 'safenote':
        return (
          <>
            <label htmlFor="favourite">{t('favourite')}:</label>
            <input
              type="checkbox"
              id="favourite"
              checked={dataEntry.favourite ? true : false}
              readOnly
            />
            <div>{t('subject')}:</div>
            <div>{dataEntry.subject}</div>
            {/* <div>{dataEntry.note}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()} */}
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
            <div>{t('subject')}:</div>
            <div>{dataEntry.subject}</div>
            {/* <div>{dataEntry.cardtype}</div>
            <div>{dataEntry.owner}</div>
            <div>{dataEntry.cardnumber}</div>
            <div>{dataEntry.expirationdate}</div>
            <div>{dataEntry.pin}</div>
            <div>{dataEntry.cvv}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()} */}
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderDataEntry()}</>;
};

export default SingleDataEntry;