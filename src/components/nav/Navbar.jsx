import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation(['sidebar']);
  return (
    //TODO Struktur nur grobaufgesetzt, ggf. über divs oder ul/li
    //TODO Links für alle HomeSeiten werden alle gleichzeitg active gesetzt - Lösung? https://reactrouter.com/en/6.11.1/components/nav-link
    <nav>
      <h2>{t('placeholder')}</h2>

      <NavLink
        to="account"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('accountSettings')}
      </NavLink>
      <br />
      <NavLink
        to="/main"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('allEntries')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=favourites"
        end
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('favourites')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=passwords"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('passwords')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=safenotes"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('safeNotes')}
      </NavLink>
      <br />
      <NavLink
        to="/main?type=paymentcards"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('paymentCards')}
      </NavLink>
      <br />
      <NavLink
        to="pwgenerator"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('passwordGenerator')}
      </NavLink>
      <br />
      <NavLink
        to="faq"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('faq')}
      </NavLink>
      <br />
      <NavLink
        to="nice2know"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        {t('nice2know')}
      </NavLink>
    </nav>
  );
};
export default Navbar;
