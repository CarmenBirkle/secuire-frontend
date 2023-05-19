import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateDataEntry from '../components/CreateDataEntry';
import EditDataEntry from '../components/EditDataEntry';
import axios from 'axios';

const Main = ({user}) => {
  const { t } = useTranslation(['main']);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ENTRY_TYPE = params.get('type');

// fetch all DataEntrys from Azure
  const baseUrl = process.env.REACT_APP_URL_AZURE;
  const url = `${baseUrl}/DataEntry/all`;

  const fetchData = async () => {
    try {
      const responseDataEntrys = await axios.get(url);
      console.log('fetch from main side:', responseDataEntrys);
    } catch (error) {
      console.log(error.response);
    }
  };
  
   useEffect(() => {
     fetchData();
   }, []);

  useEffect(() => {
    // const ENTRY_TYPE zur Filterung verwenden
    console.log(ENTRY_TYPE);
  }, [ENTRY_TYPE]);

  return (
    <>
      <h2>{t('placeholder')}</h2>
      <h3> ### eingeloggt als: {user?.email}</h3>         
      <h4> ### gewählte Filterung: {ENTRY_TYPE ? ENTRY_TYPE : 'keine'}</h4>
      <CreateDataEntry />
      <EditDataEntry />
    </>
  );
};

export default Main;
