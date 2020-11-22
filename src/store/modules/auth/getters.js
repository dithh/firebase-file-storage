export default {
  isLoggedIn(state) {
    return !!state.user.uid;
  },
};
