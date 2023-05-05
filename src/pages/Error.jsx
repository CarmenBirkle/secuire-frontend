import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <h2>{t('errorpage')}</h2>
      <Link to="/">{t('errorbackhome')}</Link>
    </>
  );
};
export default Error;
