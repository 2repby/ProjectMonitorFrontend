<template>
  <Dialog v-model:visible="this.DV" :closable="true" :closeOnEscape="false"
           :maximizable="true" :modal="true" :style="{width: '50vw'}" @show="this.showParameterDialog()" @hide="this.closeDialog()">
    <template #header>
      <div class="card">

          <h3>{{ this.project.name }}</h3>

      </div>
    </template>

    <div>
      <div class="card">
        <h5>100 %</h5>
        <Chart :data="basicData" :options="basicOptions" type="bar"/>
      </div>

    </div>

    <template #footer>
      <Button icon="pi pi-check" label="Закрыть" @click="closeDialog"/>
    </template>
  </Dialog>

  <Dialog v-model:visible="this.DV2" v-model:closable="this.parameterDialogClosable" :closeOnEscape="false"
          :maximizable="true" :modal="true" >
    <template #header>
      <div>
        <h3>Выберите параметры графика</h3>
      </div>
    </template>

    <div class="card col-8 col-offset-2">
          <div class="field">
            <label for="area">Город (район)</label>
            <Dropdown id="area" v-model="selectedArea" :options="areas" panelClass="col-2"
                      optionLabel="name" placeholder="Выберите город (район)"  />
          </div>
          <div class="field">
            <label for="metric">Показатель проекта</label>
            <Dropdown id="metric" v-model="selectedMetric" :options="metrics.map((e) => { return {...e, sname: e.name.slice(0,40)}})" panelClass="col-2"
                      optionLabel="sname" placeholder="Выберите метрику проекта"  />
          </div>
    </div>


















  </Dialog>

</template>

<script>

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Chart from "primevue/chart";
import Dropdown from "primevue/dropdown";
// import AreaService from "@/services/areas";
import store from "@/state";
// import areas from "@/services/areas";

export default {
  name: "ProjectChart",
  components: {Dialog, Button, Chart, Dropdown},
  props: ['dialogVisible', 'project'],

  data() {
    return {
      DV: false,
      DV2: false,
      parameterDialogClosable: false,
      selectedArea: '',
      selectedMetric: '',
      metrics: [],
      basicData: {
        labels: [],
        datasets: [
          {
            label: 'Выберите гоорд (район) и метрику',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
        ]
      },
      basicOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      },

    }
  },
  mounted() {
    // AreaService.getAreas().then(data => this.areas = data );

  },



  methods: {

    showParameterDialog()
    {
      this.DV2 = true;
    },

    closeDialog() {
      this.selectedArea = '',
      this.selectedMetric = '',
          this.basicData =  {
        labels: [],
            datasets: [          {
              label: '',
              backgroundColor: '#42A5F5',
              data: []
            },]
      },
      this.DV = false;
    },
    draw()
    {
      if (this.selectedArea && this.selectedMetric) {
        this.DV2 = false;
        this.basicData.datasets[0].label = this.selectedArea.name + ' - ' + this.selectedMetric.name.slice(0,100);
        // console.log(this.areas[this.selectedArea] + this.metrics[this.selectedMetric]);
        // console.log(this.selectedArea.name + '===' + this.selectedMetric.name);
        // console.log('РИСУЕМ ГРАФИК ПО ЭТИМ ЗНАЧЕНИЯМ:::::: ');
        // console.log(JSON.stringify(this.projectWithMetricValues, null, 2));
        // console.log('РИСУЕМ ГРАФИК ПО ЭТИМ ЗНАЧЕНИЯМ  ^^^^^^^');
        this.basicData.labels = this.projectWithMetricValues.metrics.filter(e => e.id == this.selectedMetric.id)[0].metric_values.filter(e => e.area_id == this.selectedArea.id)
            .map(e => this.periods.filter(x => x.id == e.period_id)[0].name);
        this.basicData.datasets[0].data = this.projectWithMetricValues.metrics.filter(e => e.id == this.selectedMetric.id)[0].metric_values.filter(e => e.area_id == this.selectedArea.id)
            .map(e => e.value * 100);

        console.log('Значение:::::::::: ');
        console.log(JSON.stringify( this.basicData.data), null, 2);
        console.log('Значения  ^^^^^^^');
      }
    },
  },
  computed:{
    projectWithMetricValues() {
      console.log('projectsWithMetricValues COMPUTED')
      return store.state.projectsWithMetricValues;
    },
    periods() {
      console.log('periods COMPUTED')
      return store.state.periods;
    },
    areas() {
      console.log('areas COMPUTED')
      return store.state.areas;
    },
  },
  watch: {

    project: function () {
      console.log('PROJECT WATCHED');
      this.metrics = this.project.metrics;
      console.log('THI ID OF THE PROJECT=',this.project.id);
      store.dispatch('getProjectWithMetricValues', this.project.id);

    },


    selectedMetric: function (){
      // console.log(this.selectedMetric)
      this.draw();
    },

    selectedArea: function (){
      // console.log(this.selectedArea);
      this.draw();
    },

    dialogVisible: function () {
      this.DV = true;
      console.log('watched');
    },
  },
};

</script>

<style scoped>

</style>