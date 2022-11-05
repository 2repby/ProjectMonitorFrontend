<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
    <Toast position="bottom-right"/>
  </div>

</template>
<script>

import store from "./state";

import Menu from "@/components/Menu";
import Toast from "primevue/toast";
// import MainMenu from "@/components/MainMenu";
// import router from "@/router";


export default {
  components: {Menu, Toast},
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  computed: {
    // user() {
    //   return this.$store.state.user;
    // },
    error() {
      return this.$store.state.networkError
    }
  },

  watch: {
    error: function (Error) {
      if (Error) this.$toast.add({
        severity: 'error',
        summary: 'Сервер не отвечает',
        detail: 'Отсуствует сетевое соединение или сервер недоступен',
        life: 4000
      });
    },
  },

  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token in local storage')

      store.commit('setToken', token);
      store.dispatch('getUser');
      // store.commit('setLoggedIn', true);
    }


  }
}
</script>
<style>
body {
  background-color: WhiteSmoke;
  /* background-color: var(--surface-b);*/
   font-family: var(--font-family);
   color: var(--text-color);

  }

</style>