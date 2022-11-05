<template>
<div>
  <Menubar :model="items" style="margin: 10px">
    <template #start>
      <img alt="logo" src="../assets/yugra.png" height="60" class="mr-2">
    </template>

    <template #end>

      <SignIn></SignIn>
    </template>
  </Menubar>
</div>

</template>



<script>
import Menubar from 'primevue/menubar';
import SignIn from "@/components/Signin";
import router from "@/router";

export default {
  name: "MenuBar",
  components: {Menubar, SignIn},
  data() {
    return {
      items: [
        {
          label:'Проекты',
          icon:'pi pi-fw pi-briefcase big',
          command: () => {
            router.push('/projects')
          },
          items:[
            {
              label:'Создать',
              icon:'pi pi-fw pi-plus big',

            },
            {
              label:'Отчет',
              icon:'pi pi-fw pi-trash'
            },

          ]
        },
        {
          label:'Данные',
          icon:'pi pi-fw pi-chart-line',
          items:[
            {
              label:'Добавить',
              icon:'pi pi-fw pi-plus big'
            },

          ]
        },
        {
          label:'Пользователи',
          icon:'pi pi-fw pi-user',
          items:[
            {
              label:'Создать',
              icon:'pi pi-fw pi-user-plus',

            },
            {
              label:'Все пользователи',
              icon:'pi pi-fw pi-user-minus',

            },

          ]
        },

      ]

    }
  }
}
</script>

  <style scoped>

</style>