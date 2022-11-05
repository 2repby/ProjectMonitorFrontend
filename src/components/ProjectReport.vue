<template>
  <Panel>
    <template #header>
      <h2> {{ this.metric_values.name }}</h2>

    </template>
    {{ this.metric_values.description }}
  </Panel>

  <Tree :value="this.tree"></Tree>



  <div class="col-12 md:col-6">
    <div class="card">
      <div v-for="(item) in metric_values.metrics" :key="item.id" style="margin: 10px">
      <Accordion>


        <AccordionTab :header="item.code+'  '+ item.name">
          <div v-for="(value) in item.metric_values" :key="value.id" style="margin: 10px">
            <p>{{value.area.name}} - {{periods.filter(element => element.id == value.period_id)[0].name }} - {{value.value}} </p>
          </div>
        </AccordionTab>



      </Accordion>
      </div>
    </div>
  </div>


</template>

<script>
import PeriodService from '../services/periods';
import MetricService from '../services/metrics';
import AreaService from '../services/areas';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Panel from "primevue/panel";
// import {groupBy} from "lodash";
import _ from "lodash";
// import DataTable from "primevue/datatable";
// import Column from "primevue/column";
import Tree from "primevue/tree";
// import Card from 'primevue/card';
// import Button from "primevue/button";
// import groupBy from "lodash";

export default {
  props: ['id', 'projectReport'],
  name: "ProjectReport",
  components: {Accordion, AccordionTab, Panel, Tree},
  data() {
    return {
      metric_values: [],
      periods: [],
      areas: [],
      result: [],
      projectName: '',
      tree: [],
    }
  },
  mounted() {
    // MetricService.getMetricValues(this.id).then(
    //     data => {
    //       this.metric_values = data;
    //           PeriodService.getPeriods().then(data => this.periods = data)
    //     }
    // )

    AreaService.getAreas().then(data =>
        {
          this.areas = data;
          PeriodService.getPeriods().then(data => {
                this.periods = data;
                MetricService.getMetricValues(this.id).then(data => {
                      this.metric_values = data,
                      console.log('*************************'),
                      console.log(JSON.stringify(this.metric_values, null, 2)),
                      console.log('**************************')
                        // this.tree = Object.keys(this.metric_values.metrics).
                        // map(x => JSON.parse('{"key": "'+x+'" , "label": "'+this.metric_values.metrics[x].name+'"}')),
                      this.tree = Object.keys(this.metric_values.metrics).map(x => ({
                        key: x,
                        icon: "pi pi-fw pi-chart-line",
                        label: this.metric_values.metrics[x].name,
                        // children: [{key: 0, label: 'test'}]
                        children:
                            Object.keys(_.groupBy(this.metric_values.metrics[x].metric_values, (value) => value.area_id)).map((c, key) => ({
                              key: x + '-' + key,
                              area_id: c,
                              label: this.areas.filter(element => element.id == c)[0].name,
                              icon: "pi pi-fw pi-map-marker",
                              children:
                                  this.metric_values.metrics[x].metric_values.filter(element => element.area_id == c).map((y, key2) => ({
                                    key: x + '-' + key + '-' + key2,
                                    label: this.periods.filter(e => e.id == y.period_id)[0].name+':  '+y.value,
                                    icon: "pi pi-fw pi-calendar",
                                  })),
                            })),
                      })),
                          console.log('----------------'),
                          console.log(JSON.stringify(this.tree, null, 2)),
                          console.log('-----------------')
                    },
                )

              }
          )

        }
    )


    // console.log(this.metric_values)

    // const metrics = await MetricService.getMetricValues(this.id);
    // this.metrics = metrics;
    // const periods = await PeriodService.getPeriods();
    console.log(this.periods)
    console.log(this.tree2)







  },
  methods: {

    viewMetricsDialog(name, id) {
      this.metricsDialogVisible = !this.metricsDialogVisible;
      this.projectName = name;
      this.currentProjectID = id;
      console.log(name, id)
    },

  },
}
</script>
<style>
.layout{
  margin: 10px;
}
</style>