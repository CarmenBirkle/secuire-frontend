// List of all DataEntrys
import SingleDataEntry from "./SingleDataEntry";

const DataEntry = ({ dataEntrys, removeDataEntry }) => {
    console.log('dataEntrys in DataEntry:', dataEntrys);
  return <div>
    {dataEntrys.map((dataEntry)=>{
    return (
        <SingleDataEntry
          key={dataEntry.id}
          dataEntry={dataEntry}
          removeDataEntry={removeDataEntry}
        />
    );
  })
  }</div>;
};
export default DataEntry