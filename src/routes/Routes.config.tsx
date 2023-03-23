import ManageUser from '../features/responsible/ManageUser/ManageUser';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import { useRoutes } from 'react-router-dom';

    const Router = () => {
        let routes = useRoutes([
          { path: "/", element: <DashboardLayout />,
          children: [
              { path: '/manage-users', element: <ManageUser /> },
          ], },
          // ...
        ]);
        return routes;
      };

export default Router;