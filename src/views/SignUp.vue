<template>
  <form
    class="md-layout md-alignment-top-center"
    @submit.prevent="submitForm"
  >
    <md-card
      class="md-alignment-top-center md-layout-item md-size-50 md-small-size-100"
    >
      <md-card-header class="md-layout md-alignment-top-left">
        <div class="md-title">
          Users
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label for="username">Email</label>
            <md-input
              id="username"
              v-model="email"
              type="text"
              name="password"
            />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input
              id="password"
              v-model="password"
              type="password"
              name="password"
            />
          </md-field>
          <md-field>
            <label for="password-confirmation">Confirm password</label>
            <md-input
              id="password-confirmation"
              v-model="passwordConfirmation"
              type="password"
              name="password-confirmation"
            />
          </md-field>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button
          type="submit"
          class="md-primary"
        >
          Sign in
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { countPassedValidators } from '@/utils/utils';

import userFormMixin from '@/mixins/userFormMixin';

export default {
  name: 'SignUp',
  mixins: [userFormMixin],
  data() {
    return {
      passwordConfirmation: '',
    };
  },
  methods: {
    ...mapActions(['signUp']),
    validatePasswordLength() {
      return this.password.length > 5;
    },
    validatePasswordLowerCaseLetter() {
      return this.password.toUpperCase() !== this.password;
    },
    validatePasswordUpperCaseLetter() {
      return this.password.toLowerCase() !== this.password;
    },
    validatePasswordDigit() {
      return /\d/.test(this.password);
    },
    validatePasswordSpecialCharacters() {
      return /[\s~`!@#$%^&*+=\-[\]\\';,/{}|\\":<>?()._]/g.test(this.password);
    },
    validatePasswordsMatch() {
      if (this.password === this.passwordConfirmation) {
        return true;
      }
      this.$toast.error('Passwords do not match');
      return false;
    },
    validatePassword() {
      const requiredCharactersCount = this.validatePasswordLength()
        ? countPassedValidators([this.validatePasswordDigit,
          this.validatePasswordLowerCaseLetter,
          this.validatePasswordUpperCaseLetter,
          this.validatePasswordSpecialCharacters,
        ]) : 0;
      if (requiredCharactersCount > 1) {
        return true;
      }
      this.$toast.error('Password too weak');
      return false;
    },
    submitForm() {
      const { email, password } = this;
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      const isPasswordConfirmationValid = this.validatePasswordsMatch();
      if (isEmailValid && isPasswordValid && isPasswordConfirmationValid) {
        this.signUp({ email, password });
      }
    },
  },
};
</script>

<style scoped>

</style>
