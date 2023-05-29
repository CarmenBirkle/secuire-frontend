/**
 * Display Single DataEntry Overview component with Name
 * @returns for each DataEntry an Overview component
 */
const SingleDataEntryDetail = ({
  dataEntry,
  removeDataEntry,
  setSelectedId,
  setShowDetail,
}) => {
  const renderCustomTopics = () => {
    if (dataEntry.customTopics.length !== 0) {
      return dataEntry.customTopics.map((topic, index) => (
        <div key={index}>
          <strong>{topic.fieldName}</strong>: {topic.fieldValue}
        </div>
      ));
    }
  };

  /**
   * Is triggered when the user clicks on the close button.
   */
  const handleCloseClick = () => {
    setShowDetail(false);
   setSelectedId(null);
  };

  const renderDataEntryDetail = () => {
    switch (dataEntry.category) {
      case 'login':
        return (
          <>
            <div onClick={handleCloseClick}>Placeholder Close Button</div>
            <input
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            />
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.username}</div>
            <div>{dataEntry.url}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div>Placeholder Edit Button</div>
          </>
        );
      case 'safenote':
        return (
          <>
            <div onClick={handleCloseClick}>Placeholder Close Button</div>
            <input
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            />
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.note}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div>Placeholder Edit Button</div>
          </>
        );
      case 'paymentcard':
        return (
          <>
            <div onClick={handleCloseClick}>Placeholder Close Button</div>
            <input
              type="checkbox"
              checked={dataEntry.favourite ? true : false}
              readOnly
            />
            <div>{dataEntry.subject}</div>
            <div>{dataEntry.cardtype}</div>
            <div>{dataEntry.owner}</div>
            <div>{dataEntry.cardnumber}</div>
            <div>{dataEntry.expirationdate}</div>
            <div>{dataEntry.pin}</div>
            <div>{dataEntry.cvv}</div>
            <div>{dataEntry.comment}</div>
            {renderCustomTopics()}
            <div>Placeholder Edit Button</div>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderDataEntryDetail()}</>;
};

export default SingleDataEntryDetail;
