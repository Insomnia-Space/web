import {
  Activity,
  BookOpenCheck,
  Component,
  Database,
  Droplets,
  FlaskConical,
  Home,
  Package,
} from 'lucide-react';
import { Menu, MenuItem } from './menu.dto';

export const masterDataMenu: MenuItem[] = [
  {
    title: 'Home',
    url: '/home',
    icon: Home,
    moduleCode: 'TELCO-DASHBOARD',
  },
  {
    title: 'Network',
    url: '#',
    icon: Droplets,
    moduleCode: 'NETWORK',
    children: [
      { title: 'Topology', url: '/network/topology', moduleCode: 'NETWORK-TOPOLOGY' },
      { title: 'Links', url: '/network/links', moduleCode: 'NETWORK-LINKS' },
      { title: 'Performance', url: '/network/performance', moduleCode: 'NETWORK-PERFORMANCE' },
    ],
  },
  {
    title: 'OSS / BSS',
    url: '#',
    icon: Component,
    moduleCode: 'OSS-BSS',
    children: [
      { title: 'Service Provisioning', url: '/oss/provisioning', moduleCode: 'OSS-PROVISIONING' },
      { title: 'Inventory Sync', url: '/oss/inventory-sync', moduleCode: 'OSS-INVENTORY-SYNC' },
    ],
  },
  {
    title: 'Customer Management',
    url: '#',
    icon: BookOpenCheck,
    moduleCode: 'CUSTOMER',
    children: [
      { title: 'Subscribers', url: '/customer/subscribers', moduleCode: 'CUSTOMER-SUBSCRIBERS' },
      { title: 'Tickets', url: '/customer/tickets', moduleCode: 'CUSTOMER-TICKETS' },
    ],
  },
  {
    title: 'Inventory',
    url: '#',
    icon: Database,
    moduleCode: 'INVENTORY',
    children: [
      { title: 'Devices', url: '/inventory/devices', moduleCode: 'INVENTORY-DEVICES' },
      { title: 'Spare Parts', url: '/inventory/spares', moduleCode: 'INVENTORY-SPARES' },
    ],
  },
  {
    title: 'NOC',
    url: '#',
    icon: Activity,
    moduleCode: 'NOC',
    children: [
      { title: 'Alarms', url: '/noc/alarms', moduleCode: 'NOC-ALARMS' },
      { title: 'Incidents', url: '/noc/incidents', moduleCode: 'NOC-INCIDENTS' },
    ],
  },
  {
    title: 'Billing',
    url: '#',
    icon: Package,
    moduleCode: 'BILLING',
    children: [
      { title: 'Invoices', url: '/billing/invoices', moduleCode: 'BILLING-INVOICES' },
      { title: 'Usage', url: '/billing/usage', moduleCode: 'BILLING-USAGE' },
    ],
  },
  {
    title: 'Admin',
    url: '#',
    icon: FlaskConical,
    moduleCode: 'ADMIN',
    children: [
      { title: 'Users', url: '/admin/users', moduleCode: 'ADMIN-USERS' },
      { title: 'Roles', url: '/admin/roles', moduleCode: 'ADMIN-ROLES' },
      { title: 'Settings', url: '/admin/settings', moduleCode: 'ADMIN-SETTINGS' },
    ],
  },
];

export const dashboardDataMenu: MenuItem[] = [
  {
    title: 'Network Dashboard',
    url: '#',
    icon: Droplets,
    moduleCode: 'DASHBOARD-NETWORK',
    children: [
      {
        title: 'Overview',
        url: '/dashboard/network/overview',
        moduleCode: 'DASHBOARD-NETWORK-OVERVIEW',
      },
      {
        title: 'Capacity',
        url: '/dashboard/network/capacity',
        moduleCode: 'DASHBOARD-NETWORK-CAPACITY',
      },
    ],
  },
  {
    title: 'Business Dashboard',
    url: '#',
    icon: Package,
    moduleCode: 'DASHBOARD-BUSINESS',
    children: [
      {
        title: 'Revenue',
        url: '/dashboard/business/revenue',
        moduleCode: 'DASHBOARD-BUSINESS-REVENUE',
      },
      {
        title: 'Subscribers',
        url: '/dashboard/business/subscribers',
        moduleCode: 'DASHBOARD-BUSINESS-SUBSCRIBERS',
      },
    ],
  },
];

export const menus: Menu[] = [
  {
    label: 'Telco System',
    items: masterDataMenu,
  },
  {
    label: 'Dashboards',
    items: dashboardDataMenu,
  },
];
