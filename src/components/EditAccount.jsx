import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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
            />{' '}
            <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail('email', e.target.value)}
            />
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
        </form>
      </section>
    </>
  );
};
export default EditAccount;
