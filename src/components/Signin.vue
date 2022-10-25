<template>
  <div>

    <div v-if="logged_in">
      <SplitButton v-bind:label="email" icon="pi pi-user" :model="items"></SplitButton>
    </div>
    <div v-else>

        <InputText v-bind:class="{'p-invalid': wrong_password}" v-model="email" style="display: inline; margin: 10px;"/>

      <Password v-bind:class="{'p-invalid': wrong_password}" v-model="password" :feedback="false" style="display: inline; margin: 10px;"/>

      <Button style="display: inline;  margin: 10px;" @click="login">Войти</Button>
    </div>

  </div>
  <Toast position="bottom-right"/>
</template>

<script>

import '../state.js'
import '../router.js'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import SplitButton from 'primevue/splitbutton';
import Toast from 'primevue/toast';


export default {
  name: "SignIn",
  components: {InputText,Button,Password, SplitButton, Toast},
  watch: {
    wrong_password: function (wrongPassword){
      if (wrongPassword)  this.$toast.add({severity:'error', summary: 'Ошибка аутентификации', detail:'Неверный логин или пароль', life: 4000});

    },
    network_error: function (networkError){
      if (networkError)  this.$toast.add({severity:'error', summary: 'Сервер не отвечает', detail:'Отсуствует сетевое соединение или сервер недоступен', life: 4000});
    },
    logged_in: function (loggedIn){
      if (loggedIn)  this.$toast.add({severity:'success', summary: 'Успешная аутентификация', detail:'Вы успешно вошии в сиситему', life: 4000});
      if (!loggedIn)  this.$toast.add({severity:'success', summary: 'Выход из системы', detail:'Вы успешно вышли из системы', life: 4000});
    }
  },
  data(){
    return {

      email: '2repby@gmail.com',
      password: 'password',
      items: [
        {
          label: 'Профиль',
          icon: 'pi pi-user',
          command: () => {
            this.router.push('/profile')
          }
        },
        {
          label: 'Поддержка',
          icon: 'pi pi-question-circle',
          command: () => {
            this.router.push('/login')
          }
        },
        {
          label: 'Выйти',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.logout()
          }
        },
      ]
    }
  },
  computed: {

    logged_in:
        function () {
          return this.$store.state.loggedIn
        },
    wrong_password:
      function () {
        return this.$store.state.wrongPassword
      },
    network_error:
        function () {
          return this.$store.state.networkError
        }

  },
  methods: {
    login(){
      this.$store.dispatch('auth', {login: this.email, password: this.password});
    },
    logout(){
      this.$store.dispatch('logout');
    },
  },
}
</script>

<style scoped>

</style>