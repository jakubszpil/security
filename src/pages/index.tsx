import Dashboard from './Dashboard';
import Details from './Details';

export default [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    name: 'Details',
    path: '/details',
    component: Details,
  },
];
