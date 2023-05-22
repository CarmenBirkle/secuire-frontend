import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const Signup = () => {
  const { t } = useTranslation(['common', 'signup']);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('username ', username);
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('confirm password: ', confirmPassword);
    console.log('hashed password: ', hashedPassword);
  };

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
       
        <fieldset class="question">
          <select>
            {/* TODO what question to offer?, translation, maybe onchange function */}
            <option value="1">Question1</option>
            <option value="2">Question2</option>
          </select>
          <input
            type="text"
            name="signup-answer"
            required
            id="signup-answer"
            placeholder={t('signup:answer')}
          />
        </fieldset>
        <div id="agbCheck">
          <input type="checkbox" required name="agb" id="agb" />
          <label htmlFor="agb">{t('signup:agb')}:</label>
          {/* TODO link to AGBs */}
        </div>
        <input className="submitButton" type="submit" value={t('common:signup')} />
        
      </form>
    </>
  );
};
export default Signup;
