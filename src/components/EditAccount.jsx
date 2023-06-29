import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import cancelIcon from './../img/icon-close.svg';

const EditAccount = ({user, setUser}) => {
  const { t } = useTranslation(['account']);
   const [username, setUsername] = useState(user.username);
   const [email, setEmail] = useState(user.email);
   const [passwordHint, setPasswordHint] = useState(user.passwordHint);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, username: username, email: email, passwordHint: passwordHint });
    console.log('submit');
  }
  return (
    <>
      <section>
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder={t('username')}
              value={username}
              onChange={(e) => setUsername('username', e.target.value)}
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
              onChange={(e) => setEmail('email', e.target.value)}
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
              onChange={(e) => setPasswordHint('passwortHint', e.target.value)}
            />
          </fieldset>
          <div className='main_icons_bg'>
          <img
            className='icon_button'           
            src={cancelIcon}
            alt={t('cancel')}
            
          />
          
          <button className="icon_button icon_save" type="submit">
          {/*{t('submit')}*/}
        </button>
        </div>
        </form>
      </section>
    </>
  );
};
export default EditAccount;
