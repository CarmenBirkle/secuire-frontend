import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import logo from '../../img/logo_icon.svg';

const Header = () => {
  const { i18n, t } = useTranslation(['header']);

  useEffect(() => {
    if (localStorage.getItem('i18nextLng')?.length > 2) {
      i18next.changeLanguage('en');
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      {/* TODO placeholder - links to the home page (maybe change?) will be //
      replaced by the logo */}
      <h2>{t('placeholder')} </h2>

      <Link to="/">
        <img src={logo} alt="Seciure" />
      </Link>
      <div id="navbarNav">
        <ul>
          <li>
            <select
              value={localStorage.getItem('i18nextLng')}
              // TODO Consultation in the team localstorage or cookie
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
