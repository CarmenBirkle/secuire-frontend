import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { updateUser } from './helperSites/Axios.jsx';
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
  // const [oldPassword, setOldPassword] = useState(user.password);

  useEffect(() => {
    console.log('newPassword', newPassword);
    console.log('confirmed pw', confirmPassword);
    console.log('user pw', user.password);
    console.log('user Objekt', user);
  }, [newPassword, confirmPassword, passwordHint]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
     let oldPassword = user.password;
     let finalPassword = '';

    if (changePassword && newPassword !== confirmPassword) {
      setError(true);
      return;
    }
 
  console.log('salt',user.salt);
  console.log(' old password', oldPassword);

  if (newPassword){
    console.log('new password', newPassword)
    const hashedPassword = await bcrypt.hash(newPassword, user.salt);
    console.log('hashedPassword', hashedPassword);
    finalPassword = hashedPassword;
  // } else {
  //   setNewHashedPassword('');
   }
  
  console.log('oldpw after hash', oldPassword);
  console.log('hashedNewPassword', finalPassword);

    const updatedUser = {
      username: username,
      hashedPassword: oldPassword,
      newHashedPassword: finalPassword,
      email: email,
      salt: user.salt,
      agbAcceptedAt: user.agbAcceptedAt,
      passwordHint: passwordHint,
    };
     console.log('submit', updatedUser);
   try {
    const response= await updateUser(updatedUser);
     console.log('response', response);
      const responseUser = {
        username: response.identityUser.userName,
        //hashedPassword: finalPassword ? newHashedPassword : oldPassword,
        password: finalPassword ? newPassword : oldPassword,
        email: response.identityUser.email,
        salt: response.salt,
        agbAcceptedAt: response.agbAcceptedAt,
        passwordHint: response.passwordHint,
      };
      Cookies.set('token', response.jwtToken); 
     
      console.log('responseUser', responseUser);

        setUser(responseUser);
        console.log('user', user);
    
      
      
    // setUser(response.data);
    // setUser(updatedUser); 
   } catch (error) {
    console.log(error);
   }
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    console.log('newPassword', newPassword);
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
                  type="text"
                  id="signup-password"
                  name="signup-password"
                  required
                  placeholder={t('password')}
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
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
