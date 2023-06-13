import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL_AZURE;
const url = `${baseUrl}/dataentry/dataentry/all`;
//TODO remove in production
console.log('url', url);

const Home = () => {
  const { t } = useTranslation(['common', 'home']);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log('fetch:', response);
    } catch (error) {
      console.log(error.response);
    }
  };

  const pushData = async () => {
    try {
      const response = await axios.post(url, {
        username: 'test',
        password: 'test',
      });
      console.log('push', response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
    pushData();
  }, []);

  return (
    <>
      <h1> {t('home:Seciure')}</h1>
      <p>{t('home:content')}</p>
      <br/>
      <p>{t('home:video')}</p>

      <iframe
        src="https://iubhfs-my.sharepoint.com/personal/stephan_bienhuels_iu-study_org/_layouts/15/embed.aspx?UniqueId=3445481e-3d30-41f8-8f91-469b41f8501e&embed=%7B%22hvm%22%3Atrue%2C%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
        width="560"
        height="315"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="20230315_Projektvideo_Seciure_5min.mp4"
      ></iframe>

      <Link to="/login" className="submitButton loginLink">
        {t('home:login')}
      </Link>
      <Link to="/signup" className="submitButton signupLink">
        {t('common:signupLink')}
      </Link>
      </>
  );
};

export default Home;
