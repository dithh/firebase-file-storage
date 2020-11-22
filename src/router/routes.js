import UserDashboard from '@/views/UserDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/sign-up',
    name: 'Sign up',
    component: () => import('../views/SignUp.vue'),
  },
];

export default routes;
