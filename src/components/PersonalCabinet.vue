<template>
  <div class="font-medium text-3xl text-900 mb-6 block font-bold text-center p-4 border-round text-2xl">Личный кабинет пользователя</div>

  <div class="surface-section ml-5 mr-5 ">

    <ul class="list-none p-0 m-0">

      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Фамилия</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{this.user.lastname}}</div>
      </li>

      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Имя</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{this.user.firstname}}</div>
      </li>

      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Отчество</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{this.user.surname}}</div>
      </li>

      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Электронная почта</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{this.user.email}}</div>
      </li>

      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Телефон</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{this.user.phone}}</div>
      </li>

      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Муниципальные образования</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{this.user_areas}}</div>
      </li>


    </ul>

  </div>
  <div class="flex justify-content-end mt-4 mr-6">
    <Button label="Редактировать информацию" icon="pi pi-pencil" class="p-button-outlined mr-3" @click="editUser()"></Button>
  </div>

  <User :dialogVisible="userDialogVisible" :user="this.user" :user_action="user_action"/>
  <ConfirmDialog id="confirm" aria-label="popup"/>
</template>

<script>

import Button from "primevue/button";
import store from "@/state";
import User from "@/components/User";


export default {
  name: "PersonalCabinet",
  components: {Button, User},
  data() {
    return {
      userDialogVisible: false,
      user_action: '',
      current_user: {},

    }
  },
  computed: {
    user:
        function () {
          return this.$store.state.user
        },
    user_areas(){
      return store.state.userAreas.map(e => {return e.name}).join('; ');
    },
  },
  methods: {
    editUser() {
      this.userDialogVisible = !this.userDialogVisible;
      this.user_action = 'edit_personal';
      // this.current_user = user;
      console.log('personal_user=');
      console.log(JSON.stringify(this.user, null, 2));
    },
  }
}

</script>

<style scoped>

</style>