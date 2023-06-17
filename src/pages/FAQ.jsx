import { useTranslation } from 'react-i18next';
import React from 'react';


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
      <h1>{t('placeholder')}</h1>

      <div className='titel acc' onClick={faqClick}>Titel</div>
      <div className='panel'>
        <p>Test text</p>
      </div>
  </>
  );
};
export default FAQ;
