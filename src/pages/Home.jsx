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
    <div>
      <h2> {t('home:home')}</h2>
      <Link to="/login">{t('home:login')}</Link> <br />
      <Link to="/signup">{t('common:signupLink')}</Link>
    </div>
  );
};

export default Home;
