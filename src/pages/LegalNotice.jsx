import { useTranslation } from 'react-i18next';

const LegalNotice = () => {
  const { t } = useTranslation(['legalnotice']);
  return ( 
    <>
      <h1>{t('legalnotice')}</h1>
      <p>{t('responsible')}</p>
      <p>{t('contact')}</p>
      <h2>{t('yourRights')}</h2>
      <p>{t('rightsInfo')}</p>
      <ul>
        <li>{t('rightAccess')}</li>
        <li>{t('rightCorrection')}</li>
        <li>{t('rightDeletion')}</li>
        <li>{t('rightRestriction')}</li>
        <li>{t('rightObjection')}</li>
        <li>{t('rightDataPortability')}</li>
      </ul>
      <p>{t('revokeConsent')}</p>
      <p>{t('complaintAuthority')}</p>
      <p>{t('supervisoryAuthorityList')}</p>
      <h2>{t('cookies')}</h2>
      <p>{t('cookiesInfo')}</p>
      <ul>
        <li>Mozilla Firefox: <a href="https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen" target="_blank" rel="nofollow noopener">https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen</a></li>
        <li>Internet Explorer: <a href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="nofollow noopener">https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies</a></li>
        <li>Google Chrome: <a href="https://support.google.com/accounts/answer/61416?hl=de" target="_blank" rel="nofollow noopener">https://support.google.com/accounts/answer/61416?hl=de</a></li>
        <li>Opera: <a href="http://www.opera.com/de/help" target="_blank" rel="nofollow noopener">http://www.opera.com/de/help</a></li>
        <li>Safari: <a href="https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE" target="_blank" rel="nofollow noopener">https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE</a></li>
      </ul>
      <h3>{t('storageDuration')}</h3>
      <p>{t('cookiesUsed')}</p>
      <h2>{t('necessaryCookies')}</h2>
      <h3>{t('processingPurpose')}</h3>
      <p>{t('necessaryCookiesInfo')}</p>
      <p>{t('functionalitiesRequireCookies')}</p>
      <h3>{t('legalBasisAndInterest')}</h3>
      <p>{t('legalBasisAndInterestInfo')}</p>
      <h3>{t('recipients')}</h3>
      <p>{t('recipientsInfo')}</p>
      <h3>{t('mandatoryOrRequired')}</h3>
      <p>{t('mandatoryOrRequiredInfo')}</p>
      <h3>{t('objection')}</h3>
      <p>{t('objectionInfo')}</p>
      <h2>{t('registration')}</h2>
      <h3>{t('processingArtAndPurpose')}</h3>
      <p>{t('registrationInfo')}</p>
      <p>{t('additionalData')}</p>
      <h3>{t('legalBasis')}</h3>
      <p>{t('legalBasisInfo')}</p>
      <h3>{t('recipientsRegistration')}</h3>
      <p>{t('recipientsRegistrationInfo')}</p>
      <h3>{t('storageDurationRegistration')}</h3>
      <p>{t('storageDurationRegistrationInfo')}</p>
      <h3>{t('mandatoryOrRequiredRegistration')}</h3>
      <p>{t('mandatoryOrRequiredRegistrationInfo')}</p>
      <h3>{t('rightWithdrawalRegistration')}</h3>
      <p>{t('rightWithdrawalRegistrationInfo')}</p>
      <h2>{t('sslEncryption')}</h2>
      <p>{t('sslEncryptionInfo')}</p>
      <hr />
      <h2>{t('objectionRightInfo')}</h2>
      <h3>{t('objectionRightIndividual')}</h3>
      <p>{t('objectionRightIndividualInfo')}</p>
      <h3>{t('objectionRecipient')}</h3>
      <p>{t('objectionRecipientInfo')}</p>
      <hr />
      <h2>{t('privacyPolicyChanges')}</h2>
      <p>{t('privacyPolicyChangesInfo')}</p>
      <h2>{t('questionsToDataProtectionOfficer')}</h2>
      <p>{t('dataProtectionOfficerEmail')}</p>
      <p><em>{t('privacyPolicyGeneratedBy')}</em></p>
    </>
  );
};

export default LegalNotice;

