/**
 * A protected route component that redirects to a specified path if the user is not authenticated.
 *
 * @param children The child components to render if the user is authenticated.
 * @param user The user object representing the authenticated user.
 * @return The child components if the user is authenticated, or a redirect component otherwise.
 */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }) => {
  if (!user) return <Navigate to="/" />;
  return children;
};
export default ProtectedRoute;
