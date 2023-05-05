import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
const Login = () => {
  const { t } = useTranslation(['forgotpassword', 'login']);
  return (
    <>
      <h2> {t('login:placeholder')}</h2>
      <br />
      <Link to="/forgotpassword">{t('forgotpassword:forgotPW')}</Link> <br />
    </>
  );
};
export default Login;
