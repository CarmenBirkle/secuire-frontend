import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateDataEntry from '../components/CreateDataEntry';
import EditDataEntry from '../components/EditDataEntry';
import DataEntry from '../components/DataEntry';
import Decrypt from '../components/helperSites/Decrypt';
import SearchBar from '../components/SearchBar';
import { encryptedDataEntrys, useFetchData } from '../components/helperSites/Axios';
import { AppContext } from '../components/helperSites/AppContext';
import SingleDataEntryDetail from '../components/SingleDataEntryDetail';



const Main = ({user}) => {
  const { t } = useTranslation(['main']);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ENTRY_TYPE = params.get('type');
  const IS_FAVOURITES = params.get('type') === 'favourites';
  const [dataEntrys, setDataEntrys] = useState([]);
  const [filteredDataEntries, setFilteredDataEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  /**
   * showCreateDataEntry and setShowCreateDataEntry get from AppContext
   */
  const { showCreateDataEntry, setShowCreateDataEntry } =
    useContext(AppContext);

  /**
   * to fetch all DataEntrys as encrypted data from the server.
   * @param {string} endpoint - The endpoint to be used for fetching data entries.
   * @return {object} - An object containing the encryptedDataEntrys array and the fetchData function.
   */
  const { encryptedDataEntrys, fetchData } = useFetchData('DataEntry/all');

  /**
   * Is triggered when the 'encryptedDataEntrys' variable changes
   * It decrypts each data entry in the 'encryptedDataEntrys' array using the 'Decrypt' function and sets the decrypted
   * data in the 'dataEntrys' state variable.
   */
  useEffect(() => {
    if (encryptedDataEntrys) {
      const decryptedDataEntrys = encryptedDataEntrys.map((dataEntry) =>
        Decrypt(dataEntry, process.env.REACT_APP_SECRET)
      );
      setDataEntrys(decryptedDataEntrys);
    }
  }, [encryptedDataEntrys]);

  /**
   * This useEffect hook updates the filtered list of data entries.
   * It filters by `ENTRY_TYPE` and `searchTerm` (case-insensitive).
   * It also handles the 'favourites' category specifically.
   * The hook runs whenever `dataEntrys`, `ENTRY_TYPE`, `IS_FAVOURITES`, or `searchTerm` change.
   */
  useEffect(() => {
    let updatedFilteredDataEntries = dataEntrys;

    if (ENTRY_TYPE && ENTRY_TYPE !== 'favourites') {
      updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
        (dataEntry) => dataEntry.category === ENTRY_TYPE
      );
    }

    if (ENTRY_TYPE === 'favourites') {
      updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
        (dataEntry) => dataEntry.favourite === true
      );
    }

    if (searchTerm) {
      updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
        (dataEntry) =>
          dataEntry.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDataEntries(updatedFilteredDataEntries);
  }, [dataEntrys, ENTRY_TYPE, IS_FAVOURITES, searchTerm]);

  const removeDataEntry = (id) => {
    //TODO ggf. als async makieren / vorbereitete Funktion - später relevant, wird aber schon an die anderen components übergeben
  };

  /**
   * Is triggered when the component is mounted and fetches all data entries from the server.
   */
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleCloseClick = () => {
      setShowDetail(false);
      setSelectedId(null);
    };

    handleCloseClick();
  }, [ENTRY_TYPE]); 

  /**
   * Is triggered when the user clicks on the + Icon.
   * It sets the 'showCreateDataEntry' state variable to true,
   * which will display the 'CreateDataEntry' component, and hide the 'DataEntry' component.
   */
  const handleClick = () => {
    setShowCreateDataEntry(true);
  };

  //<---- Search Functions ---->

  /**
   * Is triggered when the user types in the searchbar.
   * and sets the searchTerm state variable. Will be used to filter the data entries in live time.
   * @param {event} event - gets the value of the searchbar
   */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

return (
  <>
    {/* TODO Searchbar display fixed or dynamic ? */}
    <SearchBar handleSearch={handleSearch} />
    {/* TODO: Username (Begrüßung) ausgeben, wenn später gefetcht */}
    <h3>
      {t('welcome')} {user?.email},
    </h3>
    <h4>{t(ENTRY_TYPE ? ENTRY_TYPE : 'main')}</h4>

    {searchTerm && (
      <div>
        <h4>Search Result</h4>
        <span>{searchTerm}</span>
      </div>
    )}

    {showDetail ? (
      <SingleDataEntryDetail
        dataEntry={filteredDataEntries.find((entry) => entry.id === selectedId)}
        selectedId={selectedId}
        setShowDetail={setShowDetail}
        setSelectedId={setSelectedId}
      />
    ) : (
      <>
        {!showCreateDataEntry && (
          <DataEntry
            filteredDataEntries={filteredDataEntries}
            removeDataEntry={removeDataEntry}
            selectedId={selectedId} // Zustand hier weitergeben
            setSelectedId={setSelectedId} // Funktion hier weitergeben
            setShowDetail={setShowDetail}
          />
        )}

        {showCreateDataEntry && (
          <CreateDataEntry setShowCreateDataEntry={setShowCreateDataEntry} />
        )}

        {/* TODO + Icon */}
        {!showCreateDataEntry && (
          <button onClick={handleClick}>Placeholder for Add Icon +</button>
        )}
      </>
    )}
  </>
);
};

export default Main;
