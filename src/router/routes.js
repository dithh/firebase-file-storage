import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
