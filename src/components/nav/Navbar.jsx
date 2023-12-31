/**
* @fileOverview
* Navbar component for rendering a navigation bar with links.
* Provides navigation links based on user login status and language translation.
*/

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../helperSites/AppContext';

const Navbar = () => {
  const { t } = useTranslation(['sidebar']);

  const navbutton = React.useRef(document.getElementById('mobile_button'));
  const navigation = React.useRef(document.getElementById('nav'));
  const { setShouldRenderCreateDataEntry } = useContext(AppContext);
  const { setCalledFromNavbar, logIn } = useContext(AppContext);
  const headerElement = document.getElementById('header');

  const navClick = (event) => {
    const links = document.querySelectorAll('.navlink');
    Array.from(links).forEach((el) => {
      el.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    navbutton.current.classList.replace('open', 'closed');
    navigation.current.classList.remove('open');
    headerElement.parentElement.classList.remove('front');
    setShouldRenderCreateDataEntry(false);
  };

  return (
    <ul>
      <li
        id="navAccount"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={navClick}
      >
        <NavLink to="account">{t('accountSettings')}</NavLink>
      </li>
      <li
        id="navMain"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={navClick}
      >
        <NavLink to="/main">{t('allEntries')}</NavLink>
      </li>
      <li
        id="navFavourites"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={navClick}
      >
        <NavLink to="/main?type=favourites">{t('favourites')}</NavLink>
      </li>
      <li
        id="navPassword"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={navClick}
      >
        <NavLink to="/main?type=login">{t('passwords')}</NavLink>
      </li>
      <li
        id="navNotes"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={navClick}
      >
        <NavLink to="/main?type=safenote">{t('safeNotes')}</NavLink>
      </li>
      <li
        id="navCards"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={navClick}
      >
        <NavLink to="/main?type=paymentcard">{t('paymentCards')}</NavLink>
      </li>
      <li
        id="navPwGenerator"
        className={`navlink ${!logIn && 'transparent'}`}
        onClick={(event) => {
          navClick(event);
          setCalledFromNavbar(true);
        }}
      >
        <NavLink to="pwgenerator">{t('passwordGenerator')}</NavLink>
      </li>
      <li id="navFAQ" className="navlink" onClick={navClick}>
        <NavLink to="faq">{t('faq')}</NavLink>
      </li>
      <li id="navKnow" className="navlink" onClick={navClick}>
        <NavLink to="nice2know">{t('nice2know')}</NavLink>
      </li>
    </ul>
  );
};
export default Navbar;
