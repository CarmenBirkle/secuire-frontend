/**
 * @fileoverview ForgotPassword page - Component for handling forgot password functionality.
 * Allows users to retrieve their password hint based on their email.
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getHint } from '../components/helperSites/Axios';

const ForgotPassword = () => {
  const { t } = useTranslation(['forgotpassword']);
  const [email, setEmail] = useState('');
  const [hint, setHint] = useState('');
  const [errMsg, setErrMsg] = useState('');

  /**
   * Handles the retrieval of the password hint.
   * Calls the getHint function and updates the hint state with the returned value.
   * @returns {Promise<void>}
   */
  const handleGetHint = async (e) => {
    e.preventDefault();
    try {
      const newHint = await getHint(email);
      setHint(newHint);
    } catch (error) {
      setErrMsg(error);
    }
  };

  /**
   * Clears the error message after 3 seconds.
   * This effect is triggered whenever `errMsg` changes.
   */
  useEffect(() => {
    let timeout;
    if (errMsg) {
      timeout = setTimeout(() => {
        setErrMsg('');
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [errMsg]);

  return (
    <>
      <h1>{t('forgotPW')}</h1>
      <h2 className="subheadline">{t('showPWHint')}</h2>
      <form>
        <fieldset>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t('placeholder')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <button className="submitButton" onClick={handleGetHint}>
          {t('showPWHintButton')}
        </button>

        {hint && !errMsg && (
          <>
            <p>{t('showHint')}</p>
            <p className="success"> {hint}</p>
          </>
        )}
        {errMsg && <p className="errorMessage">{t('error')}</p>}
      </form>

      <button
        className="submitButton"
        onClick={() => (window.location.href = '/login')}
      >
        {t('back')}
      </button>
    </>
  );
};
export default ForgotPassword;
