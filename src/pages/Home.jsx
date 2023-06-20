import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import  videoPic  from './../img/thumbnail-video.png';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_URL_AZURE;
const url = `${baseUrl}DataEntry/all`;
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

  // axios.post(`${baseUrl}DataEntry/dummy`).then((response) => {
  //   console.log('response post:',response.data);
  // });



 try {
      axios.post(`${baseUrl}DataEntry/Dummy`,{username: 'carmen'},
          {
            headers: {
              'Content-Type': 'application/json',
              'Content-Encoding': 30
            }
          })
      .then(response => { console.log(response.data) });
 } catch (error) {
    console.log('error aus dumme', error);
 }

    // try {
    //   axios
    //     .post(
    //       `${baseUrl}Authorization/register`,
    //       {
    //         username: 'Stephan4',
    //         hashedPassword:
    //           '$2a$10$2ixOEaEG9AJOw9lgMcVxteFMWTF2hRymByPf3e2CT4qTGThtGIYWG',
    //         email: 'stephan4@test.de',
    //         salt: '$2a$10$2ixOEaEG9AJOw9lgMcVxte',
    //         agbAcceptedAt: '2023-06-30T04:42:21.777Z',
    //         passwordHint: 'ich bin voll kreativ',
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         timeout: 60000,
    //       }
    //     )
    //     .then((response) => {
    //       console.log('Response aus login', response.data);
    //     });

      
    // } catch (error) {
    //   console.log(error);
    // }

  

  /***/

  //TODO rauswerfen
 const testemail =   'test@test.de'
 const url2 = `${baseUrl}Authorization/salt?email=test@test.de`;
 const fetchDatalogin = async () => {
    try {
      const response = await axios.get(url2);
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
    fetchDatalogin();
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
