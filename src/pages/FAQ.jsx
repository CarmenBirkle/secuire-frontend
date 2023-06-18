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

  console.log(faqs);

  const faqClick = event =>{
    event.target.classList.toggle("active");
      var panel = event.target.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
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
        <p>{t('FAQ5-A')}</p>
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
        <p>{t('FAQ8-A')}</p>
        <img className="panel-img" src={faq8} alt="Login" />
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
        <p>{t('FAQ12-A')}</p>
        <img className="panel-img" src={faq12} alt="add" />
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ13')}
      </div>
      <div className="panel">
        <p>{t('FAQ13-A')}</p>
        <img className="panel-img" src={faq13} alt="change" />
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ14')}
      </div>
      <div className="panel">
        <p>{t('FAQ14-A')}</p>
        <img className="panel-img" src={faq14} alt="delete" />
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ15')}
      </div>
      <div className="panel">
        <p>{t('FAQ15-A')}</p>
        <img className="panel-img" src={faq15} alt="search" />
      </div>

      <div className="titel acc" onClick={faqClick}>
        {t('FAQ16')}
      </div>
      <div className="panel">
        <p>{t('FAQ16-A')}</p>
        <img className="panel-img" src={faq16} alt="PW Manager" />
      </div>
    </>
  );
};
export default FAQ;
