import { Brain, LayoutDashboard, Package, Settings, Target, Users } from 'lucide-react';
import { Menu, MenuItem } from './menu.dto';

export const masterDataMenu: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '#',
    icon: LayoutDashboard,
    moduleCode: 'DASHBOARD',
    children: [
      {
        title: 'Overview',
        url: '/dashboard',
        moduleCode: 'DASHBOARD-OVERVIEW',
      },
      {
        title: 'Product Performance',
        url: '/dashboard/products',
        moduleCode: 'DASHBOARD-PRODUCTS',
      },
      {
        title: 'Analytics',
        url: '/dashboard/analytics',
        moduleCode: 'DASHBOARD-ANALYTICS',
      },
    ],
  },
  {
    title: 'Customers',
    url: '#',
    icon: Users,
    moduleCode: 'CUSTOMER',
    children: [
      {
        title: 'Customer List',
        url: '/customers',
        moduleCode: 'CUSTOMER-LIST',
      },
      {
        title: 'Customer Segments',
        url: '/customers/segments',
        moduleCode: 'CUSTOMER-SEGMENTS',
      },
    ],
  },
  {
    title: 'Recommendations',
    url: '#',
    icon: Target,
    moduleCode: 'RECOMMENDATION',
    children: [
      {
        title: 'History',
        url: '/recommendations',
        moduleCode: 'RECOMMENDATION-HISTORY',
      },
      {
        title: 'Generate New',
        url: '/recommendations/generate',
        moduleCode: 'RECOMMENDATION-GENERATE',
      },
      {
        title: 'Performance',
        url: '/recommendations/performance',
        moduleCode: 'RECOMMENDATION-PERFORMANCE',
      },
    ],
  },
  {
    title: 'Products',
    url: '#',
    icon: Package,
    moduleCode: 'PRODUCT',
    children: [
      {
        title: 'Product Catalog',
        url: '/products',
        moduleCode: 'PRODUCT-CATALOG',
      },
      {
        title: 'Categories',
        url: '/products/categories',
        moduleCode: 'PRODUCT-CATEGORIES',
      },
    ],
  },
  {
    title: 'ML Model',
    url: '#',
    icon: Brain,
    moduleCode: 'ML-MODEL',
    children: [
      {
        title: 'Model Information',
        url: '/ml-model/info',
        moduleCode: 'ML-MODEL-INFO',
      },
      {
        title: 'Model Performance',
        url: '/ml-model/performance',
        moduleCode: 'ML-MODEL-PERFORMANCE',
      },
    ],
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
    moduleCode: 'SETTINGS',
    children: [
      {
        title: 'My Profile',
        url: '/settings/profile',
        moduleCode: 'SETTINGS-PROFILE',
      },
      {
        title: 'User Management',
        url: '/settings/users',
        moduleCode: 'SETTINGS-USERS',
      },
      {
        title: 'System Settings',
        url: '/settings/system',
        moduleCode: 'SETTINGS-SYSTEM',
      },
    ],
  },
];

export const menus: Menu[] = [
  {
    label: 'Telco Recommendation System',
    items: masterDataMenu,
  },
];
