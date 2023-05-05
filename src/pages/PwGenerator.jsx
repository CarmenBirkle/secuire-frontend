import { useTranslation } from 'react-i18next';

const PwGenerator = () => {
  const { t } = useTranslation(['pwgenerator']);
  return <h2>{t('placeholder')}</h2>;
};
export default PwGenerator;
