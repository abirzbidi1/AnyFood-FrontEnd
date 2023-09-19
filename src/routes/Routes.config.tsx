import ManageUser from '../features/responsible/ManageUser/ManageUser';
import ForgetPassword from '../features/authentication/forgetPassword/ForgetPassword';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import Login from '../features/authentication/login/Login';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import AuthLayout from '../layouts/authLayout/AuthLayout';
import ResetPassword from '../features/authentication/resetPassword/ResetPassword';
import Home from '../features/home/homePage/home';
import Profile from '../features/profile/Profile';
import ManageRestaurant from '../features/responsible/ManageRestaurants/ManageRestaurants';
import Menu from '../features/home/restaurantModal/menuPage/menu';
import ManageOrder from '../features/responsible/Manage orders/manageOrders';
import RestaurantFormStepper from '../features/responsible/ManageRestaurants/addRestaurant/AddRestaurant';
import DashboardUserLayout from '../layouts/userLayout/DashboardUserLayout';

const Router = () => {
  const token = localStorage.getItem('accessToken');
  const location = useLocation();
  let routes = useRoutes([
    {
      path: "/", element: token ? <DashboardLayout /> : <Navigate state={{ from: location }} replace={true} to='/auth/login' />,
      children: [
        { path: 'manage-users', element: <ManageUser /> },
        { path: 'manage-restaurants', element: <ManageRestaurant /> },
        { path: 'manage-orders', element: <ManageOrder /> },
        { path: 'home', element: <Home /> },
        { path: 'me', element: <Profile /> },
        { path: 'menu/:id', element: <Menu /> },
        { path: 'restaurant', element: <RestaurantFormStepper />}
      ],
    },
    {
      path: "user", element: token ? <DashboardUserLayout /> : <Navigate state={{ from: location }} replace={true} to='/auth/login' />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'me', element: <Profile /> },
        { path: 'menu/:id', element: <Menu /> },
      ],
    },
    {
      path: 'auth', element: token ? <Navigate state={{ from: location }} replace={true} to='/auth/login' /> : <AuthLayout />,
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