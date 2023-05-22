import { useTranslation } from 'react-i18next';

const AccountSettings = () => {
  const { t } = useTranslation(['account']);

  return <h1>{t('placeholder')}</h1>;
};
export default AccountSettings;
