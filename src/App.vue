<template>
  <div id="app">
    <div id="nav">
      <template v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/sign-up">Signup</router-link>
      </template>
      <span v-else @click="signOut">Sign out</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: mapGetters(['isLoggedIn']),
  methods: mapActions(['signOut']),
  watch: {
    isLoggedIn(val) {
      // eslint-disable-next-line no-unused-expressions
      if (val) {
        this.$router.push('/');
      } else {
        this.$router.push('/login');
      }
    },
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
