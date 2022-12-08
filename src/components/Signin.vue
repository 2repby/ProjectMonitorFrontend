<template>
  <Toolbar>
    <template #start>
      <div class="align-items-center flex flex-column md:flex-row">
        <a href="/">
        <div class="flex">
          <img alt="logo" height="60" src="../assets/yugra.png ">
        </div>
        </a>
        <div class="flex m-2 md:flex-row">
          <Button class="p-button-raised p-button-success md:flex-row" icon="pi pi-briefcase" iconPos="left"
                  label="Проекты" @click="goLink('/projects')"/>
        </div>
        <div class="flex m-2" v-if="is_admin">
          <Button class="p-button-raised p-button-success" icon="pi pi-users" iconPos="left" label="Пользователи"
                  @click="goLink('/users')"/>
        </div>
<!--        <div class="flex m-2">-->
<!--          <Button class="p-button-raised p-button-success" icon="pi pi-info-circle" iconPos="left" label="Документация"/>-->
<!--        </div>-->
      </div>
    </template>

    <template #end>
      <div class="flex align-items-center ">
        <div v-if="logged_in" class="m-2">
          <SplitButton :model="items" class="p-button-raised" icon="pi pi-user" :label=this.login_as></SplitButton>
        </div>

        <div v-else class="flex flex-column md:flex-row ">
          <InputText v-model="email" class="m-2" v-bind:class="{'p-invalid': wrong_password}" placeholder="e-mail"/>
          <Password v-model="password" :feedback="false" class="m-2" v-bind:class="{'p-invalid': wrong_password}" placeholder="пароль"/>
          <Button class="p-button-raised m-2" @click="login">Войти</Button>
        </div>
      </div>
    </template>
  </Toolbar>
  <Toast position="bottom-right"/>

</template>


<!--  <div class="align-items-center flex flex-column md:flex-row ">-->


<!--  </div>-->


<script>

import '../state.js'
import "@/router";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import SplitButton from 'primevue/splitbutton';
import Toast from 'primevue/toast';
import Toolbar from "primevue/toolbar";


export default {
  name: "SignIn",
  components: {InputText, Button, Password, SplitButton, Toast, Toolbar},
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

      email: '',
      password: '',
      items: [
        {
          label: 'Личный кабинет',
          icon: 'pi pi-user',
          command: () => {
            this.$router.push('/profile')
          }
        },
        {
          label: 'Поддержка',
          icon: 'pi pi-question-circle',
          command: () => {
            this.$router.push('/support')
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
    login_as:
        function () {
        if (this.$store.state.user) {
            return this.$store.state.user.email
          }
        return false
        },
    is_admin:
      function () {
        if (this.$store.state.user) {
          return this.$store.state.user.is_admin
        } else {
          return false
        }
      }
  },
  methods: {
    login() {
      this.$store.dispatch('auth', {login: this.email, password: this.password});
    },
    logout() {
      this.$store.dispatch('logout');
    },
    goLink(link) {
      this.$router.push(link)
    }
  },
}
</script>

<style scoped>


</style>