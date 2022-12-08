<template>
  <div id="app">
<!--    <Menu></Menu>-->
    <SignIn></SignIn>
    <router-view :key="$route.fullPath"></router-view>
    <Card class="text-center mt-8">

      <template #content>
        (c) 2022 Сургутский государственный университет
      </template>
    </Card>
    <Toast position="bottom-right"/>
  </div>

</template>
<script>

import store from "./state";

// import Menu from "@/components/Menu";
import Toast from "primevue/toast";
import SignIn from "@/components/Signin";
// import Panel from "primevue/panel";
import Card from "primevue/card";
// import MainMenu from "@/components/MainMenu";
// import router from "@/router";


export default {
  components: {SignIn, Toast, Card},
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  computed: {
    error() {
      return this.$store.state.networkError
    },
    user(){
      return this.$store.state.user
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
    user: function () {
      if (this.user){
        store.dispatch('getUserAreas',this.user.id);
      }
    },
  },

  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('The token in the local storage')

      store.commit('setToken', token);
      store.dispatch('getUser');
      // store.dispatch('getUserAreas', this.store.state.user.id);

    }
    store.dispatch('getPeriods');
    store.dispatch('getAreas');
    store.dispatch('getProjects');
  },
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