import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {

  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element:  <ProtectedRoute path="/dashboard"><DashboardDefault /></ProtectedRoute>
    },
    {
      path: 'sample-page',
      element: <ProtectedRoute path="/sample-page"><SamplePage /></ProtectedRoute>
    }
  ]
};

export default MainRoutes;
