import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Navbar from '../nav/Navbar';
import logo from '../../img/logo_icon.svg';
import imgDE from '../../img/germany.png';
import imgEN from '../../img/united-kingdom.png';

const Header = () => {
  const i18n = useTranslation(['header']);
  const currentLang = localStorage.getItem('i18nextLng');
  const [toggleLang, setLangToggled] = useState(false);

  const navbutton = React.useRef(document.getElementById("mobile_button"));
  const navigation = React.useRef(document.getElementById("nav"));

  useEffect(() => {
    if (localStorage.getItem('i18nextLng')?.length > 2 && !toggleLang) {
      i18next.changeLanguage('en');
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const languageChangeClick = event => {
    if(toggleLang){
      i18next.changeLanguage('de');
    }else {
      i18next.changeLanguage('en');
    };
    setLangToggled(!toggleLang);
  }
  
  const menuButtonClick = event => {
    if(navbutton.current.classList.contains('open')) {
      navbutton.current.classList.replace('open', 'closed');
      navigation.current.classList.remove('open');
    } else {
      navbutton.current.classList.replace('closed', 'open');
      navigation.current.classList.add('open');
    }
  }
  const homeButtonClick = event => {
    navbutton.current.classList.replace('open', 'closed');
    navigation.current.classList.remove('open');
  }
  
  return (
    <>
      <div className='container flexbox'>

        <div id="logo" onClick={homeButtonClick}>
          <Link to="/">
            <img src={logo} alt="Seciure" />
          </Link>
        </div>

        <div id="langSelect">
          <span id="langFlag" style={{ backgroundImage:`url(${toggleLang ? imgEN : imgDE})` }} onClick={languageChangeClick}>
          </span>
            <select
              value={localStorage.getItem('i18nextLng')}
              // TODO Consultation in the team localstorage or cookie
              onChange={handleLanguageChange}
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
        </div>

       
        <div id="mobile_button" className="closed" onClick={menuButtonClick} ref={navbutton} >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
      </div>

      <nav id="nav" className="nav" ref={navigation}>
        <Navbar />
      </nav>
    </>
  );
};
export default Header;
