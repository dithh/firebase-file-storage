import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import ROUTES from '@/consts/routes';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth) && !store.getters.isLoggedIn) {
    next(ROUTES.LOGIN);
  } else {
    next();
  }
});

export default router;
