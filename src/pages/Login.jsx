/**
  * @fileOverview This Page presents the login form with the following fields:
  * email, password, remember
  * The user can submit the form and is then navigated to the main page
  * The password is hashed and send to the backend with the salt. If the password is correct
  * the user is navigated to the main page.
  * An error message is shown if the user enters a wrong password and the wrongPassword state is increased by Backend and
  * will be reset if the user enters the correct password. This information is used to show in a message. 
  * If the user forgets the password he can click on the link and is navigated to the forgot password page.
  * The user can choose if he wants to be remembered by the browser. If he is remembered the email is saved in a cookie.
  * This cookie is deleted if the user unchecks the remember checkbox or during 7 days.
 */
import { useTranslation } from 'react-i18next';
import {useState, useRef, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSalt, loginUser } from './../components/helperSites/Axios.jsx'; 
import { useContext } from 'react';
import { AppContext } from './../components/helperSites/AppContext';
import LoadingAnimation from '../components/Loading.jsx';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';


const Login = ({setUser, user}) => {
  const { t } = useTranslation(['forgotpassword', 'login']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accountCreated = searchParams.get('accountCreated');
  const [wrongPasswortMsg, setWrongPasswortMsg] = useState(false);
  const [userBlockedMsg, setUserBlockedMsg] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setLogIn } = useContext(AppContext);


  /**
   * If the Site is render, it takes the cookie (if exist)
   * and use it for userlogin (email-field). Then the focus is set to the password-field.
   * If the cookie doesn't exist, the focus is set to the email-field.
   * @returns {void}
   */
  useEffect(() => {
    const emailCookie = Cookies.get('email');
    if (emailCookie) {
      setEmail(emailCookie);
      setRemember(true);
      if (inputRef.current) {
        passwordInputRef.current.focus();
      }
    } else {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, []);


  /**
   * Clears the error message when the success state changes.
   */
  useEffect(() => {
    setErrMsg('');
  }, [success]);

  /**
   * Handles form submission and generates a user-login object.
   * @param {object} e - The form submit event.
   * @returns {void}
   */
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!email || !password) return;
     const hashedPassword = await handleLogin(email, password);   
   };


async function handleLogin(email, password) {
  try {
    setLoading(true);
    const salt = await getSalt(email);
    const hashedPassword = await bcrypt.hash(password, salt);
    const loginResponse = await loginUser(email, hashedPassword);
    const secretKey = bcrypt.hashSync(process.env.REACT_APP_SECRET, salt);
    setUser({
       id: loginResponse.identityUserId,
       email: email,
       password: hashedPassword,
       salt: salt,
       wrongPassword: loginResponse.failedLogins,
       username: loginResponse.identityUser.userName,
       passwordHint: loginResponse.passwordHint,
       agbAcceptedAt: loginResponse.agbAcceptedAt,
       secretKey: secretKey,
     });
     Cookies.set('token', loginResponse.jwtToken);
    setLogIn(true);
    setLoading(false);
    setWrongPasswortMsg(false);
    if (loginResponse.failedLogins > 0) {
      navigate( `/main?type=favourites&failedLogins=${loginResponse.failedLogins}` );
    } else {
      navigate('/main?type=favourites');
    }
  } catch (error) {
    setLoading(false);
     if(error.response && error.response.status){
      switch (error.response.status) {
        case 400:
          setWrongPasswortMsg(true);
          break;
        case 403:
          setUserBlockedMsg(true);
          break;
        case 404:
          setWrongEmail(true);
          break;
        default:
      }
    }
    return false; 
  }
}

  /**
   * Handles the change event of the "Remember" checkbox.
   * If the checkbox is checked, the email is saved in a cookie.
   * If the checkbox is unchecked, the cookie is deleted.
   * @param {object} e - The change event object.
   * @returns {void}
   */
  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
    if (e.target.checked) {
      Cookies.set('email', email, { expires: 7 }); 
    } else {
      Cookies.remove('email');
    }
  };

  return (
    <div>
      {loading ? (
        <>
        <LoadingAnimation />
        </>
      ) : (
        <section>
          <form onSubmit={handleSubmit}>
            <h2>{t('login:login')}</h2>
            <div>
              {accountCreated && (
                <p className="successMessage">{t('login:success')}</p>
              )}
            </div>
            <input
              type="email"
              id="email"
              value={email}
              ref={inputRef}
              placeholder={t('login:email')}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              value={password}
              placeholder={t('login:password')}
              required
              ref={passwordInputRef}
              onChange={(e) => setPassword(e.target.value)}
            />
            {wrongPasswortMsg && (
              <p className="errorMessage">{t('login:wrongPWMsg')}</p>
            )}
            {userBlockedMsg && (
              <p className="errorMessage">{t('login:blockedMsg')}</p>
            )}
            {wrongEmail && (
              <p className="errorMessage">{t('login:wrongEmail')}</p>
            )}

            <div className="flexbox row-reverse allignCenter">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                disabled={
                  !Cookies.get('cookieConsent') ||
                  Cookies.get('cookieConsent') === 'false'
                }
                onChange={handleRememberChange}
              />
              <label htmlFor="remember">{t('login:remember')}</label>
            </div>
            <button className="submitButton" type="submit">
              {' '}
              {t('login:loginButton')}
            </button>
          </form>
          <br />
          <Link to="/forgotpassword">{t('forgotpassword:forgotPW')}</Link>{' '}
          <br />
        </section>
      )}
    </div>
  );
};

export default Login;
