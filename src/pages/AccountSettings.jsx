import { useTranslation } from 'react-i18next';

const AccountSettings = () => {
  const { t } = useTranslation(['account']);

  return <h2>{t('placeholder')}</h2>;
};
export default AccountSettings;
