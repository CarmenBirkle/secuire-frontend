import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation(['faq']);
  return <h2>{t('placeholder')}</h2>;
};
export default FAQ;
