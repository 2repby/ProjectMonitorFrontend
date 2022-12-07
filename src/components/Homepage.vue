<template>


  <div class="block font-bold text-center p-4 border-round text-2xl">Информационная система «Мониторинг показателей
    региональных проектов»
  </div>
  <div class="flex flex-wrap card-container justify-content-center" >
    <Card class="flex justify-content-center bg-black-alpha-10 font-bold text-black m-2 border-round" style="min-width: 250px; min-height: 120px" >
      <template #title>
        <div class="text-center">Всего проектов</div>
      </template>
      <template #content>
        <h1 class="text-center text-5xl text-blue-700">3</h1>
      </template>
      <template #footer >
        <div class="justify-content-right">
        <Button class="p-button-secondary" icon="pi pi-arrow-right" iconPos="right" label="Подробнее" style="margin-left: .5em"/>
        </div>
      </template>
    </Card>
    <Card class="flex justify-content-center bg-black-alpha-10 font-bold text-black m-2 border-round" style="min-width: 250px; min-height: 120px" >
      <template #title>
        <div class="text-center">Всего показателей</div>
      </template>
      <template #content>
        <h1 class="text-center text-5xl text-blue-700">124</h1>
      </template>
      <template #footer >
        <div class="justify-content-right">
          <Button class="p-button-secondary" icon="pi pi-arrow-right" iconPos="right" label="Подробнее" style="margin-left: .5em"/>
        </div>
      </template>
    </Card>
    <Card class="flex justify-content-center bg-black-alpha-10 font-bold text-black m-2 border-round" style="min-width: 250px; min-height: 120px" >
      <template #title>
        <div class="text-center">Внесено значений</div>
      </template>
      <template #content>
        <h1 class="text-center text-5xl text-blue-700">3591</h1>
      </template>
      <template #footer >
        <div class="justify-content-right">
          <Button class="p-button-secondary" icon="pi pi-arrow-right" iconPos="right" label="Подробнее" style="margin-left: .5em"/>
        </div>
      </template>
    </Card>
    <Card class="flex justify-content-center bg-black-alpha-10 font-bold text-red-700 m-2 border-round" style="min-width: 250px; min-height: 120px" >
      <template #title>
        <div class="text-center">Не внесено значений</div>
      </template>
      <template #content>
        <h1 class="text-center text-5xl text-red-700">84</h1>
      </template>
      <template #footer >
        <div class="justify-content-right">
          <Button class="p-button-secondary" icon="pi pi-arrow-right" iconPos="right" label="Подробнее" style="margin-left: .5em"/>
        </div>
      </template>
    </Card>





  </div>


</template>

<script>
import '../state.js'
import Card from 'primevue/card';
import Button from "primevue/button";

export default {
  name: "Home-page",
  components: {Card, Button},
  // created() {
  //   if( !this.$store.state.user.id > 0){
  //     this.$router.push('/signin');
  //   }
  // },
  // methods: {
  //   logout(){
  //     this.$store.commit('logout')
  //   }
  // }
}
</script>
<style scoped>
</style>