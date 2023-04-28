import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import axios from 'axios';
const url = 'https://c85ca89b-d4d6-47d1-a82a-94aad282f0cf.mock.pstmn.io/user';

const Home = () => {
  const { t } = useTranslation(['home']);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{t('home')}</h1>
    </div>
  );
};

export default Home;
