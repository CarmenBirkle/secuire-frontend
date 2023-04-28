import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Header = () => {
  const { i18n, t } = useTranslation(['common']);

  useEffect(() => {
    if (localStorage.getItem('i18nextLng')?.length > 2) {
      i18next.changeLanguage('en');
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav>
      {/* TODO placeholder - links to the home page (maybe change?) will be //
      replaced by the logo */}
      <Link to="/">{t('title')}</Link>
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
          <li>
            {/* TODO take out this link and put it on the home page */}
            <Link to="/signup">{t('signupLink')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
