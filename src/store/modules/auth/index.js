import actions from '@/store/modules/auth/actions';
import mutations from '@/store/modules/auth/mutations';
import getters from '@/store/modules/auth/getters';

const state = {
  user: {},
};

export default {
  namespaced: false,
  actions,
  mutations,
  state,
  getters,
};
