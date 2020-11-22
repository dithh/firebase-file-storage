import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/firebase/firebase';
import MUTATIONS from '@/consts/mutations';
import AUTH_ERROR_CODES from '@/consts/authErrorCodes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        commit(MUTATIONS.LOGIN, user);
      } catch ({ code, message }) {
        const errorMessage = code === AUTH_ERROR_CODES.USER_DISABLED ? 'Your account was disabled.Contact platform administration.' : message;
        Vue.prototype.$toast.error(errorMessage || 'Unknown error');
      }
    },
    async signUp({ commit }, { email, password }) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        commit(MUTATIONS.LOGIN, user);
      } catch ({ message }) {
        Vue.prototype.$toast.error(message || 'Unknown error');
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user.uid;
    },
  },
  modules: {
  },
});
