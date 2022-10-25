<template>
  <Dialog :header="'Метрики проекта '+this.title+':'" v-model:visible="this.DV" :style="{width: '75vw'}" :maximizable="true"
         :modal="true" :contentStyle="{height: '300px'}" :closable="true" :closeOnEscape="true">
        <DataTable :value="this.metrics.metrics" :scrollable="true" scrollHeight="flex">
          <Column field="name" header="Name" style="min-width:200px"></Column>
          <Column field="country.name" header="Country" style="min-width:200px"></Column>
          <Column field="representative.name" header="Representative" style="min-width:200px"></Column>
          <Column field="status" header="Status" style="min-width:200px"></Column>
        </DataTable>
        <template #footer>
          <Button label="Закрыть" icon="pi pi-check" @click="closeDialog" />
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
      components: {Dialog, DataTable,Button,Column},
      props: ['title','dialogVisible','metrics'],

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
          this.DV  = true;
          console.log('watched');
        },
      },
    };

    </script>

    <style scoped>

    </style>