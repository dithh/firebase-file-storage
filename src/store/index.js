import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/index';
import files from './modules/files/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    files,
  },
});
