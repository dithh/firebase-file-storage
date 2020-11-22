import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth) && !store.getters.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
