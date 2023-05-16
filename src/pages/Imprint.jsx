import { useTranslation } from 'react-i18next';

const Imprint = () => {
  const { t } = useTranslation(['imprint']);
  return <h1>{t('placeholder')}</h1>;
};
export default Imprint;
