/**
 * Display Single DataEntry Overview component with Name
 * @returns for each DataEntry an Overview component
 */
const SingleDataEntry = ({ dataEntry, removeDataEntry }) => {
  
  const renderCustomTopics = () => {
    if (dataEntry.customTopics.length !== 0) {
      return dataEntry.customTopics.map((topic, index) => (
      <div key={index}>
        <strong>{topic.fieldName}</strong>: {topic.fieldValue}
      </div>
    ));
  };
}
  
  const renderDataEntry = () => {
    switch (dataEntry.category) {
      case 'login':
        return (
          <>
            <input type="checkbox" checked={dataEntry.favourite} readOnly />
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.username}</div>
            <div>{dataEntry.url}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
          </>
        );
      case 'safenote':
        return (
          <>
            <input type="checkbox" checked={dataEntry.favourite} readOnly />
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.note}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
          </>
        );
      case 'paymentcard': 
        return (
          <>
            <input type="checkbox" checked={dataEntry.favourite} readOnly />
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.cardtype}</div>
            <div>{dataEntry.owner}</div>
            <div>{dataEntry.cardnumber}</div>
            <div>{dataEntry.expirationdate}</div>
            <div>{dataEntry.pin}</div>
            <div>{dataEntry.cvv}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderDataEntry()}</>;
};

export default SingleDataEntry;
