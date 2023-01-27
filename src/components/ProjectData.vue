<template>

  <h2 class="card col-6 col-offset-3">{{ projects.filter(e => e.id == this.project_id).map(e => e.name)[0] }}</h2>


  <div class="card col-8 col-offset-2">
    <h3>Ввод значения метрики проекта</h3>
    <div class="field">
      <label for="area">Город (район)</label>
      <Dropdown id="area" v-model="selectedArea" :options="user_areas" class="w-full" @change="this.areaSelected()"
                optionLabel="name" placeholder="Выберите город (район)"/>
    </div>
    <div class="field">
      <label for="period">Отчетный период</label>
      <Dropdown id="period" v-model="selectedPeriod" :options="periods" class="w-full" :disabled="this.period_disabled" @change="this.periodSelected()"
                optionLabel="name" placeholder="Выберите отчетный период"/>
    </div>
    <div class="field">
      <label for="metric">Метрика проекта</label>
      <Dropdown id="metric" v-model="selectedMetric" :options="metrics_on_period" class="w-full" :disabled="this.metric_disabled" @change="this.metricSelected()"
                optionLabel="option_name" placeholder="Выберите метрику проекта"/>
    </div>

    <div class="field" v-show="this.show_text_value_input" >
      <label for="value">{{value_label}}</label>
      <InputText id="value" v-model="metric_value" class="w-full" placeholder="Введите значение метрики" type="text" @change="this.valueEdited()"/>
    </div>

    <div class="field" v-show="this.show_binary_value_input" >
      <label for="value">{{value_label}}</label>
      <Dropdown id="value" v-model="metric_value" class="w-full"  :options="binary_values" optionLabel="name" placeholder="Выберите значение метрики" @change="this.valueEdited()"/>
    </div>

<!--    <div class="field">-->
<!--      <label for="value"><b>Нормирующее значение:{{this.norma_value}}{{ this.value }}%</b></label>-->
<!--      <Slider id="value" v-model="value" :min="0" :max="100" class="w-full"/>-->

<!--    </div>-->
    <div class="field">
      <Button icon="pi pi-check" iconPos="left" label="Сохранить" @click="this.store_value()" :disabled="this.submit_disabled"/>
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
// import Slider from 'primevue/slider';
// import $toast from "lodash";
import Toast from "primevue/toast";
import {isEmpty} from "lodash/lang";
// import RadioButton from "primevue/radiobutton";


export default {
  name: "EditData",
  props: ['project_id',],
  components: {Dropdown, Button, InputText, Toast},
  data() {
    return {
      // metric_values: [],
      // projects: [],
      metrics_on_period: [],
      metric_value: 0,
      selectedArea: '',
      selectedPeriod: '',
      selectedMetric: '',
      result: [],
      projectName: '',
      tree: [],
      period_disabled: true,
      metric_disabled: true,
      value_disabled: true,
      submit_disabled: true,
      value_label: '',

      show_text_value_input: false,
      show_binary_value_input: false,
      binary_values: [
        {name: 'Да', value: '1'},
        {name: 'Нет', value: '0'},
      ]
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
      return store.state.periods.filter(e => e.project_id == this.project_id);
    },
    user_areas(){
      return store.state.userAreas;
    },
    metrics(){
      return store.state.metrics.map(e => {return {...e, option_name: e.code + ' ' + e.name }});

    },
    projects(){
      return store.state.projects;
    },

  },

  watch: {
    metrics: function () {
      console.log("T: metrics watched");
      console.log("T: selected period=", this.selectedPeriod);


      this.metrics_on_period = this.metrics.filter(e => e.periods.map(x => {return x.id}).includes(this.selectedPeriod.id));
      // this.metrics_on_period = this.metrics.filter(e => e.periods.map(x => {return x.id}).includes(this.selectedPeriod));
      console.log('Metrics on period^');
      console.log(JSON.stringify(this.metrics_on_period, null, 2));
      console.log('MMMMMMMMMMMMMMMMMMMMM');
    },
    // user: function () {
    //   store.dispatch('getUserAreas',this.user.id);
    // },
    // projects: function () {
    //   this.metrics = this.projects.filter(e => e.id == this.project_id).map(e => e.metrics)[0]
    // },
    // selectedPeriod: function () {
    //   this.metrics = this.projects.filter(e => e.id == this.project_id).map(e => e.metrics)[0]
    // },
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
    areaSelected(){
      this.period_disabled = false;
    },

    periodSelected(){
      store.dispatch('getMetrics', this.project_id).then(
        // this.metrics_on_period = this.metrics.filter(e => e.periods.map(x => {return x.id}) .includes(this.selectedPeriod)),
        this.metric_disabled = false,

    )
    },

    metricSelected(){
      this.value_disabled = false;
      this.metric_value = 0;
      console.log('this.selectedMetric.is_binary^ ',this.selectedMetric.is_binary)
      if (this.selectedMetric.is_binary == 1)
      {
        this.show_binary_value_input = true
        this.show_text_value_input = false;
      }
      else {
        this.show_binary_value_input = false;
        this.show_text_value_input = true;
      }
      this.value_label = 'Введите ' + (this.selectedMetric.input_description == null ? this.selectedMetric.name : this.selectedMetric.input_description) + ':';
    },

    valueEdited(){
      this.submit_disabled = false;
    },

    store_value() {

      const bodyParameters = {
        "area_id": this.selectedArea.id,
        "metric_id": this.selectedMetric.id,
        "period_id": this.selectedPeriod.id,
        "value": this.metric_value.value == null ? this.metric_value : this.metric_value.value,
      };

      store.dispatch('storeMetricValue', bodyParameters).then(data => {
        console.log('DATA^ ',data)
        if  (!isEmpty(data.code))
          this.$toast.add({severity:'error', summary: 'Ошибка добавления данных', detail: data.message, life: 4000});
        else
          if  (!isEmpty(data.data))
            this.$toast.add({severity:'error', summary: 'Ошибка добавления данных', detail: {...data.data.errors, error: data.data.message}, life: 4000});
          else{
            this.$toast.add({severity: 'success', summary: 'Данные добавлены', detail: data, life: 4000});
            this.period_disabled = true;
            this.metric_disabled = true;
            this.value_disabled = true;
            this.show_binary_value_input = false;
            this.show_text_value_input = false;
            this.selectedArea = '';
            this.selectedPeriod = '';
            this.selectedMetric = '';
          }

      })




    }
  }

}


</script>

<style scoped>


</style>