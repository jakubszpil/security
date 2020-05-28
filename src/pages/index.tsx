import Dashboard from './Dashboard';
import Details from './Details';

interface Page {
  name: string;
  path: string;
  component: any;
  exact: boolean;
}

const pages: Array<Page> = [
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
    exact: false,
  },
];

export default pages;
