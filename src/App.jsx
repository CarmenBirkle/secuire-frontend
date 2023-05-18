import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

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

const App = () => {
  const [user, setUser]= useState(null);
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            {/* <ProtectedRoute user={user}> */}
            <Route path="account" element={<AccountSettings user={user}/>} />
            <Route path="main" element={<Main user={user} />} />
            <Route path="main/:type" component={<Main user={user} />} />
            <Route path="pwgenerator" element={<PwGenerator />} />
            {/* </ProtectedRoute> */}
            <Route path="faq" element={<FAQ />} />
            <Route path="nice2know" element={<Nice2Know />} />
            <Route path="imprint" element={<Imprint />} />
            <Route path="legalnotice" element={<LegalNotice />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
