<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>
<script>

import store from "./state";

import Menu from "@/components/Menu";
// import MainMenu from "@/components/MainMenu";
// import router from "@/router";


export default {
  components: {Menu},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token in local storage')

      store.commit('setToken', token);
      store.dispatch('getUser');
      store.commit('setLoggedIn', true);
    }

  }
};
</script>
<style>
body {
  background-color: WhiteSmoke; /* Цвет фона веб-страницы */
}
</style>