import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation(['common', 'profile']);

  return (
    <div>
      <h1>{t('common:signup')}</h1>
      {/* TODO Wrap in form  */}
      <div>
        <label htmlFor="">{t('profile:name')}:</label>
        <input type="text" className="form-control" placeholder="Carmen" />
      </div>
      <div>
        <label htmlFor="">{t('profile:email')}:</label>
        <input type="text" placeholder="test@test.de" />
      </div>
      <div>
        <label htmlFor="">{t('profile:password')}:</label>
        <input type="number" placeholder="15koz8911" />
      </div>
      <br />
      <div>
        <button>{t('common:signup')}</button>
      </div>
    </div>
  );
};

export default Profile;
