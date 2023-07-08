/**
 * @fileoverview AGB Page
 */
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
        <h2 className="subheadline">{t('definition_headline')}</h2>
        <p>{t('content_definition')}</p>
        <p>{t('content_definition2')}</p>
        <br />
        <h2 className='subheadline'> {t('terms')}</h2>
        <p>{t('terms_content')}</p>
      </section>
    </>
  );
};
export default AGB;
