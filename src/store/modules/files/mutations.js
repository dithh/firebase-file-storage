export default {
  SAVE_USER_FILES(state, payload) {
    state.userFiles = payload;
  },
  DELETE_USER_FILE(state, payload) {
    const files = [...state.userFiles];
    files.splice(payload, 1);
    state.userFiles = files;
  },
  SAVE_USER_SINGLE_FILE(state, payload) {
    state.userFiles.push(payload);
  },
  CLEAR_USER_FILES(state) {
    state.userFiles = [];
  },
};
