import { useTranslation } from 'react-i18next';
import React from 'react';
import faq8 from './../img/faq/faq8.png';
import faq12 from './../img/faq/faq12.png';
import faq13 from './../img/faq/faq13.png';
import faq14 from './../img/faq/faq14.png';
import faq15 from './../img/faq/faq15.png';
import faq16 from './../img/faq/faq16.png';


const FAQ = () => {
  const { t } = useTranslation(['faq']);

  const faqs = Array.from(document.querySelectorAll(".acc"));
  const faqActive = Array.from(document.getElementsByClassName("acc active"));
  const faqPanel = Array.from(document.getElementsByClassName("panel"));

  console.log(faqs);

  const faqClick = event =>{
      var panel = event.target.nextElementSibling;
      if (event.target.classList.contains("active")){
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        event.target.classList.remove("active");
      } else {
        for (var j = 0; j < faqActive.length; j++) {
					faqActive[j].classList.remove("active");
				}
        for (var k = 0; k < faqPanel.length; k++) {
					event.target.classList.remove("active");
					faqPanel[k].style.maxHeight = null;
				}

        panel.style.maxHeight = panel.scrollHeight + "px";
        event.target.classList.add("active");
      } 
  }

  return (
    <>
      <h1>{t('FAQ')}</h1>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ1')}
      </div>
      <div className="panel">
        <p>{t('FAQ1-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ2')}
      </div>
      <div className="panel">
        <p>{t('FAQ2-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ3')}
      </div>
      <div className="panel">
        <p>{t('FAQ3-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ4')}
      </div>
      <div className="panel">
        <p>{t('FAQ4-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ5')}
      </div>
      <div className="panel">
        <p>
          {t('FAQ5-A')}{' '}
          <a href="mailto:birkle@carmenbirkle.de">team@secuire.de</a>
        </p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ6')}
      </div>
      <div className="panel">
        <p>{t('FAQ6-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ7')}
      </div>
      <div className="panel">
        <p>{t('FAQ7-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ8')}
      </div>
      <div className="panel">
        <div className="flexbox column allignCenter">
          <p>{t('FAQ8-A')}</p>
          <img className="panel-img" src={faq8} alt="Login" />
        </div>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ9')}
      </div>
      <div className="panel">
        <p>{t('FAQ9-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ10')}
      </div>
      <div className="panel">
        <p>{t('FAQ10-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ11')}
      </div>
      <div className="panel">
        <p>{t('FAQ11-A')}</p>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ12')}
      </div>
      <div className="panel">
        <div className="flexbox column allignCenter">
          <p>{t('FAQ12-A')}</p>
          <img className="panel-img" src={faq12} alt="add" />
        </div>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ13')}
      </div>
      <div className="panel">
        <div className="flexbox column allignCenter">
          <p>{t('FAQ13-A')}</p>
          <img className="panel-img" src={faq13} alt="change" />
        </div>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ14')}
      </div>
      <div className="panel">
        <div className="flexbox column allignCenter">
          <p>{t('FAQ14-A')}</p>
          <img className="panel-img" src={faq14} alt="delete" />
        </div>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ15')}
      </div>
      <div className="panel">
        <div className="flexbox column allignCenter">
          <p>{t('FAQ15-A')}</p>
          <img className="panel-img" src={faq15} alt="search" />
        </div>
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ16')}
      </div>
      <div className="panel">
        <div className="flexbox column allignCenter">
          <p>{t('FAQ16-A')}</p>
          <img className="panel-img" src={faq16} alt="PW Manager" />
        </div>
      </div>
    </>
  );
};
export default FAQ;
