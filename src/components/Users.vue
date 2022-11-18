<template>
  <div class="card">
    <Toolbar class="mb-4">


      <template #end>
        <Button class="p-button-success mr-2" icon="pi pi-plus" label="Добавить пользователя"
                @click="viewUserDialog()"/>

      </template>
    </Toolbar>

    <DataTable :value="users" responsiveLayout="scroll">

      <Column field="lastname" header="Фамилия"></Column>
      <Column field="firstname" header="Имя"></Column>
      <Column field="surname" header="Отчество"></Column>
      <Column field="email" header="Логин"></Column>
      <Column field="phone" header="Телефон"></Column>
      <Column header="Админ">
        <template #body="{data}">
          {{ data.is_admin == 1 ? 'Да' : 'Нет' }}
        </template>
      </Column>
      <Column field="areas" header="Уполномочен"></Column>
      <Column style="min-width:8rem" header="Действия">
        <template #body="{data}">
          <Button class="p-button-rounded p-button-success mr-2" icon="pi pi-pencil"
                  @click="editProduct(slotProps.data)"/>
          <Button class="p-button-rounded p-button-danger" icon="pi pi-trash" @click="deleteUser($event,data )"/>
        </template>
      </Column>

    </DataTable>

  </div>
  <User :dialogVisible="userDialogVisible" :user="current_user" :user_action="user_action"/>
  <ConfirmDialog id="confirm" aria-label="popup"/>

</template>

<script>

import store from "@/state";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import User from "@/components/User";
import ConfirmDialog from 'primevue/confirmdialog';
import {isEmpty} from "lodash/lang";

export default {
  components: {DataTable, Column, Toolbar, Button, User, ConfirmDialog},
  name: "Users-table",

  data() {
    return {
      userDialogVisible: false,
      user_action: '',
      current_user: [],
      // confirm: useConfirm(),
    }
  },
  mounted() {
    store.dispatch('getUsers');
  },
  computed: {

    users:
        function () {
          return this.$store.state.users.map(e => {
            return {
              ...e, areas: e.areas.map(a => {
                return a.name
              }).join(', ')
            }
          })
        },
  },
  methods: {
    viewUserDialog(name, id) {
      this.userDialogVisible = !this.userDialogVisible;
      this.user_action = 'create';
      this.userName = name;
      this.currentUserID = id;
      console.log(this.userDialogVisible)
    },
    deleteUser(event, user) {
      this.$confirm.require({
        header: 'Данное действие необратимо!',
        message: 'Вы действительно ходите удалить пользователя ' + user.lastname + ' ' + user.firstname + ' ' + user.surname + '?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'удалить',
        rejectLabel: 'Отмена',
        acceptIcon: 'pi pi-exclamation-circle',
        rejectIcon: 'pi pi-times',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-info',
        accept: () => {
          store.dispatch('deleteUser', user.id).then(data => {
            console.log('DATA^ ', data)
            if (!isEmpty(data.code))
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка добавления пользователя',
                detail: data.message,
                life: 4000
              });
            else if (!isEmpty(data.data))
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка добавления пользователя',
                detail: {...data.data.errors, error: data.data.message},
                life: 4000
              });
            else {
              this.$toast.add({severity: 'success', summary: 'Пользователь успешно удален', detail: data, life: 4000});
              store.dispatch('getUsers');
              }

          })

        },
        reject: () => {
          //callback to execute when user rejects the action
        },
        onShow: () => {
          //console.log('Del user show')
        },
        onHide: () => {
          //callback to execute when popup is hidden
        },

      });
    },
  }
}
</script>

<style scoped>

</style>