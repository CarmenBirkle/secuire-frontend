import { useTranslation } from 'react-i18next';
const ForgotPassword = () => {
  const { t } = useTranslation(['forgotpassword']);
  return <h2>{t('placeholder')}</h2>;
};
export default ForgotPassword;
