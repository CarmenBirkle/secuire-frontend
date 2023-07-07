import { Suspense, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './components/helperSites/AppContext';

// components
import Home from './pages/Home';
import Main from './pages/Main';

import Signup from './pages/Signup';
import Imprint from './pages/Imprint';
import SharedLayout from './components/helperSites/SharedLayout';
import AccountSettings from './pages/AccountSettings';
import PwGenerator from './pages/PwGenerator';
import FAQ from './pages/FAQ';
import AGB from './pages/AGB';
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

import CookieBanner from './components/CookieBanner';
import LoadingAnimation from './components/Loading';


const App = () => {
  const [user, setUser] = useState(null);
  const { setLogIn } = useContext(AppContext);


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
    setLogIn(false);
  };

  const resetTimeout = () => {
    clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(logout, 300000); // 5 Minuten
  };

  useEffect(() => {
    events.forEach((event) => window.addEventListener(event, resetTimeout));
    resetTimeout(); 
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
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          <div>
            <CookieBanner />
          </div>
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
                <Route path="agb" element={<AGB />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </>
      )}
    </Suspense>
  );
};

export default App;
