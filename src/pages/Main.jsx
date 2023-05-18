import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreateDataEntry from '../components/CreateDataEntry';
import EditDataEntry from '../components/EditDataEntry';

const Main = () => {
  const { t } = useTranslation(['main']);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ENTRY_TYPE = params.get('type');

  useEffect(() => {
    // const ENTRY_TYPE zur Filterung verwenden
    console.log(ENTRY_TYPE);
  }, [ENTRY_TYPE]);

  return (
    <>
      <h2>{t('placeholder')}</h2>
      <h4> ### gewählte Filterung: {ENTRY_TYPE ? ENTRY_TYPE : 'keine'}</h4>
      <CreateDataEntry />
      <EditDataEntry />
    </>
  );
};

export default Main;
