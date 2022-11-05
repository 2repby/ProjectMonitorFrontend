<template>
<Dialog :header="'Выберите метрику проекта '+this.title+':'" v-model:visible="this.DV" :style="{width: '50vw'}" :maximizable="true"
        :modal="true" :contentStyle="{height: '500px'}" :closable="true" :closeOnEscape="true">
  <div>
    <div class="card">
      <h5>Vertical</h5>
      <Chart type="bar" :data="basicData" :options="basicOptions" />
    </div>

  </div>

<template #footer>
  <Button label="Закрыть" icon="pi pi-check" @click="closeDialog" />
</template>
</Dialog>
</template>

<script>

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Chart from "primevue/chart";
// import Chart from "primevue/chart";

export default {
  name: "ProjectChart",
  components: {Dialog, Button, Chart},
  props: ['title','dialogVisible','metrics'],

  data() {
    return {
      DV: false,
      basicData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'My Second dataset',
            backgroundColor: '#9CCC65',
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      }

    }
  },
  methods: {

    closeDialog() {
      this.DV = false;
    },
  },
  watch: {

    dialogVisible: function () {
      this.DV  = true;
      console.log('watched');
    },
  },
};

</script>

<style scoped>

</style>