/**
 * @fileoverview Nice2Know page 
 */
 import { useTranslation } from 'react-i18next';

const Nice2Know = () => {
  const { t } = useTranslation(['nice2know']);

  return (
    <>
      <h1>{t('nice2know')}</h1>
      
      <section className='safeInternet'>
        <h2>{t('title_content1')}</h2>
        <ol>
          <li>
            <h3 className='subheadline'>{t('content1_tip1')}</h3>
            <p>{t('content1_tip1_c')}</p>
          </li>
          <li>
            <h3 className='subheadline'>{t('content1_tip2')}</h3>
            <p>{t('content1_tip2_c')}</p>
          </li>
          <li>
            <h3 className='subheadline'>{t('content1_tip3')}</h3>
            <p>{t('content1_tip3_c')}</p>
          </li>
          <li>
            <h3 className='subheadline'>{t('content1_tip4')}</h3>
          </li>
          <li>
            <h3 className='subheadline'>{t('content1_tip5')}</h3>
          </li>
          <li>
            <h3 className='subheadline'>{t('content1_tip6')}</h3>
            <p>{t('content1_tip6_c')}</p>
          </li>
        </ol>
        <div className='distanceBottom'>
          {t('Source')}:{' '}
          <a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/cyber-sicherheitsempfehlungen_node.html">
            BSI - Bundesamt für Sicherheit in der Informationstechnik
          </a>
        </div>
      </section>
      
      <section className='safeInternet'>
        <h2>{t('title_content2')}</h2>
        <p>{t('content2')}</p>
        <div className='distanceBottom'>
          {t('Source')}:{' '}
          <a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/sichere-passwoerter-erstellen_node.html">
            BSI - Bundesamt für Sicherheit in der Informationstechnik
          </a>
      </div>
      </section >

      <section className='safeInternet'>
        <h2>{t('title_content3')}</h2>
        <p>{t('content3a')}</p>
        
        <p><a href="https://sec.hpi.de/ilc/"> https://sec.hpi.de/ilc/</a> {t('content3b')}</p>
        <div>
          {t('Source')}:{' '}
          <a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/Umgang-mit-Passwoertern/umgang-mit-passwoertern_node.html">
            BSI - Bundesamt für Sicherheit in der Informationstechnik
          </a>
        </div>
      </section>

      
      

      

      
      
      

      
    </>
  );
};

export default Nice2Know;
