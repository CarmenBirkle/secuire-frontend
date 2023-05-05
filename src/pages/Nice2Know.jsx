import { useTranslation } from 'react-i18next';
const Nice2Know = () => {
  const { t } = useTranslation(['nice2know']);
  return <h2>{t('placeholder')}</h2>;
};
export default Nice2Know;
