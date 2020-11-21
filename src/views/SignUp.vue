<template>
    <form class="md-layout md-alignment-top-center"
          @submit.prevent="submitForm">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="username">Email</label>
              <md-input type="text" v-model="email" id="username" name="password"/>
            </md-field>
            <md-field>
              <label for="password">Password</label>
              <md-input type="password" v-model="password" id="password" name="password"/>
            </md-field>
            <md-field>
              <label for="password-confirmation">Confirm password</label>
              <md-input type="password"
                        v-model="passwordConfirmation"
                        id="password-confirmation"
                        name="password-confirmation"/>
            </md-field>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary">Sign in</md-button>
        </md-card-actions>
      </md-card>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

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
    validatePassword() {
      return this.password === this.passwordConfirmation;
    },
    submitForm() {
      const { email, password } = this;
      if (this.validateForm()) {
        this.signUp({ email, password });
      } else {
        this.$toast.error('Form invalid');
      }
    },
  },
};
</script>

<style scoped>

</style>
