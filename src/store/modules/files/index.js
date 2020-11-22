import mutations from '@/store/modules/files/mutations';
import actions from '@/store/modules/files/actions';

const state = {
  userFiles: [],
};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
};
