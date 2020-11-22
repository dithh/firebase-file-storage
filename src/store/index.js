import Vue from 'vue';
import Vuex from 'vuex';
import { auth, storage } from '@/firebase/firebase';
import MUTATIONS from '@/consts/mutations';
import AUTH_ERROR_CODES from '@/consts/authErrorCodes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    files: [],
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload;
    },
    SIGN_OUT(state) {
      state.user = {};
    },
    SAVE_USER_FILES(state, payload) {
      state.files = payload;
    },
    DELETE_USER_FILE(state, payload) {
      debugger;
      const files = [...state.files];
      files.splice(payload, 1);
      state.files = files;
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
    async signOut({ commit }) {
      try {
        await auth.signOut();
        commit(MUTATIONS.SIGN_OUT);
      } catch (error) {
        console.log(error);
      }
    },
    async getUserFiles({ commit }) {
      const response = await storage.ref().listAll();
      const { items } = response;
      const promises = items.map((item) => item.getMetadata());
      const metaData = await Promise.all(promises);
      metaData.forEach((data, index) => {
        items[index].size = data.size;
      });
      commit(MUTATIONS.SAVE_USER_FILES, items);
    },
    async deleteUserFile({ commit }, index) {
      commit(MUTATIONS.DELETE_USER_FILE, index);
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
