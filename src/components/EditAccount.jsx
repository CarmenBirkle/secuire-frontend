import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { updateUser } from './helperSites/Axios.jsx';

import cancelIcon from './../img/icon-close.svg';

const EditAccount = ({ user, setUser, setEditMode }) => {
  const { t } = useTranslation(['account']);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [passwordHint, setPasswordHint] = useState(user.passwordHint);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [newHashedPassword, setNewHashedPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');

    if (changePassword && password !== confirmPassword) {
      setError(true);
      return;
    }
  console.log('salt',user.salt);
  console.log('password', password);
  if (password){
    const hashedPassword = await bcrypt.hash(password, user.salt);
    setNewHashedPassword(hashedPassword);
  } else {
    setNewHashedPassword('');
  }
  
  console.log('password', password);
  console.log('hashedNewPassword', newHashedPassword);

    const updatedUser = {
      username: username,
      hashedPassword: user.password,
      newHashedPassword: newHashedPassword,
      email: email,
      salt: user.salt,
      agbAcceptedAt: user.agbAcceptedAt,
      passwordHint: passwordHint,
    };
     console.log('submit', updatedUser);
   try {
    await updateUser(updatedUser);
    setUser(updatedUser); 
   } catch (error) {
    console.log(error);
   }
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(false);
  };

  return (
    <>
      <section>
        <h1>{t('chanceAccount')}</h1>
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder={t('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <input
              type="text"
              id="pwhint"
              name="pwhint"
              required
              placeholder={t('passwordHint')}
              value={passwordHint}
              onChange={(e) => setPasswordHint(e.target.value)}
            />
          </fieldset>

          {!changePassword && (
            <button
              className="submitButton"
              onClick={() => setChangePassword(true)}
            >
              {t('changePW')}
            </button>
          )}

          {changePassword && (
            <>
              <fieldset>
                <input
                  type="password"
                  id="signup-password"
                  name="signup-password"
                  required
                  placeholder={t('password')}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  id="pwCheck"
                  name="pwCheck"
                  required
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={error ? 'errorField' : ''}
                />
              </fieldset>
            </>
          )}

          {error && (
            <p className="errorMessage ">{t('passwordError')}</p>
          )}

          <div className="main_icons_bg">
            <img
              className="icon_button"
              src={cancelIcon}
              alt={t('cancel')}
              onClick={() => setEditMode(false)}
            />

            <button className="icon_button icon_save" type="submit"></button>
          </div>
        </form>
      </section>
    </>
  );
};



export default EditAccount;
