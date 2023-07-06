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
import addIcon from '../img/icon-add.svg'
import searchIcon from './../img/icon-search.svg';



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
  const [editMode, setEditMode] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const FAILED_LOGINS = params.get('failedLogins');


  //const [encryptedDataEntrys, setEncryptedDataEntrys] = useState([]);
  // const [encryptedData, setEncryptedData] = useState([]);

  /**
   * showCreateDataEntry and setShowCreateDataEntry get from AppContext
   */
  const {
    showCreateDataEntry,
    shouldRenderCreateDataEntry,
    setShowCreateDataEntry,
    setShouldRenderCreateDataEntry,
  } = useContext(AppContext);

 

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
        Decrypt(dataEntry, 
          // process.env.REACT_APP_SECRET
          user.secretKey
          )
      );
      setDataEntrys(decryptedDataEntrys);
    }
  }, [encryptedDataEntrys]);

  //TODO remove in production
useEffect(() => {
  console.log('encryptedDataEntrys Main', encryptedDataEntrys);
  console.log('dataentrys:', dataEntrys);
}, [encryptedDataEntrys, dataEntrys]);



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

  /**
   * Is triggered when the component is mounted and fetches all data entries from the server.
   */
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [reloadData]);


  useEffect(() => {
    const handleCloseClick = () => {
      setShowDetail(false);
      setSelectedId(null);
      setShowCreateDataEntry(false);
      setEditMode(false);
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

  const searchBar = React.useRef(document.getElementById('searchBar'));
  /**
   * Function to show and hide searchbar on icon click.
   * @param {event} event - checks if Searchbar is already opened and replaces classes 'open' and 'closed' depending on result
   */
  const searchIconClick = (event) => {
    if (searchBar.current.classList.contains('open')) {
      searchBar.current.classList.replace('open', 'closed');
    } else {
      searchBar.current.classList.replace('closed', 'open');
    }
  };

  return (
    <>
      {searchTerm && (
        <div>
          <h4>Search Result</h4>
          <span>{searchTerm}</span>
        </div>
      )}

      {editMode ? (
        <EditDataEntry
          dataEntry={filteredDataEntries.find(
            (entry) => entry.id === selectedId
          )}
          setEditMode={setEditMode}
          setSelectedId={setSelectedId}
          setShowDetail={setShowDetail}
          setReloadData={setReloadData}
          user={user}
        />
      ) : showDetail ? (
        <SingleDataEntryDetail
          dataEntry={filteredDataEntries.find(
            (entry) => entry.id === selectedId
          )}
          selectedId={selectedId}
          setShowDetail={setShowDetail}
          setSelectedId={setSelectedId}
          setEditMode={setEditMode}
          setReloadData={setReloadData}
        />
      ) : (
        <>
          {!showCreateDataEntry && !shouldRenderCreateDataEntry && (
            <>
              <img
                className="icon_button search_button"
                src={searchIcon}
                onClick={() => searchIconClick()}
              />
              <section id="searchBar" className="closed" ref={searchBar}>
                <SearchBar handleSearch={handleSearch} />
              </section>
              <h1>
                {t('welcome')} {user?.username},
              </h1>
              {FAILED_LOGINS && (
                <p className="errorMessage">
                  {t('numberFailedLogin')}
                  {FAILED_LOGINS}
                </p>
              )}
              <h2 className="subheadline">
                {t(ENTRY_TYPE ? ENTRY_TYPE : 'main')}
              </h2>
              <DataEntry
                filteredDataEntries={filteredDataEntries}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setShowDetail={setShowDetail}
              />
            </>
          )}

          {(showCreateDataEntry || shouldRenderCreateDataEntry) && (
            <CreateDataEntry
              setShowCreateDataEntry={setShowCreateDataEntry}
              setReloadData={setReloadData}
              user={user}
            />
          )}

          {!showCreateDataEntry && !shouldRenderCreateDataEntry && (
            <div className="main_icons_bg">
              {' '}
              <img
                className="icon_button"
                onClick={handleClick}
                src={addIcon}
                alt={t('generateNew')}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Main;
