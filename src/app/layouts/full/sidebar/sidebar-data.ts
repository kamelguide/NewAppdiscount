import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Tables',
  },
  {
    displayName: 'Products',
    iconName: 'brand-minecraft',
    route: '/ui-components/products',
  },
  {
    displayName: 'Coupon',
    iconName: 'ticket',
    route: '/ui-components/Coupon',
  },
  {
    displayName: 'Discount',
    iconName: 'discount',
    route: '/ui-components/discount',
  },
  {
    displayName: 'LinkedProduct',
    iconName: 'discount-check',
    route: '/ui-components/linkedProductDiscount',
  },

  {
    displayName: 'Tracking',
    iconName: 'discount',
    route: '/ui-components/trakingTable',
  },



  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
        iconName: 'point',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
        iconName: 'point',
        route: '/authentication/register',
      },

    ],
  },
];
