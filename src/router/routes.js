import UserDashboard from '@/views/UserDashboard.vue';
import ROUTES from '@/consts/routes';
import store from '@/store';

const loginAndSignUpRouteGuard = (to, from, next) => {
  store.getters.isLoggedIn ? next(ROUTES.LOGIN) : next();
};

const routes = [
  {
    path: ROUTES.USER_DASHBOARD,
    name: 'UserDashboard',
    component: UserDashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: ROUTES.LOGIN,
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: loginAndSignUpRouteGuard,
  },
  {
    path: ROUTES.SIGN_UP,
    name: 'Sign up',
    component: () => import('../views/SignUp.vue'),
    beforeEnter: loginAndSignUpRouteGuard,
  },
];

export default routes;
