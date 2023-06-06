import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL_AZURE;
const url = `${baseUrl}/DataEntry/all`;
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
      <Link to="/login" className='submitButton loginLink'>{t('home:login')}</Link>
      <Link to="/signup" className='submitButton signupLink'>{t('common:signupLink')}</Link>
    </>
  );
};

export default Home;
