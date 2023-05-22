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

  const mobilebutton = document.getElementById("mobile_button");
  const nav = document.getElementById("nav");
  const links = document.getElementsByClassName("link");

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
    if(mobilebutton.classList.contains('open')) {
      mobilebutton.classList.replace('open', 'closed');
      nav.classList.remove('open');
    } else {
      mobilebutton.classList.replace('closed', 'open');
      nav.classList.add('open');
    }
  }
  const homeButtonClick = event => {
    mobilebutton.classList.replace('open', 'closed');
    nav.classList.remove('open');
    Array.from(links).forEach((el) => {
      el.classList.remove('active');
    });
  }
  
  return (
    <>
      {/* TODO placeholder - links to the home page (maybe change?) will be //
      replaced by the logo */}

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

       
        <div id="mobile_button" className="closed" onClick={menuButtonClick} >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
      </div>

      <nav id="nav" className="nav">
        <Navbar />
      </nav>
    </>
  );
};
export default Header;
