import React, { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../helperSites/AppContext';

const Navbar = () => {
  const { t } = useTranslation(['sidebar']);

  var mobilebutton = document.getElementById("mobile_button");
  var nav = document.getElementById("nav");
  var links = document.getElementsByClassName("link");

  const navClick = event => {
    Array.from(links).forEach((el) => {
      el.classList.remove('active');
    });
    event.currentTarget.classList.add('active'); 
    mobilebutton.classList.replace('open', 'closed');   
    nav.classList.remove('open');
    };

  return (
    <ul>
       <li id="navAccount" className="link" onClick={navClick} ref={links}>
          <NavLink
            to="account"
          >
            {t('accountSettings')}
          </NavLink>
        </li>
        <li id="navMain" className="link" onClick={navClick} ref={links}>
          <NavLink 
            to="/main"
          >
            {t('allEntries')}
          </NavLink>
        </li>
        <li id="navFavourites" className="link" onClick={navClick} ref={links}>
          <NavLink 
            to="/main?type=favourites"
          >
            {t('favourites')}
          </NavLink>
        </li>
        <li id="navPassword" className="link" onClick={navClick} ref={links}>
          <NavLink 
            to="/main?type=passwords" 
          >
            {t('passwords')}
          </NavLink>
        </li>
        <li id="navNotes" className="link" onClick={navClick} ref={links}>
          <NavLink 
            to="/main?type=safenotes"
          >
            {t('safeNotes')}
          </NavLink>
        </li>
        <li id="navCards" className="link" onClick={navClick} ref={links}>
          <NavLink 
            to="/main?type=paymentcards"
          >
            {t('paymentCards')}
          </NavLink>
        </li>
        <li id="navPwGenerator" className="link" onClick={navClick} ref={links}>
          <NavLink 
            to="pwgenerator"
          >
            {t('passwordGenerator')}
          </NavLink>
        </li>
        <li id="navFAQ" className="link" onClick={navClick} ref={links}>
          <NavLink
            to="faq"
          >
            {t('faq')}
          </NavLink>
        </li>
        <li id="navKnow" className="link" onClick={navClick} ref={links}>
          <NavLink
            to="nice2know"
          >
            {t('nice2know')}
          </NavLink>
          </li>
      </ul>
  );
};
export default Navbar;
