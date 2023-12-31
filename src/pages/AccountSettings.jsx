/**
 * @fileverview
 * The AccountSettings component represents the account settings page.
 * It handles translations, user interactions, and displays user account information.
 * Users can edit their account details, delete their account, and navigate back to the previous page.
 */
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { deleteUser } from '../components/helperSites/Axios';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './../img/icon-delete.svg';
import editIcon from './../img/icon-work.svg';
import arrowIcon from './../img/icon_back.svg';
import EditAccount from '../components/EditAccount';
import Cookies from 'js-cookie';


const AccountSettings = ({ user, setUser }) => {
  const { t } = useTranslation(['account']);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  /**
   * Handles the click event for the close button.
   * Sets the showConfirmation state to false and navigates back to the previous page.
   */
  const handleCloseClick = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  /**
   * Handles the click event for the delete button.
   * Sets the showConfirmation state to true, displaying a confirmation dialog.
   */
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  /**
  * Handles the confirmed deletion of a user. Calls the deleteUser function to delete the user from the backend.
  * Removes the 'token' cookie. Redirects the user to the homepage and Logs any errors that occur during the process.
  */
  const handleConfirmDelete = () => {
    deleteUser()
      .then(() => {
        Cookies.remove('token');
        navigate('/', { state: { deleted: true } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Handles the click event for the cancel button.
   */
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  /**
   * Handles the click event for the edit button.
   */
  const handleEditClick = () => {
    setEditMode(true);
    setShowConfirmation(false);
  };

  /**
   * Renders the EditAccount component if the editMode state is true.
   */
  if (editMode) {
    return (
      <EditAccount user={user} setUser={setUser} setEditMode={setEditMode} />
    );
  }

  return (
    <>
      <section>
        <h1>{t('account')}</h1>
        <div className="singleEntry">
          <p>{t('username')}:</p>
          <p>{user.username}</p>
        </div>

        <div className="singleEntry">
          <p>{t('email')}:</p>
          <p>{user.email}</p>
        </div>

        <div className="singleEntry">
          <p>{t('passwordHint')}:</p>
          <p>{user.passwordHint}</p>
        </div>
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p className="errorMessage">{t('deleteUser')}</p>
            <button className="submitButton" onClick={handleConfirmDelete}>
              {t('yes')}
            </button>
            <button className="submitButton" onClick={handleCancelDelete}>
              {t('no')}
            </button>
          </div>
        )}

        <div className="main_icons_bg">
          <img
            className="icon_button"
            src={arrowIcon}
            alt={t('back')}
            onClick={handleCloseClick}
          />
          <img
            className="icon_button"
            src={deleteIcon}
            alt={t('remove')}
            onClick={handleDeleteClick}
          />
          <img
            className="icon_button"
            src={editIcon}
            alt={t('edit')}
            onClick={handleEditClick}
          />
        </div>
      </section>
    </>
  );
};
export default AccountSettings;
