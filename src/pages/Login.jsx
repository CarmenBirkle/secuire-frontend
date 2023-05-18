import { useTranslation } from 'react-i18next';
import {useState} from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';

const Login = ({setUser}) => {
  const { t } = useTranslation(['forgotpassword', 'login']);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(0);
  const navigate = useNavigate();

  //TODO: console.log entfernen
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email: ', email, 'Password: ', password, 'Remember: ', remember, 'WrongPassword: ', wrongPassword);
    if(!email || !password) return;
    setUser ({email: email, password: password, remember: remember, wrongPassword: wrongPassword}); 
    navigate('/main');
    }
  

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2> {t('login:login')}</h2>
        <input
          type="email"
          id="email"
          value={email}
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
        <input
          type="checkbox"
          id="remember"
          value={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <label htmlFor="remember">{t('login:remember')}</label>
        <button type="submit"> {t('login:loginButton')}</button>
      </form>
      <br />
      <Link to="/forgotpassword">{t('forgotpassword:forgotPW')}</Link> <br />
    </section>
  );
};
export default Login;
