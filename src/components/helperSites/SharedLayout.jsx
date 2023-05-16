import { Outlet } from 'react-router-dom';
import Header from '../nav/Header';
// import Navbar from '../nav/Navbar';
import Footer from '../Footer';

const SharedLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      
    </>
  );
};
export default SharedLayout;
