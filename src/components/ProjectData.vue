<template>

  <h2 class="card col-6 col-offset-3">{{ projects.filter(e => e.id == this.id).map(e => e.name)[0] }}</h2>


  <div class="card col-8 col-offset-2">
    <h3>Ввод значения метрики проекта</h3>
    <div class="field">
      <label for="area">Город (район)</label>
      <Dropdown id="area" v-model="selectedArea" :options="user_areas" class="w-full"
                optionLabel="name" placeholder="Выберите город (район)"/>
    </div>
    <div class="field">
      <label for="period">Отчетный период</label>
      <Dropdown id="period" v-model="selectedPeriod" :options="periods" class="w-full"
                optionLabel="name" placeholder="Выберите отчетный период"/>
    </div>
    <div class="field">
      <label for="metric">Показатель проекта</label>
      <Dropdown id="metric" v-model="selectedMetric" :options="metrics" class="w-full"
                optionLabel="name" placeholder="Выберите метрику проекта"/>
    </div>
    <div class="field">
      <label for="value">Значение метрики (0 - 100 %)</label>
      <InputText id="value" v-model="value" class="w-full" placeholder="Введите значение метрики" type="text"/>
    </div>
    <div class="field">
      <label for="value"><b>{{ this.value }}%</b></label>
      <Slider id="value" v-model="value" :min="0" :max="100" class="w-full"/>

    </div>
    <div class="field">
      <Button icon="pi pi-check" iconPos="left" label="Сохранить" @click="this.store_value()"/>
    </div>


  </div>

  <Toast position="bottom-right"/>
</template>

<script>
import store from '../state.js';
// import ProjectService from "@/services/projects";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Slider from 'primevue/slider';
// import $toast from "lodash";
import Toast from "primevue/toast";
import {isEmpty} from "lodash/lang";


export default {
  name: "EditData",
  props: ['id',],
  components: {Dropdown, Button, Slider, InputText, Toast},
  data() {
    return {
      metric_values: [],
      // projects: [],
      metrics: [],
      value: 0,
      selectedArea: '',
      selectedPeriod: '',
      selectedMetric: ',',
      result: [],
      projectName: '',
      tree: [],

    }
  },
  computed: {
    // user() {
    //   console.log('user COMPUTED')
    //   return store.state.user;
    //
    // },
    periods() {
      console.log('periods COMPUTED')
      return store.state.periods;
    },
    user_areas(){
      return store.state.userAreas;
    },
    projects(){
      return store.state.projects;
    }
  },

  watch: {
    // user: function () {
    //   store.dispatch('getUserAreas',this.user.id);
    // },
    projects: function () {
      this.metrics = this.projects.filter(e => e.id == this.id).map(e => e.metrics)[0]
    },
  },
  mounted() {

    store.dispatch('getProjects');
    // ProjectService.getProjects().then(data => this.projects = data)
    // ProjectService.getProjects().then(data => this.metrics = data.filter(e => e.id == this.id).map(e => e.metrics)[0])
    // console.log("CURRENT USER ID=", this.user.id)
    // store.dispatch('getUserAreas',this.user.id);
    // console.log("getUserAreas Dispatched");
  },
  methods: {
    store_value() {
      const bodyParameters = {
        "area_id": this.selectedArea.id,
        "metric_id": this.selectedMetric.id,
        "period_id": this.selectedPeriod.id,
        "value": this.value / 100,
      };
      // const result = store.dispatch('storeMetricValue', bodyParameters);
      store.dispatch('storeMetricValue', bodyParameters).then(data => {
        console.log('DATA^ ',data)
        if  (!isEmpty(data.code))
          this.$toast.add({severity:'error', summary: 'Ошибка добавления данных', detail: data.message, life: 4000});
        else
          if  (!isEmpty(data.data))
            this.$toast.add({severity:'error', summary: 'Ошибка добавления данных', detail: {...data.data.errors, error: data.data.message}, life: 4000});
          else
            this.$toast.add({severity: 'success', summary: 'Данные добавлены', detail: data, life: 4000});

      })




    }
  }

}


</script>

<style scoped>


</style>