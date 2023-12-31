/**
* @fileOverview
* DataEntry component for rendering a list of data entries.
* Renders a grid container with SingleDataEntry components or SingleDataEntryDetail component based on the selectedId.
*/

import SingleDataEntry from './SingleDataEntry';
import SingleDataEntryDetail from './SingleDataEntryDetail';

const DataEntry = ({
  filteredDataEntries,
  removeDataEntry,
  selectedId,
  setSelectedId,
  setShowDetail,
}) => {
  return (
    <div className="gridContainer">
      {filteredDataEntries.map((dataEntry) => {
        if (selectedId === dataEntry.id) {
          return (
            <SingleDataEntryDetail
              key={dataEntry.id}
              dataEntry={dataEntry}
              removeDataEntry={removeDataEntry}
              setSelectedId={setSelectedId}
              setShowDetail={setShowDetail}
            />
          );
        } else {
          return (
            <SingleDataEntry
              key={dataEntry.id}
              dataEntry={dataEntry}
              removeDataEntry={removeDataEntry}
              setSelectedId={setSelectedId}
              setShowDetail={setShowDetail}
            />
          );
        }
      })}
    </div>
  );
};

export default DataEntry;
