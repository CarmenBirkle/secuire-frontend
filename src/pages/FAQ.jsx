import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation(['faq']);
  return <h1>{t('placeholder')}</h1>;
};
export default FAQ;
