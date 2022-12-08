<template>
  <h2 class="card col-6 col-offset-5">Кабинет техподдержки</h2>


  <div class="card col-8 col-offset-2">
    <h3>Оставтье свое сообщение и мы обязательно ответим</h3>
    <div class="field">
      <label for="value">Задайте вопрос, опишите проблему:</label>
      <Textarea id="value" v-model="value" class="w-full" placeholder="Введите сообщение" type="text"/>
    </div>

    <div class="field">
      <Button icon="pi pi-check" iconPos="left" label="Отправить" @click="this.store_value()"/>
    </div>


  </div>
</template>

<script>

import Button from "primevue/button";
// import InputText from "primevue/inputtext";
import Textarea from 'primevue/textarea';
// import Toast from "primevue/toast";

export default {
  name: "SupportForm",
  components: {Button, Textarea},
}
</script>

<style scoped>

</style>