export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    validateForm() {
      return this.validateEmail() && this.validatePassword();
    },
    validateEmail() {
      if (new RegExp(/\S+@\S+\.\S+/).test(this.email)) {
        return true;
      }
      this.$toast.error('Email incorect');
      return false;
    },
    validatePassword() {
      if (this.password.length) {
        return true;
      }
      this.$toast.error('Please enter password');
      return false;
    },
  },
};
