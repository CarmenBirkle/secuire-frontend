import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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
    console.log('username ', username);
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('confirm password: ', confirmPassword);
  };

  return (
    <>
      <h1>{t('common:signup')}</h1>
      <form onSubmit={handleSubmit}>
        {/* TODO Wrap in form  */}
        <div>
          <label htmlFor="">{t('signup:username')}:</label>
          <input
            type="text"
            id="signup-username"
            name="signup-username"
            required
            placeholder={t('signup:username')}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">{t('signup:email')}:</label>
          <input
            type="email"
            id="signup-email"
            name="signup-email"
            required
            placeholder={t('signup:email')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">{t('signup:password')}:</label>
          <input
            type="password"
            id="signup-password"
            name="signup-password"
            required
            placeholder={t('signup:Password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">{t('signup:confirmPassword')}:</label>
          <input
            type="password"
            id="pwCheck"
            name="pwCheck"
            required
            placeholder={t('signup:confirmPassword')}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <br />
        <p>{t('signup:information')}</p>
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
        <div>
          <input type="checkbox" required name="agb" id="agb" />
          <label htmlFor="">{t('signup:agb')}:</label>
          {/* TODO link to AGBs */}
        </div>
        <input type="submit" value={t('common:signup')} />
        {error && <p>{t('signup:passwordError')}</p>}
      </form>
    </>
  );
};
export default Signup;
