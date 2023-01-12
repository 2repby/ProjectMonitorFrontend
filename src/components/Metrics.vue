<template>
  <Card>
    <template #title>
      {{ project_name }}
    </template>
    <template #content>
      <Toolbar class="mb-4">


        <template #end>
          <Button class="p-button-success mr-2" icon="pi pi-plus" label="Добавить метрику"
                  @click="viewUserDialog()"/>

        </template>
      </Toolbar>

      <DataTable :value="metrics" responsiveLayout="scroll">

        <Column field="code" header="Код"></Column>
        <Column header="Метрика">
          <template #body="{data}">
            <span v-html="data.showed_name"></span>
          </template>
        </Column>
        <Column header="Описание">
        <template #body="{data}">
          <span v-html="data.showed_description"></span>
        </template>
        </Column>
<!--        <Column header="Является нормой">-->
<!--          <template #body="{data}">-->
<!--            {{ data.is_norma == 1 ? 'Да' : 'Нет' }}-->
<!--          </template>-->
<!--        </Column>-->
        <Column header="Бинарная">
          <template #body="{data}">
            {{ data.is_binary == 1 ? 'Да' : 'Нет' }}
          </template>
        </Column>
        <Column field="norma_name" header="Нормирующее значение"></Column>
        <Column header="Отчетные периоды">
          <template #body="{data}">
            <span v-html="'<ul>' + data.periods_list + '</ul>'"></span>
          </template>
        </Column>
        <Column header="Редактировать" style="min-width:8rem">
          <template #body="{data}">
            <Button class="p-button-rounded p-button-success mr-2" icon="pi pi-pencil" @click="editMetric(data)"/>
            <!--          <Button class="p-button-rounded p-button-danger" icon="pi pi-trash" @click="deleteUser($event,data )"/>-->
          </template>
        </Column>

      </DataTable>
    </template>
  </Card>
  <!--  <User :dialogVisible="userDialogVisible" :user="current_user" :user_action="user_action"/>-->
  <!--  <ConfirmDialog id="confirm" aria-label="popup"/>-->

</template>

<script>
import store from "@/state";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Card from "primevue/card";
// import ConfirmDialog from "primevue/confirmdialog";

export default {
  components: {DataTable, Column, Toolbar, Button, Card},
  name: "MetricsView",

  mounted() {
    console.log('Проект=', this.$route.params.id);
    store.dispatch('getMetrics', this.$route.params.id);
  },

  computed: {

    project_name:
        function () {
          return this.$store.state.projects.filter(e => e.id == this.$route.params.id)[0].name
        },

    metrics:
        function () {
          return this.$store.state.metrics.map(e => {
            return {
              ...e,
              periods_list: e.periods.map(a => {
                return "<li>" + a.name + "</li>"
              }).join(', '),
              norma_name: e.norma?.name != null ? e.norma.name : 'Отсутствует',
              showed_name: e.is_norma == 1 ? e.name + "<br><b> Является нормирующим значением для других метрик</b>" : e.name,
              showed_description: e.input_description != null ? e.description + "<br><b>Вводимое пользователем значение:<br></b>" +  e.input_description
                  : "<b>Вводимое пользователем значение:<br></b>" +  e.name,
            }
          })
        },
  },
}
</script>

<style scoped>

</style>