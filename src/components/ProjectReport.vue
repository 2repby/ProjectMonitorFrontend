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
      tree2: [
        {
          "key": "0",
          "label": "Documents",
          "data": "Documents Folder",
          "icon": "pi pi-fw pi-inbox",
          "children": [{
            "key": "0-0",
            "label": "Work",
            "data": "Work Folder",
            "icon": "pi pi-fw pi-cog",
            "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
          },
            {
              "key": "0-1",
              "label": "Home",
              "data": "Home Folder",
              "icon": "pi pi-fw pi-home",
              "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
            }]
        },
        {
          "key": "1",
          "label": "Events",
          "data": "Events Folder",
          "icon": "pi pi-fw pi-calendar",
          "children": [
            { "key": "1-0", "label": "Meeting", "icon": "pi pi-fw pi-calendar-plus", "data": "Meeting" },
            { "key": "1-1", "label": "Product Launch", "icon": "pi pi-fw pi-calendar-plus", "data": "Product Launch" },
            { "key": "1-2", "label": "Report Review", "icon": "pi pi-fw pi-calendar-plus", "data": "Report Review" }]
        },
        {
          "key": "2",
          "label": "Movies",
          "data": "Movies Folder",
          "icon": "pi pi-fw pi-star-fill",
          "children": [{
            "key": "2-0",
            "icon": "pi pi-fw pi-star-fill",
            "label": "Al Pacino",
            "data": "Pacino Movies",
            "children": [{ "key": "2-0-0", "label": "Scarface", "icon": "pi pi-fw pi-video", "data": "Scarface Movie" }, { "key": "2-0-1", "label": "Serpico", "icon": "pi pi-fw pi-video", "data": "Serpico Movie" }]
          },
            {
              "key": "2-1",
              "label": "Robert De Niro",
              "icon": "pi pi-fw pi-star-fill",
              "data": "De Niro Movies",
              "children": [{ "key": "2-1-0", "label": "Goodfellas", "icon": "pi pi-fw pi-video", "data": "Goodfellas Movie" }, { "key": "2-1-1", "label": "Untouchables", "icon": "pi pi-fw pi-video", "data": "Untouchables Movie" }]
            }]
        }
      ]


    }
  },

  mounted() {
    // MetricService.getMetricValues(this.id).then(
    //     data => {
    //       this.metric_values = data;
    //           PeriodService.getPeriods().then(data => this.periods = data)
    //     }
    // )

    AreaService.getAreas().then(
        data => {
          this.areas = data;


          PeriodService.getPeriods().then(
              data => {
                this.periods = data;
                // this.result = this.periods.filter(obj => obj.id == '11');
                // console.log('========================================')
                // console.log(this.result)
                // console.log('========================================')
                MetricService.getMetricValues(this.id).then(data => {
                      this.metric_values = data,

                          // this.tree = Object.keys(this.metric_values.metrics).
                          // map(x => JSON.parse('{"key": "'+x+'" , "label": "'+this.metric_values.metrics[x].name+'"}')),

                          this.tree = Object.keys(this.metric_values.metrics).map(x => ({
                            key: x,
                            icon: "pi pi-fw pi-chart-line",
                            label: this.metric_values.metrics[x].name,
                            // children: [{key: 0, label: 'test'}]
                            children:
                                Object.keys(_.groupBy(this.metric_values.metrics[x].metric_values, (value) => value.area_id)).map((c, key) => ({
                                  key: x + '1-' + key,
                                  area_id: c,
                                  label: this.areas.filter(element => element.id == c)[0].name,
                                  icon: "pi pi-fw pi-map-marker",
                                  children:
                                      this.metric_values.metrics[x].metric_values.filter(element => element.area_id == c).map(x => ({
                                        label: this.periods.filter(e => e.id == x.period_id)[0].name+':  '+x.value,
                                        icon: "pi pi-fw pi-calendar",
                                      })),




                                })),


                            // Object.keys(this.metric_values.metrics[x].metric_values).map(y => ({
                            //   key: y,
                            //   icon: "pi pi-fw pi-map-marker",
                            //   // label: "test",
                            //   label: this.metric_values.metrics[x].metric_values[y].area.name,
                            // })),
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