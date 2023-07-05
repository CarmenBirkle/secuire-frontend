import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cookieIcon from '../img/cookie.svg';

const CookieBanner = () => {
    const { t } = useTranslation(['common']);

    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
    // Überprüfen, ob der Cookie bereits gesetzt ist
        const hasCookie = Cookies.get('cookieConsent');
        if (!hasCookie) {
        setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        // Setzen Sie den Cookie mit dem gewünschten Ablaufdatum
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        Cookies.set('cookieConsent', true, { expires: expiryDate });
        setShowBanner(false);
    };

    const handleDeny = () => {
        // Setzen Sie den Cookie mit dem gewünschten Ablaufdatum

        Cookies.set('cookieConsent', false);
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    

    return (
        <>
            <div id="cookie-preferences" className="bgcol">
                <div className="cookie">
                    <img className='cookieIcon' src={cookieIcon} alt="Cookie" />
                    <p className='cookie-text'>{t('cookietext')} 
                    <a href="/imprint"> {t('legalnotice')}</a>.</p>
                </div>
                <div className='="cookie'>
                    <button id="cookie-all" onClick={handleAccept}>{t('accept')}</button>
                    <button id="cookie-deny" onClick={handleDeny}>{t('deny')}</button>
                </div>
            </div>
        </>
    );
};

export default CookieBanner;