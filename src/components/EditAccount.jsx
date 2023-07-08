/**
 * @fileOverview
* EditAccount component for editing user account information.
* Renders a form with input fields for username, email, password hint, and password change.
*/
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { updateUser } from './helperSites/Axios.jsx';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
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
  const [newPassword, setNewPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  /**
   * Handles the change event for the username input field.
   * Validates the username format and updates the state accordingly.
   * @param {Object} e - The event object.
   */
  const handleUsernameChange = (e) => {
    const usernameInput = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(usernameInput)) {
      setUsernameError(true);
    } else {
      setUsername(usernameInput);
      setUsernameError(false);
    }
  };

  /**
   * Handles the submit event for the form.
   * Updates the user account information and sets the new user data in the state.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let oldPassword = user.password;
    let finalPassword = '';
    if (changePassword && newPassword !== confirmPassword) {
      setError(true);
      return;
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, user.salt);
      finalPassword = hashedPassword;
    }
    const updatedUser = {
      username: username,
      hashedPassword: oldPassword,
      newHashedPassword: finalPassword,
      email: email,
      salt: user.salt,
      agbAcceptedAt: user.agbAcceptedAt,
      passwordHint: passwordHint,
    };
    try {
      const response = await updateUser(updatedUser);
      const responseUser = {
        username: response.identityUser.userName,
        password: finalPassword ? newPassword : oldPassword,
        email: response.identityUser.email,
        salt: response.salt,
        agbAcceptedAt: response.agbAcceptedAt,
        passwordHint: response.passwordHint,
      };
      Cookies.set('token', response.jwtToken);
      setUser(responseUser);
    } catch (error) {}
    setEditMode(false);
  };

  /**
   * Checks if the password is complex enough
   * @param {string} password
   * @returns
   */
  const isPasswordComplexEnough = (password) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  /**
   * Handles the change of the password input and validates its complexity.
   * @param {object} e - The event object representing the password input change.
   */
  const handlePasswordChange = (e) => {
    const newPasswordInput = e.target.value;
    setNewPassword(newPasswordInput);
    if (!isPasswordComplexEnough(newPasswordInput)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  /**
  * Handles the change of the confirm password input and resets the error state.
  * @param {object} e - The event object representing the confirm password input change.
  */
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
              onChange={handleUsernameChange}
            />
          </fieldset>
          {usernameError && <p className="errorMessage">{t('space')}</p>}

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
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className={passwordError ? 'errorField' : ''}
                />
              </fieldset>
              {passwordError && (
                <p className="errorMessage">{t('complexError')}</p>
              )}
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
                {error && <p className="errorMessage">{t('usernameError')}</p>}
              </fieldset>
            </>
          )}

          {error && <p className="errorMessage ">{t('passwordError')}</p>}

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
