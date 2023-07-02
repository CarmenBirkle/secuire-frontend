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
import { Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { getSalt, loginUser } from './../components/helperSites/Axios.jsx'; 
import bcrypt from 'bcryptjs';


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

  //TODO: console.log entfernen
  //TODO: wrongPassword ausgeben mit Anzahl der Versuche
  //TODO: wrongPassword zurücksetzen wenn richtige Nutzerdaten


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
     console.log(
       'Email: ',
       email,
       'Password: ',
       password,
       'Remember: ',
       remember,
       'WrongPassword: ',
       wrongPassword
            
     );
     if (!email || !password) return;
     const hashedPassword = await handleLogin(email, password);
    //  setUser({
    //    id:1,
    //    email: email,
    //    password: hashedPassword,
    //    remember: remember,
    //    wrongPassword: wrongPassword,
    //    username: 'carmen',
    //    passwordHint: 'test',
    //  });
     navigate('/main?type=favourites');
   };


   //TODO kann später gelöscht werden
   useEffect(() => {
     console.log('user: ', user);
   }, [user]);

async function handleLogin(email, password) {
  console.log('aus handlelogin: email',email, 'password', password)
  try {
    const salt = await getSalt(email);
    console.log('Salt aus handlelogin: ', salt); 
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed Password: ', hashedPassword);
    const loginResponse = await loginUser(email, hashedPassword);
     setUser({
       id: loginResponse.identityUserId,
       email: email,
       password: hashedPassword,
       salt: salt,
       wrongPassword: wrongPassword,
       username: loginResponse.identityUser.userName,
       passwordHint: loginResponse.passwordHint,
       agbAcceptedAt: loginResponse.agbAcceptedAt,
     });
     Cookies.set('token', loginResponse.jwtToken);
     //TODO dataentrys speichern aus response
    console.log('loginResponse: ', loginResponse);
 
    // Daten aus loginResponse verarbeiten. Unklar wie das Objekt aussieht, daher erstmal Aonsolenausgabe
    // z.b. über setzen des Cookies

    //console.log('Erfolgreiche Anmeldung. Daten:', loginResponse);
    // Cookies.set( 'authToken', 'Token hier, wahrscheinlich Variable aus loginResponse');

    // setSuccess(true);
  } catch (error) {
    console.error('Es gab einen Fehler bei der Anmeldung:', error);
    //ggf. Error Handling für falsches PW. -> was kommt da rüber? 
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
    <section>
      <form onSubmit={handleSubmit}>
        <h2>{t('login:login')}</h2>
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
        <div className="flexbox row-reverse allignCenter">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
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
      <Link to="/forgotpassword">{t('forgotpassword:forgotPW')}</Link> <br />
    </section>
  );
};


export default Login;
