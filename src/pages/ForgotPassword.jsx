import { useTranslation } from 'react-i18next';
const ForgotPassword = () => {
  const { t } = useTranslation(['forgotpassword']);
  return (
    <>
      <h2>{t('showPWHint')}</h2>
      <input type="email" />
      <p>Platzhalter</p>
      <button>{t('showPWHintButton')}</button>
    </>
  );

};
export default ForgotPassword;
