import { useTranslation } from 'react-i18next';
const LegalNotice = () => {
  const { t } = useTranslation(['legalnotice']);
  return <h2>{t('placeholder')}</h2>;
};
export default LegalNotice;
