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
      return new RegExp(/\S+@\S+\.\S+/).test(this.email);
    },
    validatePassword() {
      return this.password.length > 7;
    },
  },
};
