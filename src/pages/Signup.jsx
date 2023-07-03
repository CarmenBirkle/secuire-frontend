/**
 * @fileOverview This Page presents the signup form with the following fields:
 * username, email, password, confirmPassword, passwordHint, agb
 * The user can submit the form and is then navigated to the login page
 * Validation is setting the error state to true if the password and confirmPassword 
 * are not the same, also if the password hint is in the password.
 * The password is hashed and send to the backend with the salt. 
 * The hashing is done with bcrypt, using 10 rounds.
 */

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { registerUser } from './../components/helperSites/Axios.jsx';

const Signup = () => {
  const { t } = useTranslation(['common', 'signup']);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);
  const [passwordHint, setPasswordHint] = useState(null);
  const [passwordHintError, setPasswordHintError] = useState(null);
  const [agbAcceptedAt, setAGBAcceptedAt] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const [accountCreatedError, setAccountCreatedError] = useState(null);
   const navigate = useNavigate();

  /**
   * This function is called when the signup form is submitted
   * Checked if the password and the confirmPassword are the same
   * Hashes the password and sends the data to the backend
   * @param {object} userData
   * @param {event} e Submit the Form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
        username: username,
        hashedPassword: hashedPassword,
        email: email,
        salt: salt,
        agbAcceptedAt: agbAcceptedAt,
        passwordHint: passwordHint,
        newHashedPassword: ''
      };
      console.log('userData:', userData, 'klartextpw:',password);
      const response = await registerUser(userData);
      setAccountCreated(true);
      setAccountCreatedError('');
    } catch (error) {
    if(error === "EMail Adress already taken") {
      setAccountCreatedError(`Email '${email}' is already taken.`);
    } else if (error.DuplicateUserName) {
      setAccountCreatedError(`Username '${username}' is already taken.`);
    } else {
      setAccountCreatedError('Error occurred during user registration. Please try again later.');
    }
    }
  };

  /**
   * UseEffect to navigate to login page after account is created  with time delay
   * @param {boolean} accountCreated
   */
    useEffect(() => {
    if (accountCreated) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 4000); //TODO maybe ajust time
      return () => clearTimeout(timer);
    }
  }, [accountCreated, navigate]);

  /**
   * This function is called when the user checks the agb checkbox,
   * if the checkbox is checked the current datetime is set to agbAcceptedAt
   */
 const handleCheckboxChange = (e) => {
   if (e.target.checked) {
     const currentDatetime = new Date().toISOString();;
     setAGBAcceptedAt(currentDatetime);
   } else {
     setAGBAcceptedAt(null);
   }
 };

  /**
   * Shows error if password hint is in password
   */
  const handlePasswordHintChange = (e) => {
    const hint = e.target.value;
    if (password.includes(hint)) {
      const errorMsg = t('signup:hintError');
      setPasswordHintError(errorMsg);
    } else {
      setPasswordHint(hint);
      setPasswordHintError(null);
    }
  };

  /**
   * Resets the error message if the user changes the username
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setAccountCreatedError(''); 
  };

  /**
   * Resets the error message if the user changes the email
   */ 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setAccountCreatedError(''); 
  };

  //<------Render the signup form------>

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
            value={username}
            onChange={handleUsernameChange}
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
            value={email}
            onChange={handleEmailChange}
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
            name="passwordHint"
            required
            id="passwordHint"
            placeholder={t('signup:passwordHint')}
            onChange={handlePasswordHintChange}
          />
          {passwordHintError && (
            <p className="errorMessage">{passwordHintError}</p>
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

      {accountCreatedError && (
        <p className="errorMessage">{accountCreatedError}</p>
      )}
      {accountCreated && (
        <p className="successMessage">{t('signup:success')}</p>
      )}
    </>
  );
};
export default Signup;
