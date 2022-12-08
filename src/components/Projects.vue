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
        <div class="grid">
          <div class="mx-1 my-1">
            <Button icon="pi pi-chart-line" label="Метрики" class="p-button-outlined" style="width: 100%" @click="viewMetricsDialog(item.name,index)"/>
          </div>
          <div class="mx-1 my-1" v-if="is_logged_in">
            <Button icon="pi pi-pencil" label="Ввод данных" class="p-button-outlined" style="width: 100%" @click="viewProjectData(index)"/>
          </div>
          <div class="mx-1 my-1">
            <Button icon="pi pi-list" label="Отчет" class="p-button-outlined" style="width: 100%" @click="viewProjectReport(index)"/>
          </div>
          <div class="mx-1 my-1">
            <Button icon="pi pi-chart-bar" label="Графики" class="p-button-outlined" style="width: 100%" @click="viewChartDialog(item.id,item.name)"/>
          </div>
        </div>

      </template>
    </Card>
  </div>

  <Metrics :title="projectName" :metrics="projects[currentProjectID]" :dialogVisible="metricsDialogVisible"/>
  <ProjectChart  v-bind:project="projects.filter(e => e.id == currentProjectID)[0]" :dialogVisible="chartDialogVisible"/>

</template>

<script>
// import ProjectService from '../services/projects';
import Card from 'primevue/card';
import Button from "primevue/button";
import Metrics from "@/components/Metrics";
import router from "@/router";
import ProjectChart from "@/components/ProjectChart";
import store from "@/state";
// import projects from "../services/projects";

export default {
  name: "Projects-data",
  components: {Metrics, ProjectChart, Card, Button},
  data() {
    return {
      currentProjectID: '',
      // projects: [],
      metricsDialogVisible: '',
      chartDialogVisible: '',
      projectName: '',
    }
  },
  computed:{
    projects(){
      return store.state.projects;
    },
    is_logged_in()
        {
          return this.$store.state.loggedIn
        },
    // is_admin:
    //     function () {
    //       if (this.$store.state.user) {
    //         return this.$store.state.user.is_admin
    //       } else {
    //         return false
    //       }
    //     }
  },
  // customerService: this.$store.state.projects,
  // created() {
  //   this.ProjectService = new ProjectService();
  // },
  mounted() {
    // this.customerService.getCustomersLarge().then(data => this.customers = data);
    // ProjectService.getProjects().then(data => this.projects = data)
    // console.log("ЭТИ ПРОЕКТЫ:")
    // console.log(this.projects)
  },
  methods: {
    viewMetricsDialog(name, id) {
      this.metricsDialogVisible = !this.metricsDialogVisible;
      this.projectName = name;
      this.currentProjectID = id;
      console.log(name, id)
     },
    viewChartDialog(id, name) {
      this.chartDialogVisible = !this.chartDialogVisible;
      this.currentProjectID = id;
      ProjectChart.data().selectedMetric = '';
      ProjectChart.data().selectedArea = '';
      ProjectChart.data().basicData = [];
      console.log(id, name)
      console.log( ProjectChart.data().basicData)
      console.log(id, name)
    },
    viewProjectReport(id) {
        console.log(id);
      router.push('/projectreport/' + this.projects[id].id)
    },
    viewProjectData(id) {
      console.log(id);
      router.push('/projectdata/' + this.projects[id].id)
    }
  },
}
</script>

<style>
  /*.layout{*/
  /*  margin: 10px;*/
  /*}*/
</style>