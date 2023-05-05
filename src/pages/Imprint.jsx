import { useTranslation } from 'react-i18next';

const Imprint = () => {
  const { t } = useTranslation(['imprint']);
  return <h2>{t('placeholder')}</h2>;
};
export default Imprint;
