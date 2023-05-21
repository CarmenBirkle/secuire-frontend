import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../helperSites/AppContext';

const Navbar = () => {
  const { t } = useTranslation(['sidebar']);

  const { showCreateDataEntry, setShowCreateDataEntry } =
    useContext(AppContext);

  const handleLinkClick = () => {
    setShowCreateDataEntry(false); 
  };

  return (
    //TODO Struktur nur grobaufgesetzt, ggf. über divs oder ul/li
    //TODO Links für alle HomeSeiten werden alle gleichzeitig active gesetzt - Lösung? https://reactrouter.com/en/6.11.1/components/nav-link
    <nav>
      <h2>{t('placeholder')}</h2>

      <NavLink
        to="account"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('accountSettings')}
      </NavLink>
      <br />
      <NavLink
        to="/main"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('allEntries')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=favourites"
        end
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('favourites')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=login"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('passwords')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=safenote"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('safeNotes')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=paymentcard"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('paymentCards')}
      </NavLink>
      <br />
      <NavLink
        to="pwgenerator"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('passwordGenerator')}
      </NavLink>
      <br />
      <NavLink
        to="faq"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('faq')}
      </NavLink>
      <br />
      <NavLink
        to="nice2know"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        onClick={handleLinkClick}
      >
        {t('nice2know')}
      </NavLink>
    </nav>
  );
};
export default Navbar;
