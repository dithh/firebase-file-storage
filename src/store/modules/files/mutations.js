export default {
  SAVE_USER_FILES(state, payload) {
    state.files = payload;
  },
  DELETE_USER_FILE(state, payload) {
    debugger;
    const files = [...state.files];
    files.splice(payload, 1);
    state.files = files;
  },
};
