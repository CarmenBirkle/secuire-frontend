import { useTranslation } from 'react-i18next';

const Nice2Know = () => {
  const { t } = useTranslation(['nice2know']);

  return (
    <>
      <h2>{t('nice2know')}</h2>
      <h4>{t('title_content1')}</h4>
      <ol>
        <li>
          <h5>{t('content1_tip1')}</h5>
          {t('content1_tip1_c')}
        </li>
        <li>
          <h5>{t('content1_tip2')}</h5>
          {t('content1_tip2_c')}
        </li>
        <li>
          <h5>{t('content1_tip3')}</h5>
          {t('content1_tip3_c')}
        </li>
        <li>
          <h5>{t('content1_tip4')}</h5>
        </li>
        <li>
          <h5>{t('content1_tip5')}</h5>
        </li>
        <li>
          <h5>{t('content1_tip6')}</h5>
          {t('content1_tip6_c')}
        </li>
      </ol>

      <div>
        {t('Source')}:{' '}
        <a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/cyber-sicherheitsempfehlungen_node.html">
          BSI - Bundesamt für Sicherheit in der Informationstechnik
        </a>
      </div>

      <h4>{t('title_content2')}</h4>
      <p>{t('content2')}</p>

      <div>
        {t('Source')}:{' '}
        <a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/sichere-passwoerter-erstellen_node.html">
          BSI - Bundesamt für Sicherheit in der Informationstechnik
        </a>
      </div>

      <h4>{t('title_content3')}</h4>
      <p>{t('content3a')}</p>
      <a href="https://sec.hpi.de/ilc/"> https://sec.hpi.de/ilc/</a>
      <p>{t('content3b')}</p>

      <div>
        {t('Source')}:{' '}
        <a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/Umgang-mit-Passwoertern/umgang-mit-passwoertern_node.html">
          BSI - Bundesamt für Sicherheit in der Informationstechnik
        </a>
      </div>
    </>
  );
};

export default Nice2Know;
