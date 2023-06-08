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
        Dorfstr. 37 <br /> 84051 Essenbach <br />{' '}
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
        Wittekstraße 60 <br /> P25421 Pinneberg <br />{' '}
      </p>
      <p>
        <br /> Dominik Schlabs
      </p>
      <p>
        Hans-Memling-Str. 7 <br /> 63853 Mömlingen <br />{' '}
      </p>
      <p>
        <br /> Carolin Walter
      </p>
      <p>
        Bgm.-Gg.-Quick-Str. 6 <br /> 69483 Wald-Michelbach <br />{' '}
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
