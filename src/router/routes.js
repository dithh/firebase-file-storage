import UserDashboard from '@/views/UserDashboard.vue';
import store from '@/store';

const loginAndSignUpRouteGuard = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next('/');
  } else {
    next();
  }
};

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
    beforeEnter: loginAndSignUpRouteGuard,
  },
  {
    path: '/sign-up',
    name: 'Sign up',
    component: () => import('../views/SignUp.vue'),
    beforeEnter: loginAndSignUpRouteGuard,
  },
];

export default routes;
