<template>

  <h2 class="card col-6 col-offset-3">{{ projects.filter(e => e.id == this.id).map(e => e.name)[0] }}</h2>


  <div class="card col-8 col-offset-2">
    <h3>Ввод значения метрики проекта</h3>
    <div class="field">
      <label for="area">Город (район)</label>
      <Dropdown id="area" v-model="selectedArea" :options="user_areas" optionLabel="name" placeholder="Выберите город (район)" class="w-full"/>
    </div>
    <div class="field">
      <label for="period">Отчетный период</label>
      <Dropdown id="period" v-model="selectedPeriod" :options="periods" optionLabel="name" placeholder="Выберите отчетный период" class="w-full"/>
    </div>
    <div class="field">
      <label for="metric">Показатель проекта</label>
      <Dropdown id="metric" v-model="selectedMetric" :options="metrics" optionLabel="name" placeholder="Выберите метрику проекта" class="w-full"/>
    </div>
    <div class="field">
      <label for="value">Значение метрики</label>
      <InputText id="value"  type="text" v-model="value" placeholder="Введите значение метрики" class="w-full"/>
    </div>
    <div class="field">
      <label for="value"><b>{{this.value}}%</b></label>
      <Slider id="value" v-model="value" class="w-full"/>

    </div>
    <div class="field">
      <Button label="Сохранить" icon="pi pi-check" iconPos="left" @click="this.store_value()"/>
    </div>




  </div>


</template>

<script>
import store from '../state.js';
import ProjectService from "@/services/projects";
import AreaService from "@/services/areas";
import Dropdown from "primevue/dropdown";
// import router from "@/router";
import PeriodService from '../services/periods';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Slider from 'primevue/slider';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/md-light-deeppurple/theme.css";
import "primeflex/primeflex.css";

export default {
  name: "EditData",
  props: ['id',],
  components: {Dropdown, Button, Slider, InputText},
  data() {
    return {
      metric_values: [],
      projects: [],
      periods: [],
      metrics: [],
      value: '',
      user_areas: [],
      selectedArea: '',
      selectedPeriod: '',
      selectedMetric: ',',
      result: [],
      projectName: '',
      tree: [],

    }
  },
  computed: {
    user() {
      return store.state.user;
    },
  },

  watch: {
    user: function () {
      AreaService.getUserAreas(this.user.id).then(
          data => {
            this.user_areas = data.map(e => e);
            console.log('USER_AREAS:');
            console.log(this.user_areas);
          }
      );
    },
  },
  mounted() {
    // ProjectService.getProjects().then(data => this.projects = data)
    ProjectService.getProjects().then(data => this.metrics = data.filter(e => e.id == this.id).map(e => e.metrics)[0])
    PeriodService.getPeriods().then(data => this.periods = data)
    console.log("CURRENT USER ID=", this.user.id)
    //Если при обновлении страницы еще не получен user
    if (this.user.id){
      AreaService.getUserAreas(this.user.id).then(
            data => {
            this.user_areas = data.map(e => e);
            console.log('USER_AREAS:');
            console.log(this.user_areas);
          }
      );
    }
  },
  methods: {
    store_value() {
      const backendUrl = process.env.VUE_APP_BACKEND_URL;
      console.log('Saving metric value...');
      const bodyParameters = {
        "area_id": this.selectedArea.id,
        "metric_id": this.selectedMetric.id,
        "period_id": this.selectedPeriod.id,
        "value": this.value,
    };
      const config = {
        headers: {
          "Authorization": "Bearer " + store.state.token,
          "Content-Type": "multipart/form-data"
        }
      };
      return window.axios.post(backendUrl + '/metricvalues', bodyParameters,config).then(response => {
        console.log(response.data)
        return response.data
      })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              // context.commit('setWrongPassword', false)
              store.dispatch('setNetworkError', true)
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
              store.dispatch('setNetworkError', true)

            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);


          })

    }
  }

}


</script>

<style scoped>



</style>