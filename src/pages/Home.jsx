import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const url = process.env.REACT_APP_URL_POSTMAN;

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
        <h1> {t('home:home')}</h1>
        <Link to="/login">{t('home:login')}</Link> <br />
        <Link to="/signup">{t('common:signupLink')}</Link>
      </>
  );
};

export default Home;
