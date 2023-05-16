import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const url = 'https://c85ca89b-d4d6-47d1-a82a-94aad282f0cf.mock.pstmn.io/user';

const Home = () => {
  const { t } = useTranslation(['common', 'home']);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
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
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
    pushData();
  }, []);

  return (
    
      <div className="container">
        <h1> {t('home:home')}</h1>
        <Link to="/login">{t('home:login')}</Link> <br />
        <Link to="/signup">{t('common:signupLink')}</Link>
      </div>
  );
};

export default Home;
