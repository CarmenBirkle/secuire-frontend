import { Outlet } from 'react-router-dom';
import Header from '../nav/Header';
import Navbar from '../nav/Navbar';
import Footer from '../Footer';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default SharedLayout;
