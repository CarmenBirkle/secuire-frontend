import { useTranslation } from 'react-i18next';
const LegalNotice = () => {
  const { t } = useTranslation(['legalnotice']);
  return ( 
    <>
      <h1>{t('legalnotice')}</h1>
    </>
  

  );

};
export default LegalNotice;
