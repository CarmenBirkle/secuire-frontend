import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../helperSites/AppContext';

const Navbar = () => {
  const { t } = useTranslation(['sidebar']);

  
  const navbutton = React.useRef(document.getElementById("mobile_button"));
  const navigation = React.useRef(document.getElementById("nav"));
  const links = React.useRef(document.getElementsByClassName("link"));

  const navClick = event => {
    Array.from(links).forEach((el) => {
      el.classList.remove('active');
    });
    event.currentTarget.classList.add('active'); 
    navbutton.current.classList.replace('open', 'closed');   
    navigation.current.classList.remove('open');
    };

  return (
    <ul>
      <li id="navAccount" className="link" onClick={navClick} ref={links}>
        <NavLink to="account">{t('accountSettings')}</NavLink>
      </li>
      <li id="navMain" className="link" onClick={navClick} ref={links}>
        <NavLink to="/main">{t('allEntries')}</NavLink>
      </li>
      <li id="navFavourites" className="link" onClick={navClick} ref={links}>
        <NavLink to="/main?type=favourites">{t('favourites')}</NavLink>
      </li>
      <li id="navPassword" className="link" onClick={navClick} ref={links}>
        <NavLink to="/main?type=login">{t('passwords')}</NavLink>
      </li>
      <li id="navNotes" className="link" onClick={navClick} ref={links}>
        <NavLink to="/main?type=safenote">{t('safeNotes')}</NavLink>
      </li>
      <li id="navCards" className="link" onClick={navClick} ref={links}>
        <NavLink to="/main?type=paymentcard">{t('paymentCards')}</NavLink>
      </li>
      <li id="navPwGenerator" className="link" onClick={navClick} ref={links}>
        <NavLink to="pwgenerator">{t('passwordGenerator')}</NavLink>
      </li>
      <li id="navFAQ" className="link" onClick={navClick} ref={links}>
        <NavLink to="faq">{t('faq')}</NavLink>
      </li>
      <li id="navKnow" className="link" onClick={navClick} ref={links}>
        <NavLink to="nice2know">{t('nice2know')}</NavLink>
      </li>
    </ul>
  );
};
export default Navbar;
