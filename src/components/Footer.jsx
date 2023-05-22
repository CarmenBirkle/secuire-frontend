import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation(['common']);

  
  
  return (
    <footer>
      <div className="container flexbox">
        <Link to="/imprint" className='link'>{t('imprint')}</Link>
        <span>|</span>
        <Link to="/legalnotice" className='link'>{t('legalnotice')}</Link>
      </div>
    </footer>
  );
};
export default Footer;
