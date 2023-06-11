import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import bcrypt from 'bcryptjs';

const Signup = () => {
  const { t } = useTranslation(['common', 'signup']);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);
  const [passwortHint, setPasswortHint] = useState(null);
  const [passwortHintError, setPasswortHintError] = useState(null);
  const [agbAcceptedAt, setAGBAcceptedAt] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const [accountCreatedError, setAccountCreatedError] = useState(null);

  /**
   * This function is called when the signup form is submitted
   * Checked if the password and the confirmPassword are the same
   * Hashes the password and sends the data to the backend
   * @param {object} userData
   * @param {event} e Submit the Form
   * @returns
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (password !== confirmPassword) {
      setError(true);
      return;
    } try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
        username: username,
        hashedPassword: hashedPassword,
        email: email,
        salt: salt,
        agbAcceptedAt: agbAcceptedAt,
        passwortHint: passwortHint,
      };
      console.log('userData: ', userData);
      //TODO Backend connection and console log delete // function sendToBackend implement
      // sendToBackend(userData);
      setAccountCreated(true);
      setAccountCreatedError('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAccountCreatedError(t('signup:userNameError'));
      } else {
        setAccountCreatedError(t('signup:accountCreatedError'));
      }
    }
  };
  /**
   * UseEffect to navigate to login page after account is created  with time delay
   * @param {boolean} accountCreated
   */
  const navigate = useNavigate();
  useEffect(() => {
    if (accountCreated) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000); //TODO maybe adjust time
      return () => clearTimeout(timer);
    }
  }, [accountCreated, navigate]);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      const currentDatetime = new Date();
      setAGBAcceptedAt(currentDatetime);
    } else {
      setAGBAcceptedAt(null);
    }
  };

/**
 * shows error if password hint is in password
 */
  const handlePasswordHintChange = (e) => {
    const hint = e.target.value;
    if (password.includes(hint)) {
      const errorMsg = t('signup:hintError');
      setPasswortHintError(errorMsg);
    } else {
      setPasswortHint(hint);
      setPasswortHintError(null);
    }
  };

  //TODO Video link

  return (
    <>
      <h1>{t('common:signup')}</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="">{t('signup:username')}:</label>
          <input
            type="text"
            id="signup-username"
            name="signup-username"
            required
            placeholder={t('signup:username')}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="signup-email">{t('signup:email')}:</label>
          <input
            type="email"
            id="signup-email"
            name="signup-email"
            required
            placeholder={t('signup:email')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">{t('signup:password')}:</label>
          <input
            type="password"
            id="signup-password"
            name="signup-password"
            required
            placeholder={t('signup:Password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">{t('signup:confirmPassword')}:</label>
          <input
            type="password"
            id="pwCheck"
            name="pwCheck"
            required
            placeholder={t('signup:confirmPassword')}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={error ? 'errorField' : ''}
          />
        </fieldset>
        {error && <p className="errorMessage">{t('signup:passwordError')}</p>}
        <p>{t('signup:information')}</p>

        <fieldset className="question">
          <h3>{t('signup:hint')}</h3>
          <input
            type="text"
            name="passwortHint"
            required
            id="passwortHint"
            placeholder={t('signup:passwortHint')}
            onChange={handlePasswordHintChange}
          />
          {passwortHintError && (
            <p className="errorMessage">{passwortHintError}</p>
          )}
        </fieldset>
        <div id="agbCheck">
          <input
            type="checkbox"
            required
            name="agb"
            id="agb"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agb">{t('signup:agb')}:</label>
          {/* TODO link to AGBs */}
        </div>
        <input
          className="submitButton"
          type="submit"
          value={t('common:signup')}
        />
      </form>
      {/* TODO speak with Caro about classes pop up or something  - info create account false or true */}
      {accountCreated && <p>{t('signup:accountCreated')}</p>}
      {accountCreatedError && (
        <p className="errorMessage">{accountCreatedError}</p>
      )}
    </>
  );
};
export default Signup;
