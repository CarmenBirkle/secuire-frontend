/**
 * @overview The Home component represents the home page of the application.
 * It handles translations, location changes, and displays content, including a video thumbnail.
 * It provides links for login and signup.
 */

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import videoPic from './../img/thumbnail-video.png';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation(['common', 'home']);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const wasLoggedOut = searchParams.get('loggedout');
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  /**
   * Handles the click event on an image.
   * Opens a new browser window with the specified URL.
   */
  const handleImageClick = () => {
    const url = 'https://docsend.com/view/pavrpu9fch822waa';
    window.open(url, '_blank', 'noopener noreferrer');
  };

  /**
   * Reacts to changes in the "location" state and performs actions accordingly.
   * If the "deleted" property is present in the "location" state, it shows a delete message,
   * and automatically hides the message after 5 seconds.
   *
   * @param location The location object containing state information.
   */
  useEffect(() => {
    if (location.state?.deleted) {
      setShowDeleteMessage(true);
      setTimeout(() => setShowDeleteMessage(false), 5000);
    }
  }, [location]);

  return (
    <>
      <h1> {t('home:Seciure')}</h1>
      <div>
        {wasLoggedOut && (
          <p className="errorMessage">
            {t('home:autologout')}
            <br />
            <br />
          </p>
        )}
      </div>
      <div>
        {showDeleteMessage && (
          <p className="errorMessage">{t('home:deleteuser')}.</p>
        )}
      </div>
      <p>{t('home:content1')}</p> <br />
      <p>{t('home:content2')}</p>
      <p>{t('home:content3')}</p>
      <p>{t('home:content4')}</p>
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
