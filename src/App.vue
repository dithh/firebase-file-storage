<template>
  <div id="app">
    <div id="nav">
      <template v-if="!isLoggedIn">
        <md-button to="/login">Login</md-button>
        <md-button to="/sign-up">Signup</md-button>
      </template>
      <md-button v-else to="" type="button"  @click="signOut">Sign out</md-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ROUTES from '@/consts/routes';

export default {
  name: 'App',
  computed: mapGetters(['isLoggedIn']),
  methods: mapActions(['signOut']),
  watch: {
    isLoggedIn(val) {
      const route = val ? ROUTES.USER_DASHBOARD : ROUTES.LOGIN;
      this.$router.push(route);
    },
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
