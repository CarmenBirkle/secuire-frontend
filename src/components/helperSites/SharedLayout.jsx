/**
* @fileOverview
* SharedLayout component for creating a shared layout structure.
* Renders a header, main content area with nested routes, and a footer.
*/

import { Outlet } from 'react-router-dom';
import Header from '../nav/Header';
import Footer from '../Footer';

const SharedLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default SharedLayout;
