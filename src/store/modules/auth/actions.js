import { auth } from '@/firebase/firebase';
import MUTATIONS from '@/consts/mutations';
import AUTH_ERROR_CODES from '@/consts/authErrorCodes';
import Vue from 'vue';

export default {
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
  async signOut({ commit }) {
    try {
      await auth.signOut();
      commit(MUTATIONS.SIGN_OUT);
    } catch (error) {
      console.log(error);
    }
  },
};
