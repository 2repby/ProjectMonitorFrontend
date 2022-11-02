<template>

  <div v-for="(item, index) in projects" :key="item.id" style="margin: 10px">
    <Card>
<!--      <template #header>-->
<!--        <img alt="user header" src="demo/images/usercard.png">-->
<!--      </template>-->
      <template #title>
        {{ item.name}}
      </template>
      <template #content>
        {{ item.description }}

<!--        <div v-for="item2 in item.metrics" :key="item2.id" style="margin: 10px">-->
<!--          {{item2.name}}-->
<!--        </div>-->
      </template>
      <template #footer>
        <Button icon="pi pi-chart-line" label="Метрики" class="p-button-outlined" @click="viewMetricsDialog(item.name,index)"/>
        <Button icon="pi pi-pencil" label="Ввод данных" class="p-button-outlined" style="margin-left: .5em"/>
        <Button icon="pi pi-file-export" label="Отчет" class="p-button-success p-button-outlined" style="margin-left: .5em" @click="viewProjectReport(index)"/>
      </template>
    </Card>
  </div>
  <Metrics :title="projectName" :metrics="projects[currentProjectID]" :dialogVisible="metricsDialogVisible"/>
</template>

<script>
import ProjectService from '../services/projects';
import Card from 'primevue/card';
import Button from "primevue/button";
import Metrics from "@/components/Metrics";
import router from "@/router";

export default {
  name: "Projects-data",
  components: {Metrics, Card, Button},
  data() {
    return {
      currentProjectID: 0,
      projects: [],
      metricsDialogVisible: '',
      projectName: '',
    }
  },
  // customerService: this.$store.state.projects,
  // created() {
  //   this.ProjectService = new ProjectService();
  // },
  mounted() {
    // this.customerService.getCustomersLarge().then(data => this.customers = data);
    ProjectService.getProjects().then(data => this.projects = data)
    console.log(this.projects)
  },
  methods: {

      viewMetricsDialog(name, id) {
        this.metricsDialogVisible = !this.metricsDialogVisible;
        this.projectName = name;
        this.currentProjectID = id;
        console.log(name, id)
       },
    viewProjectReport(id) {
      router.push('/projectreport/' + id)
    },
  },
}
</script>
<style>
  .layout{
    margin: 10px;
  }
</style>