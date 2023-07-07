import { useTranslation } from 'react-i18next';

const Imprint = () => {
  const { t } = useTranslation(['imprint']);
  return (
    <>
       <section id="imprint">
        <h1>{t('imprint')}</h1>
        <h2>{t('tmg')}</h2>
      <div className='flexbox row start'>
        <div className='twocols'>
          <h2 className='subheadline'>{t('tmg')}</h2>
          <div className='flexbox row start'>
            <div className='twocols'>
            <p>Claudia Barthel<br />Dorfstr. 37 <br /> 84051 Essenbach <br />{' '}</p>
            </div>
            <div className='twocols'>
              <p>Stephan Bienhüls<br />Stegge 23 <br /> 46325 Borken <br />{' '}</p>
            </div>
          </div>
          <div className='flexbox row start'>
            <div className='twocols'>
              <p>Carmen Birkle<br />Kurze-Geismar-Str. 45 <br /> 37073 Göttingen <br />{' '}</p>
            </div>
            <div className='twocols'>
              <p> Björn Dardemann<br />Wittekstraße 60 <br /> 25421 Pinneberg <br />{' '}</p>
            </div>
          </div>
          <div className='flexbox row start'>
            <div className='twocols'>
              <p>Dominik Schlabs<br />Hans-Memling-Str. 7 <br /> 63853 Mömlingen <br />{' '}</p>
            </div>
            <div className='twocols'>
              <p>Carolin Walter<br />Bgm.-Georg-Quick-Str. 6 <br /> 69483 Wald-Michelbach <br />{' '}</p>
            </div>
          </div> 
          <div>
            <h2 className='subheadline distance'>{t('contact')}:</h2>
            <p>{t('phone')}: +49 (0) 551 29171037<br />E-Mail: birkle@carmenbirkle.de</p>
          </div>

        </div>
        <div className='twocols'>
         
          <h2 className='subheadline'>{t('note')}</h2>
          <p>{t('text')}</p>
          <h2 className='subheadline distance'>{t('copyright')}</h2>
          <p>
          </p>
          <h2 className='subheadline distance'>{t('VSBG')}</h2>
          <p>{t('VSBG content')}<br />{t('VSBG content2')}</p>
          <p>
            <em>
              {t('create')}{' '}
              <a href="https://www.activemind.de/datenschutz/impressums-generator/">
                {t('link')}
              </a>{' '}
            </em>
          </p>
        </div>
      </div>
      </section>
    </>
  );
};
export default Imprint;
