<template>
  <form
    class="md-layout md-alignment-top-center"
    @submit.prevent="submitForm"
  >
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title md-layout md-alignment-top-left">
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
import userFormMixin from '@/mixins/userFormMixin';

export default {

  name: 'Login',
  mixins: [userFormMixin],
  methods: {
    ...mapActions(['login']),
    submitForm() {
      const { email, password } = this;
      const isValid = this.validateForm();
      isValid && this.login({ email, password });
    },
  },
};
</script>

<style scoped>

</style>
