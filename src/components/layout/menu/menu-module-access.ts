import { LayoutDashboard, Package, Target, Users } from 'lucide-react';
import { Menu, MenuItem } from './menu.dto';

export const masterDataMenu: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    moduleCode: 'DASHBOARD',
  },
  {
    title: 'Customers',
    url: '/customers',
    icon: Users,
    moduleCode: 'CUSTOMER-LIST',
  },
  {
    title: 'Recommendations',
    url: '/recommendation-history',
    icon: Target,
    moduleCode: 'RECOMMENDATION-HISTORY',
  },
  {
    title: 'Products',
    url: '/products',
    icon: Package,
    moduleCode: 'PRODUCT-CATALOG',
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
    moduleCode: 'USERS',
  },
];

export const menus: Menu[] = [
  {
    label: 'Dashboard',
    items: masterDataMenu,
  },
];