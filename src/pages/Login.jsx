import { useTranslation } from 'react-i18next';
import {useState, useRef, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Login = ({setUser}) => {
  const { t } = useTranslation(['forgotpassword', 'login']);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const[success, setSuccess] = useState(false);

  //TODO: console.log entfernen
  //TODO: wrongPassword erhöhen wenn falscher Nutzerdaten
  //TODO: wrongPassword zurücksetzen wenn richtige Nutzerdaten
   //TODO: Nutzerdaten - speziell Passwort mit Backend abgleichen, verschlüsslt speichern

 useEffect(() => {
   if (inputRef.current) {
     inputRef.current.focus();
   }
 }, []);

 // disapears the error message
useEffect(() => {
    setErrMsg('');
  }, [success]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email: ', email, 'Password: ', password, 'Remember: ', remember, 'WrongPassword: ', wrongPassword);
    if (!email || !password) return;
    setUser({ email: email, password: password, remember: remember, wrongPassword: wrongPassword });
    navigate('/main?type=favourites');
  };

  //  basierend auf meine Lösung von Signup.jsx - noch anpassen! 

  // const bcrypt = require('bcryptjs');

  // // Beispiel für die Überprüfung des Passworts
  // const checkPassword = async (password, hashedPassword, salt) => {
  //   try {
  //     const match = await bcrypt.compare(password, hashedPassword);

  //     if (match) {
  //       // Das Passwort ist korrekt
  //       console.log('Passwort ist korrekt');
  //     } else {
  //       // Das Passwort ist falsch
  //       console.log('Passwort ist falsch');
  //     }
  //   } catch (error) {
  //     console.error('Fehler bei der Passwortüberprüfung:', error);
  //   }
  // };
  

  const inputRef = useRef(null);

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
         onChange={(e) => setPassword(e.target.value)}
       />
       <div className="flexbox row-reverse allignCenter">
         <input
           type="checkbox"
           id="remember"
           value={remember}
           onChange={(e) => setRemember(e.target.checked)}
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
