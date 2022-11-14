<template>
  <div class="card">
    <Toolbar class="mb-4">


      <template #end>
        <Button label="Добавить пользователя" icon="pi pi-plus" class="p-button-success mr-2" @click="viewUserDialog()" />

      </template>
    </Toolbar>

    <DataTable :value="users" responsiveLayout="scroll">

      <Column field="lastname" header="Фамилия"></Column>
        <Column field="firstname" header="Имя"></Column>
      <Column field="surname" header="Отчество"></Column>
        <Column field="email" header="Логин"></Column>
      <Column field="phone" header="Телефон"></Column>
        <Column field="is_admin" header="Админ"></Column>
        <Column field="areas" header="Уполномочен"></Column>

    </DataTable>

  </div>
  <User :title="user_action" :user="current_user" :dialogVisible="userDialogVisible" />


</template>

<script>

import store from "@/state";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import User from "@/components/User";
// import Card from "primevue/card";

export default {
  components: {DataTable, Column, Toolbar, Button, User},
  name: "Users-table",

  data() {
    return {
      userDialogVisible: false,
      user_action: '',
      current_user: [],
    }
  },
  mounted() {
    store.dispatch('getUsers');
  },
  computed: {

    users:
        function () {
          return this.$store.state.users.map(e => {return{...e, areas:  e.areas.map(a => {return a.name}).join(', ')}})
        },
  },
  methods:{
    viewUserDialog(name, id) {
      this.userDialogVisible = !this.userDialogVisible;
      this.userName = name;
      this.currentUserID = id;
      console.log(this.userDialogVisible)
    },
  }
}
</script>

<style scoped>

</style>