import { useTranslation } from 'react-i18next';

const Imprint = () => {
  const { t } = useTranslation(['imprint']);
  return (
    <>
      <h1>{t('imprint')}</h1>
      <h2>{t('tmg')}</h2>
      {/* //TODO Adressen nachtragen */}
      <p>
        <br /> Claudia Barthel
      </p>
      <p>
        Platzhalter Straße <br /> Platzhalter PLZ Ort <br />{' '}
      </p>
      <p>
        <br /> Stephan Bienhüls
      </p>
      <p>
        Platzhalter Straße <br /> Platzhalter PLZ Ort <br />{' '}
      </p>
      <p>
        <br /> Carmen Birkle
      </p>
      <p>
        Kurze-Geismar-Str. 45 <br /> 37073 Göttingen <br />{' '}
      </p>
      <p>
        <br /> Björn Dardemann
      </p>
      <p>
        Platzhalter Straße <br /> Platzhalter PLZ Ort <br />{' '}
      </p>
      <p>
        <br /> Dominik Schlabs
      </p>
      <p>
        Platzhalter Straße <br /> Platzhalter PLZ Ort <br />{' '}
      </p>
      <p>
        <br /> Carolin Walter
      </p>
      <p>
        Platzhalter Straße <br /> Platzhalter PLZ Ort <br />{' '}
      </p>
      <h3>{t('contact')}:</h3>
      <p>
        {t('phone')}: +49 (0) 551 29171037
        <br />
        E-Mail: birkle@carmenbirkle.de
      </p>
      <p></p>
      <p>
        <br />
      </p>
      <p></p>
      <h2>{t('note')}</h2>
      <p>{t('text')}</p>
      <p></p>
      <h3>{t('copyright')}</h3>
      <p>
        {/* //TODO stimmt das sonst referenzen ? Caro fragen - Alle Icons wurden
        selbst erstellt */}
        <br />
      </p>
      <p></p>
      <h2>{t('VSBG')}</h2>
      <p>{t('VSBG content')}</p>
      <p>{t('VSBG content2')}</p>
      <p></p>
      <p>
        <em>
          {t('create')}{' '}
          <a href="https://www.activemind.de/datenschutz/impressums-generator/">
            {t('link')}
          </a>{' '}
          {t('VSBG content')}
        </em>
      </p>
    </>
  );
};
export default Imprint;
