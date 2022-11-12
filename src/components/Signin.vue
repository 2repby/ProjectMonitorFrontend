<template>

  <div class="flex align-items-center">

    <div class="flex align-items-center m-2">
      <div class="flex" >
        <img alt="logo" class="mr-2" height="60" src="../assets/yugra.png">
      </div>
      <div class="flex mr-2">
        <Button class="p-button-raised p-button-success" icon="pi pi-briefcase" iconPos="left" label="Проекты" @click="goLink('/projects')"/>
      </div>
      <div class="flex mr-2">
        <Button class="p-button-raised p-button-success" icon="pi pi-users" iconPos="left" label="Пользователи"/>
      </div>
      <div class="flex mr-2">
        <Button class="p-button-raised p-button-success" icon="pi pi-info-circle" iconPos="left" label="О проекте"/>
      </div>
    </div>

    <div>
      <div v-if="logged_in">
        <SplitButton :model="items" class="p-button-raised" icon="pi pi-user" v-bind:label="email"></SplitButton>
      </div>

      <div v-else >
        <InputText v-model="email" v-bind:class="{'p-invalid': wrong_password}"/>
        <Password v-model="password" :feedback="false" v-bind:class="{'p-invalid': wrong_password}"/>
        <Button class="p-button-raised " @click="login">Войти</Button>
      </div>
    </div>

  </div>

  <Toast position="bottom-right"/>

</template>

<script>

import '../state.js'
import "@/router";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import SplitButton from 'primevue/splitbutton';
import Toast from 'primevue/toast';


export default {
  name: "SignIn",
  components: {InputText, Button, Password, SplitButton, Toast},
  watch: {
    wrong_password: function (wrongPassword) {
      if (wrongPassword) this.$toast.add({
        severity: 'error',
        summary: 'Ошибка аутентификации',
        detail: 'Неверный логин или пароль',
        life: 4000
      });

    },
    logged_in: function (loggedIn) {
      if (loggedIn) this.$toast.add({
        severity: 'success',
        summary: 'Успешная аутентификация',
        detail: 'Вы успешно вошии в сиситему',
        life: 4000
      });
      if (!loggedIn) this.$toast.add({
        severity: 'success',
        summary: 'Выход из системы',
        detail: 'Вы успешно вышли из системы',
        life: 4000
      });
    }
  },
  data() {
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
  },
  methods: {
    login() {
      this.$store.dispatch('auth', {login: this.email, password: this.password});
    },
    logout() {
      this.$store.dispatch('logout');
    },
    goLink(link){
      this.$router.push(link)
    }
  },
}
</script>

<style scoped>

</style>