// List of all DataEntrys
import SingleDataEntry from "./SingleDataEntry";

const DataEntry = ({
  filteredDataEntries,
  removeDataEntry,
  // selectedId,
  // setSelectedId,
}) => {
  //TODO remove in production
  console.log('dataEntrys in DataEntry:', filteredDataEntries);
  return (
    <div>
      {filteredDataEntries.map((dataEntry) => {
        return (
          <SingleDataEntry
            key={dataEntry.id}
            dataEntry={dataEntry}
            removeDataEntry={removeDataEntry}
          />
        );
      })}
    </div>
  );
};
export default DataEntry