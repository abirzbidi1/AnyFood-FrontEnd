import ManageUser from '../features/responsible/ManageUser/ManageUser';
import ForgetPassword from '../features/authentication/forgetPassword/ForgetPassword';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import Login from '../features/authentication/login/Login';
import { useRoutes } from 'react-router-dom';
import AuthLayout from '../layouts/authLayout/AuthLayout';
import ResetPassword from '../features/authentication/resetPassword/ResetPassword';
import Home from '../features/home/home';

const Router = () => {
  let routes = useRoutes([
    {
      path: "/", element: <DashboardLayout />,
      children: [
        { path: 'manage-users', element: <ManageUser /> },
        { path: 'home', element: <Home/> }
      ],
    },
    {
      path: 'auth', element: <AuthLayout />,
       children: [
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ]
    },

  ]);
  return routes;
};
export default Router;