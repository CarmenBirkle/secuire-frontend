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
import Cookies from 'js-cookie';
import { getSalt, loginUser } from './../components/helperSites/Axios.jsx'; 
import bcrypt from 'bcryptjs';
import { useContext } from 'react';
import { AppContext } from './../components/helperSites/AppContext';



const Login = ({setUser, user}) => {
  const { t } = useTranslation(['forgotpassword', 'login']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(0);
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
 
  //TODO: console.log entfernen
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

  // useEffect(() => {
  //   if (userBlockedMsg) {
  //     setWrongPasswortMsg(false);
  //   }
  // }, [userBlockedMsg]);


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


   //TODO kann später gelöscht werden
   useEffect(() => {
     console.log('user: ', user);
   }, [user]);


async function handleLogin(email, password) {
  console.log('aus handlelogin: email',email, 'password', password)
  try {
    setLoading(true);
    const salt = await getSalt(email);
    console.log('Salt aus handlelogin: ', salt); 
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed Password: ', hashedPassword);
    const loginResponse = await loginUser(email, hashedPassword);
    console.log('erfolgreich');
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
    console.log('loginResponse: ', loginResponse);
    setWrongPasswortMsg(false);
    if (loginResponse.failedLogins > 0) {
      console.log(
        `Fehlgeschlagene Anmeldeversuche: ${loginResponse.failedLogins}`
      );
      navigate(
        `/main?type=favourites&failedLogins=${loginResponse.failedLogins}`
      );
    } else {
      navigate('/main?type=favourites');
    }

 
  } catch (error) {
    setLoading(false);
     if(error.response && error.response.status){
      switch (error.response.status) {
        case 400:
          console.log('Falsches Passwort');
          setWrongPasswortMsg(true);
          break;
        case 403:
          console.log('User ist gesperrt, versuche es später erneut');
          setUserBlockedMsg(true);
          break;
        case 404:
          console.log('email adresse nicht gefunden');
          setWrongEmail(true);
          break;
        default:
          console.log('fehler aufgetreten');
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
        <div className="loader-container">
          <div className="spinner">
            <svg viewBox="0 0 600 600">
              <g
                transform="matrix(0.9110794354 0 0 0.9289433609 197.3644851671 251.0981771805)"
                id="Wbkz6S6dnrXMHwP_VQnPo"
              >
                <path
                  className="path"
                  stroke="#2454C4"
                  strokeWidth="30"
                  fill="transparent"
                  d="M 109.67316 -163.44819 C 108.50901999999999 -192.55180000000001 91.62892 -242.61001000000002 0.24358999999999753 -240.28172 C -91.14174 -237.95343 -110.93220000000001 -190.80558000000002 -113.84256 -160.53783 C -116.75292 -130.27008 -121.99157000000001 -102.33061000000001 -73.67958000000002 -71.48079000000001 C -25.367590000000014 -40.630960000000016 49.71971999999998 -37.13853000000001 93.95720999999998 -9.199070000000013 C 138.19469999999998 18.740389999999987 163.80586999999997 52.06825999999999 134.12018999999998 128.75204 C 104.43450999999997 205.43581 6.646379999999979 240.36014 6.646379999999979 240.36014 C 6.646379999999979 240.36014 -91.72382000000002 206.74971 -129.55851 135.7369 C -167.3932 64.72408999999999 -132.46887 20.91892999999999 -126.06608000000001 12.769919999999985 C -119.66329000000002 4.620909999999984 -90.55968000000001 -16.915760000000017 -90.55968000000001 -16.915760000000017"
                  strokeLinecap="round"
                />
              </g>
              <g
                transform="matrix(0.9110794354 0 0 0.9289433609 196.5282280163 337.0269670709)"
                id="ZjAsupvRvluV8OTTdSpK3"
              >
                <path
                  fill="#2454C4"
                  d="M -8.15169 -3.48026 C -8.15169 -3.48026 -23.86764 -9.88305 -24.449710000000003 -26.181070000000002 C -25.031780000000005 -42.47909 -15.380140000000003 -52.37432 0.9178799999999967 -51.79225 C 17.215899999999998 -51.21018 25.026429999999998 -40.73288 24.444359999999996 -26.181070000000002 C 23.862289999999994 -11.629270000000002 8.728409999999997 -3.4802600000000012 8.728409999999997 -3.4802600000000012 L 24.444359999999996 51.8166 L -22.121410000000004 51.8166 z"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
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
