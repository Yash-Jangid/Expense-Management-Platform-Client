import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../api/auth';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
