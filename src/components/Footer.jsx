import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation(['common']);
  return (
    <footer>
      <h2>{t('placeholderfooter')}</h2>
      <Link to="/imprint">{t('imprint')}</Link> <br></br>
      <Link to="/legalnotice">{t('legalnotice')}</Link>
    </footer>
  );
};
export default Footer;
