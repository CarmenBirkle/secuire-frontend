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



const Main = ({user}) => {
  const { t } = useTranslation(['main']);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ENTRY_TYPE = params.get('type');
  const IS_FAVOURITES = params.get('type') === 'favourites';
  const [dataEntrys, setDataEntrys] = useState([]);
  const [filteredDataEntries, setFilteredDataEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //filternt nur die Favoriten
  // let trueFavourites = dataEntrys.filter(
  //   (dataEntry) => dataEntry.favourite === true
  // );
  // console.log(trueFavourites);


  const { showCreateDataEntry, setShowCreateDataEntry } =
    useContext(AppContext); // showCreateDataEntry und setShowCreateDataEntry aus dem AppContext holen

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

  // useEffect(() => {
  //   let updatedFilteredDataEntries = [...dataEntrys];

  //   if (ENTRY_TYPE === 'favourites') {
  //     updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
  //       (dataEntry) => dataEntry.favourite === true
  //     );
  //   }

  //   setFilteredDataEntries(updatedFilteredDataEntries);
  // }, [dataEntrys, ENTRY_TYPE]);


  useEffect(() => {
    let updatedFilteredDataEntries = dataEntrys;

    if (ENTRY_TYPE && ENTRY_TYPE !== 'favourites') {
      updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
        (dataEntry) => dataEntry.category === ENTRY_TYPE
      );
    }

    if (searchTerm) {
      updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
        (dataEntry) =>
          dataEntry.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ENTRY_TYPE === 'favourites') {
      // updatedFilteredDataEntries = updatedFilteredDataEntries.filter(
      //   (dataEntry) => dataEntry.favourite === true
      // );
       let trueFavourites = dataEntrys.filter(
         (dataEntry) => dataEntry.favourite === true
       );
       console.log(trueFavourites);
       updatedFilteredDataEntries = trueFavourites;
    }

    console.log('gefiltert:', updatedFilteredDataEntries);
    setFilteredDataEntries(updatedFilteredDataEntries);
  }, [dataEntrys, ENTRY_TYPE, IS_FAVOURITES, searchTerm]);

  const removeDataEntry = (id) => {
    //ggf. als async makieren / vorbereitete Funktion - später relevant, wird aber schon an die anderen components übergeben
  };

  /**
   * Is triggered when the component is mounted and fetches all data entries from the server.
   */
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setShowCreateDataEntry(true);
  };
  //Search Funktions

useEffect(() => {
  console.log('searchTerm', searchTerm);
}, [searchTerm]);

const handleSearch = (event) => {
  console.log('searchTerm', event.target.value);
  setSearchTerm(event.target.value);
};



  return (
    <>
      <h2>{t('placeholder')}</h2>
      <SearchBar handleSearch={handleSearch} />
      {/* TODO: Username (Begrüßung) ausgeben, wenn später gefetcht */}
      <h3>
        {t('welcome')} {user?.email},
      </h3>
      <h4> ### gewählte Filterung: {ENTRY_TYPE ? ENTRY_TYPE : 'keine'}</h4>
      {!showCreateDataEntry && (
        <DataEntry
          filteredDataEntries={filteredDataEntries}
          removeDataEntry={removeDataEntry}
        />
      )}
      {/* <DataEntry
        filteredDataEntries={filteredDataEntries}
        removeDataEntry={removeDataEntry}
      /> */}

      {showCreateDataEntry && (
        <CreateDataEntry setShowCreateDataEntry={setShowCreateDataEntry} />
      )}

      {!showCreateDataEntry && (
        <button onClick={handleClick}>Placeholder for Add Icon +</button>
      )}
    </>
  );
};

export default Main;
