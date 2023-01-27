<template>
    <div class="card col-8 col-offset-2">
    <h3>Выберите параметры для работы с данными</h3>
    <div class="field">
      <label for="area">Проект</label>
      <Dropdown id="area" v-model="selectedProject" :options="projects" class="w-full" @change="this.projectSelected()"
                optionLabel="name" placeholder="Выберите проект"/>
    </div>

    <div class="field">
      <label for="period">Отчетный период</label>
      <Dropdown id="period" v-model="selectedPeriod" :options="periods" class="w-full" :disabled="this.period_disabled" @change="this.periodSelected()"
                optionLabel="name" placeholder="Выберите отчетный период"/>
    </div>

      <Accordion :multiple="true" v-if="this.data_visible">
        <AccordionTab  v-for="(item) in user_areas" :key="item.id" style="margin: 10px" :header= "item.name" >
          <Panel v-for="item2 in this.metric_forms" :key="item2.id" style="margin: 10px">
            <template #header>
              <div v-if="!!item2.is_norma">
                <b>{{item2.code}} {{item2.name}}</b><br>(является нормирующим значением для других метрик)
              </div>
              <div v-else>
                <b>{{item2.code}} {{item2.name}}</b><br>
                <div v-if="!!!item2.is_binary">
                  <u>Нормирующий показатель:</u> {{this.metrics.find(e => e.id == item2.norma_metric_id)?.code + ' ' + this.metrics.find(e => e.id == item2.norma_metric_id)?.name}}
                </div>
                <u>Вводимое значение:</u> {{item2.input_description}}
              </div>
            </template>
            <div v-if="!!!item2.is_binary">
            Значение: <b>{{item2.metric_values.filter(e => e.area_id == item.id)[0] ? item2.metric_values.filter(e => e.area_id == item.id)[0].value : 'ОТСУТСТВУЕТ'}}</b>
              <div v-if="!!!item2.is_norma">
                Нормирующее значение: <b>{{item2.metric_values.filter(e => e.area_id == item.id)[0] ? item2.metric_values.filter(e => e.area_id == item.id)[0].norma_value : 'ОТСУТСТВУЕТ'}}</b><br>
                Результирующее значение:
                <b>{{item2.metric_values.filter(e => e.area_id == item.id)[0] ? (item2.metric_values.filter(e => e.area_id == item.id)[0].value / item2.metric_values.filter(e => e.area_id == item.id)[0].norma_value * 100).toFixed(2) + '%' :'РАСЧЕТ НЕВОЗМОЖЕН'}} </b>
             </div>
            </div>
            <div v-else>
              Значение:
              <b>
                <div v-if="!!parseInt(item2.metric_values.filter(e => e.area_id == item.id)[0].value)">Да</div>
                <div v-else>Нет</div>
              </b>
            </div>
            <div class="mx-1 my-1">


              <Button icon="pi pi-pencil" label="Редактировать" class="p-button-outlined" style="width: 200px"
                      @click="editValue(
                                    item.id,
                                    item.name,
                                    selectedPeriod.id,
                                    item2.id,
                                    item2.name,
                                    item2.input_description,
                                    item2.metric_values.filter(e => e.area_id == item.id)[0] ? item2.metric_values.filter(e => e.area_id == item.id)[0].value : ''
                                )"/>
            </div>

          </Panel>
        </AccordionTab>

      </Accordion>




  </div>
  <Dialog v-model:visible="this.dialog_visible" :closable="true" :closeOnEscape="true"
          :contentStyle="{height: '400px'}"
          :header="'Ввод значения метрики'" :maximizable="true" :modal="true" :style="{width: '60vw'}">
    <div>
    <b>Проект: </b> {{this.selectedProject.name}}
    </div>
    <div>
      <b>Период: </b> {{this.selectedPeriod.name}}
    </div>
    <div>
      <b>Муниципальное образование: </b> {{this.selectedAreaName}}
    </div>
    <div>
      <b>Метрика: </b> {{this.selectedMetricName}}
    </div>
    <div>
      <b>Вводимое значение: </b> {{this.selectedMetricInputDescription ? this.selectedMetricInputDescription : this.selectedMetricName}}
    </div>
    <div>
      <b>Предыдущее значение: </b> {{this.oldValue}}
    </div>
    <div class="field">
      <label for="value">Введите {{this.selectedMetricInputDescription ? this.selectedMetricInputDescription : this.selectedMetricName}}</label>
      <InputNumber id="value" v-model="newValue" placeholder="Введите значение метрики" @change="this.valueEdited()"/>
    </div>



    <template #footer>
      <Button icon="pi pi-check" iconPos="left" label="Сохранить" @click="this.store_value()" :disabled="this.submit_disabled"/>
      <Button icon="pi pi-check" label="Закрыть" @click="closeDialog"/>
    </template>

  </Dialog>
  <Toast position="bottom-right"/>
</template>

<script>
import store from "@/state";
import Dropdown from "primevue/dropdown";
// import Button from "primevue/button";
// import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
// import Card from "primevue/card";
import Panel from "primevue/panel";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import {isEmpty} from "lodash/lang";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

export default {
  name: "UserCabinet",
  components: {Dropdown, Toast, Panel, Dialog, Button, InputNumber, Accordion, AccordionTab},
  data() {
    return {
      period_disabled: true,
      data_visible: false,
      selectedProject: '',
      selectedPeriod: '',
      selectedAreaName: '',
      selectedMetricName: '',
      selectedMetricInputDescription: '',
      oldValue: '',
      newValue: '',
      // metric_forms: [],
      dialog_visible: false,
      submit_disabled: false,
    }
  },
  computed: {

    projects() {
      return store.state.projects;
    },
    periods() {
      console.log('periods COMPUTED')
      return store.state.periods.filter(e => e.project_id == this.selectedProject.id);
    },
    user_areas() {
      return store.state.userAreas;
    },
    metrics() {

      return store.state.metrics.filter(e => e.periods.map(x => {
        return x.id
      }).includes(this.selectedPeriod.id));

    },
    metric_values() {
      return store.state.metricValues;
    },

    metric_forms() {
      const result = this.metrics.map(e => {
        return {
          ...e,
          metric_values: this.metric_values.filter(x => x.id == e.id)[0].metric_values.filter(y => y.period_id == this.selectedPeriod.id),
        }
      })
      console.log('--------------metric_forms:------------------ ');
      console.log(result);
      return result;
    }


  },

  // watch: {
  //
  //   metric_values: function () {
  //     // alert();
  //     this.metric_forms = this.metrics.map(e => {
  //         return {
  //                 ...e,
  //                 metric_values: this.metric_values.filter(x => x.id == e.id)[0].metric_values.filter(y => y.period_id == this.selectedPeriod.id),
  //         }
  //       })
  //     console.log('--------------metric_forms:------------------ ');
  //     console.log(JSON.stringify(this.metric_forms, null, 2));
  //   }
  // },

  methods: {
    projectSelected() {
      this.period_disabled = false;
      this.data_visible = false;
    },
    periodSelected() {
      store.dispatch('getMetrics', this.selectedProject.id)
          .then(() => {
            store.dispatch('getMetricValues', this.selectedProject.id)
                .then(()=>{
                  this.data_visible = true;
                  console.log('--------------metrics:------------------ ');
                  console.log(JSON.stringify(this.metrics, null, 2));
                  console.log('--------------metric_values:------------------ ');
                  console.log(JSON.stringify(this.metric_values, null, 2));
          })

          }
          )
    },
    editValue(area_id, area_name, period_id, metric_id, metric_name, input_description, old_value){
      console.log(area_id, period_id, metric_id, old_value);
      this.dialog_visible = true;
      this.selectedAreaId = area_id;
      this.selectedAreaName = area_name;
      this.selectedMetricId = metric_id;
      this.selectedMetricName = metric_name;
      this.oldValue = old_value;
      this.newValue = old_value;
      this.selectedMetricInputDescription = input_description;
    },
    closeDialog() {
      this.dialog_visible = false;
    },
    valueEdited(){
      // if (this.newValue > 0)
        this.submit_disabled = false;

    },

    store_value() {
      const bodyParameters = {
        "area_id": this.selectedAreaId,
        "metric_id": this.selectedMetricId,
        "period_id": this.selectedPeriod.id,
        "value": this.newValue,
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
          store.dispatch('getMetricValues', this.selectedProject.id);
          this.closeDialog();


        }
      })
    }
  },
}
</script>

<style scoped>

</style>