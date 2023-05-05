import { Suspense } from 'react';
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

const App = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="main" element={<Main />} />
            <Route path="main/:type" component={<Main />} />
            <Route path="pwgenerator" element={<PwGenerator />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="nice2know" element={<Nice2Know />} />
            <Route path="imprint" element={<Imprint />} />
            <Route path="legalnotice" element={<LegalNotice />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
