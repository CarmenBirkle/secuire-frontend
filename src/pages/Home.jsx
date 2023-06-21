import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import  videoPic  from './../img/thumbnail-video.png';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = process.env.REACT_APP_URL_AZURE;
const url = `${baseUrl}DataEntry/all`;
//TODO remove in production
console.log('url', url);

const Home = () => {
  const { t } = useTranslation(['common', 'home']);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(url);
  //     console.log('fetch:', response);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
const api = axios.create({
  baseURL: baseUrl,
});

const fetchData = async () => {
  const token = Cookies.get('token');
  const url = `${baseUrl}DataEntry/all`;
  console.log('token aus fetchdata', token);
  try {
    const responseDataEntrys = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('fetch from main side:', responseDataEntrys);
    console.log('nur gefetchte daten', responseDataEntrys.data);
    // setEncryptedDataEntrys(responseDataEntrys.data);
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};



   useEffect(() => {
  fetchData();
   
   }, []);

 const handleImageClick = () => {
   const url = 'https://docsend.com/view/pavrpu9fch822waa';
   window.open(url, '_blank', 'noopener noreferrer');
 };

  return (
    <>
      <h1> {t('home:Seciure')}</h1>
      <p>{t('home:content')}</p>
      <br />
      <p>{t('home:video')}</p>

      <img
        className="video-pic"
        src={videoPic}
        alt="Videolink"
        onClick={handleImageClick}
      />

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
