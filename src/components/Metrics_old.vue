<template>
  <Dialog v-model:visible="this.DV" :closable="true" :closeOnEscape="true"
          :contentStyle="{height: '300px'}"
          :header="'Метрики проекта '+this.title+':'" :maximizable="true" :modal="true" :style="{width: '50vw'}">
    <DataTable :scrollable="true" :value="this.metrics.metrics" scrollHeight="flex">
      <Column field="code" header="Код" style="max-width:50px"></Column>
      <Column field="name" header="Описание" style="min-width:300px"></Column>


    </DataTable>
    <template #footer>
      <Button icon="pi pi-check" label="Закрыть" @click="closeDialog"/>
    </template>
  </Dialog>
</template>

<script>

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "MetricsList",
  components: {Dialog, DataTable, Button, Column},
  props: ['title', 'dialogVisible', 'metrics'],

  data() {
    return {
      DV: false,

    }
  },
  methods: {

    closeDialog() {
      this.DV = false;
    },
  },
  watch: {

    dialogVisible: function () {
      this.DV = true;
      console.log('watched');
    },
  },
};

</script>

<style scoped>

</style>