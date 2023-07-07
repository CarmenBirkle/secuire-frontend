import { useTranslation } from 'react-i18next';
const AGB = () => {
  const { t } = useTranslation(['agb']);

  return (
    <>
      <section className="safeInternet">
        <h1>
          {t('agb')} <br /> {t('secuire')}
        </h1>
        <br />
        <br />
        <h3>{t('definition_headline')}</h3>
        {t('content_definition')}
        <br />
        <br />
        {t('content_definition2')}
        <br />
        <br />
        <h3> {t('terms')}</h3>
        {t('terms_content')}
        <br />
      </section>
    </>
  );
};
export default AGB;
