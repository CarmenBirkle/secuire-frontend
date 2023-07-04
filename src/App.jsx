import { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './pages/Home';
import Main from './pages/Main';

import Signup from './pages/Signup';
import Imprint from './pages/Imprint';
import SharedLayout from './components/helperSites/SharedLayout';
import AccountSettings from './pages/AccountSettings';
import PwGenerator from './pages/PwGenerator';
import FAQ from './pages/FAQ';
import Nice2Know from './pages/Nice2Know';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Error from './pages/Error';
import LegalNotice from './pages/LegalNotice';
import ProtectedRoute from './components/helperSites/ProtectedRoute';
import Cookies from 'js-cookie';
import './fonts/poppins-v20-latin-700.eot';
import './fonts/poppins-v20-latin-700.svg';
import './fonts/poppins-v20-latin-700.ttf';
import './fonts/poppins-v20-latin-700.woff';
import './fonts/poppins-v20-latin-700.woff2';
import './fonts/poppins-v20-latin-900.eot';
import './fonts/poppins-v20-latin-900.svg';
import './fonts/poppins-v20-latin-900.ttf';
import './fonts/poppins-v20-latin-900.woff';
import './fonts/poppins-v20-latin-900.woff2';
import './fonts/poppins-v20-latin-regular.eot';
import './fonts/poppins-v20-latin-regular.svg';
import './fonts/poppins-v20-latin-regular.ttf';
import './fonts/poppins-v20-latin-regular.woff';
import './fonts/poppins-v20-latin-regular.woff2';

import  logo_icon  from './img/logo_icon.svg';

const App = () => {
  const [user, setUser] = useState(null);

  /**
   * Create loading animation.
   */
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //Autologout functions
  let logoutTimeout;
  const events = [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress',
  ];

  const logout = () => {
    Cookies.remove('token');
    window.location.href = '/?loggedout=1';
    setUser(null);
  };

  const resetTimeout = () => {
    clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(logout, 300000); // 5 Minuten
  };

  useEffect(() => {
    events.forEach((event) => window.addEventListener(event, resetTimeout));
    resetTimeout(); // Initialen Timeout setzen, falls keine Aktionen ausgeführt werden
    return () => {
      clearTimeout(logoutTimeout);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimeout)
      );
    };
  }, []); 

  return (
    <Suspense fallback={null}>
      {loading ? (
        <div className="loader-container">
          <div className="spinner">
            <svg viewBox="0 0 600 600">
              <g
                transform="matrix(0.9110794354 0 0 0.9289433609 197.3644851671 251.0981771805)"
                id="Wbkz6S6dnrXMHwP_VQnPo"
              >
                <path
                  className="path"
                  stroke="#2454C4"
                  strokeWidth="30"
                  fill="transparent"
                  d="M 109.67316 -163.44819 C 108.50901999999999 -192.55180000000001 91.62892 -242.61001000000002 0.24358999999999753 -240.28172 C -91.14174 -237.95343 -110.93220000000001 -190.80558000000002 -113.84256 -160.53783 C -116.75292 -130.27008 -121.99157000000001 -102.33061000000001 -73.67958000000002 -71.48079000000001 C -25.367590000000014 -40.630960000000016 49.71971999999998 -37.13853000000001 93.95720999999998 -9.199070000000013 C 138.19469999999998 18.740389999999987 163.80586999999997 52.06825999999999 134.12018999999998 128.75204 C 104.43450999999997 205.43581 6.646379999999979 240.36014 6.646379999999979 240.36014 C 6.646379999999979 240.36014 -91.72382000000002 206.74971 -129.55851 135.7369 C -167.3932 64.72408999999999 -132.46887 20.91892999999999 -126.06608000000001 12.769919999999985 C -119.66329000000002 4.620909999999984 -90.55968000000001 -16.915760000000017 -90.55968000000001 -16.915760000000017"
                  strokeLinecap="round"
                />
              </g>
              <g
                transform="matrix(0.9110794354 0 0 0.9289433609 196.5282280163 337.0269670709)"
                id="ZjAsupvRvluV8OTTdSpK3"
              >
                <path
                  fill="#2454C4"
                  d="M -8.15169 -3.48026 C -8.15169 -3.48026 -23.86764 -9.88305 -24.449710000000003 -26.181070000000002 C -25.031780000000005 -42.47909 -15.380140000000003 -52.37432 0.9178799999999967 -51.79225 C 17.215899999999998 -51.21018 25.026429999999998 -40.73288 24.444359999999996 -26.181070000000002 C 23.862289999999994 -11.629270000000002 8.728409999999997 -3.4802600000000012 8.728409999999997 -3.4802600000000012 L 24.444359999999996 51.8166 L -22.121410000000004 51.8166 z"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />

              <Route
                path="account"
                element={
                  <ProtectedRoute user={user} setUser={setUser}>
                    <AccountSettings user={user} setUser={setUser} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="main"
                element={
                  <ProtectedRoute user={user}>
                    <Main user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="main/:type"
                component={
                  <ProtectedRoute user={user}>
                    <Main user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="pwgenerator"
                element={
                  <ProtectedRoute user={user}>
                    <PwGenerator />
                  </ProtectedRoute>
                }
              />

              <Route path="faq" element={<FAQ />} />
              <Route path="nice2know" element={<Nice2Know />} />
              <Route path="imprint" element={<Imprint />} />
              <Route path="legalnotice" element={<LegalNotice />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="login"
                element={<Login setUser={setUser} user={user} />}
              />
              <Route path="forgotpassword" element={<ForgotPassword />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </Suspense>
  );
};

export default App;
