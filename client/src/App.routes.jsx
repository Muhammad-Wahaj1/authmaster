import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import useUserToken from './context/userTokenStore';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const PreAuthRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default function AppRoutes() {
  const { userToken } = useUserToken();
  const isAuthenticated = Boolean(userToken);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route element={<PreAuthRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}
