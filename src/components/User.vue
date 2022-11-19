<template>
  <Dialog v-model:visible="this.DV" :closable="true" :closeOnEscape="true"

          :header="this.user_action=='create' ? 'Создание пользователя' : 'Редактирование пользователя'"
          :maximizable="true" :modal="true" :style="{width: '50vw'}">

    <!--    :contentStyle="{height: '500px'}"-->
    <form class="p-fluid">

      <div class="field">
        <label for="lastname">Фамилия*
          <div v-if="v$.lastname.$error">
            <span v-for="(error, index) of v$.lastname.$errors" id="email-error" :key="index">
              <small class="p-error">{{ error.$message }}</small></span>
          </div>
        </label>
        <InputText id="lastname" v-model="lastname" :class="{ 'p-invalid': v$.lastname.$error }" class="w-full"
                   placeholder="Введите фамилию" type="text"/>
      </div>

      <div class="field">
        <label for="firstname">Имя*
          <div v-if="v$.firstname.$error">
            <span v-for="(error, index) of v$.firstname.$errors" id="email-error" :key="index">
              <small class="p-error">{{ error.$message }}</small></span>
          </div>
        </label>
        <InputText id="firstname" v-model="firstname" :class="{ 'p-invalid': v$.firstname.$error }" class="w-full"
                   placeholder="Введите имя" type="text"/>
      </div>

      <div class="field">
        <label for="surname">Отчество</label>
        <InputText id="surname" v-model="surname" class="w-full" placeholder="Введите отчество" type="text"/>
      </div>

      <div class="field ">
        <label for="email">e-mail*

          <div v-if="v$.email.$error">
            <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
              <small class="p-error">{{ error.$message }}</small></span>
          </div>

        </label>
        <div class="p-input-icon-right">
          <i class="pi pi-envelope"/>
          <InputText id="email" v-model="email" :class="{ 'p-invalid': v$.password.$error }"
                     placeholder="Введите e-mail" type="text"/>
        </div>
      </div>


      <div class="field">
        <label for="password">Пароль*
          <div v-if="v$.password.$error">
        <span v-for="(error, index) of v$.password.$errors" id="password-error" :key="index">
                            <small class="p-error">{{ error.$message }}</small></span>
          </div>
        </label>
        <Password id="password" v-model="password" :class="{ 'p-invalid': v$.password.$error }" :feedback='false'
                  :toggleMask="true" placeholder="Введите пароль (не менее 6 символов)" type="text"/>
      </div>


      <div class="field">
        <label for="phone">Телефон*
          <div v-if="v$.phone.$error">
        <span v-for="(error, index) of v$.phone.$errors" id="phone-error" :key="index">
                            <small class="p-error">{{ error.$message }}</small></span>
          </div>
        </label>
        <InputMask id="phone" v-model="phone" :class="{ 'p-invalid': v$.phone.$error }" mask="+7(999)999-99-99"
                   placeholder="Введите номер в формате (XXX)XXX-XX-XX" type="text"/>
      </div>

      <div class="field">
        <label for="areas">Уполномочен от муниципальных образований</label><br>
        <MultiSelect id="areas" v-model="selectedAreas" :options="areas" optionLabel="name"
                     placeholder="Выберите город (район)">
        </MultiSelect>
      </div>
    </form>

    <template #footer>
      <Button class="p-button-info" icon="pi pi-times" label="Отмена" @click="closeDialog"/>
      <Button class="p-button-success" icon="pi pi-check" label="Сохранить" type="submit" @click="saveUser()"/>
    </template>
  </Dialog>
</template>

<script>

// import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import store from "@/state";
import MultiSelect from "primevue/multiselect";
import InputMask from 'primevue/inputmask';
import Password from "primevue/password";
import {email, required, helpers, minLength} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {isEmpty} from "lodash/lang";
// import router from "@/router";

export default {
  name: "Edit-user",
  components: {Button, Dialog, InputText, MultiSelect, InputMask, Password},
  props: ['user_action', 'dialogVisible', 'user'],
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      DV: false,
      firstname: '',
      lastname: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      selectedAreas: [],
    }

  },
  validations() {
    return {
      lastname: {required: helpers.withMessage('Поле явялется обязательным', required),},
      firstname: {required: helpers.withMessage('Поле явялется обязательным', required),},
      email: {
        required: helpers.withMessage('Поле явялется обязательным', required),
        email: helpers.withMessage('Некорректный e-mail', email),
      },
      password: {
        required: helpers.withMessage('Поле явялется обязательным', required),
        minLength: helpers.withMessage(
            ({
               // $invalid,
               $params,
               // $model
             }) => `Минимальная длина пароля - ${$params.min} символов`,
            minLength(6)
        )

      },
      phone: {required: helpers.withMessage('Поле явялется обязательным', required),},
    }
  },
  watch: {
    dialogVisible: function () {
      this.DV = true;
      console.log('this.user_action= ', this.user_action);
      this.resetForm();
      if (this.user_action == "edit"){
        this.loadUser();
      }

    },
  },
  methods: {
    closeDialog() {

      this.DV = false;


    },
    resetForm() {
      this.lastname = '';
      this.firstname = '';
      this.surname = '';
      this.email = '';
      this.password = '';
      this.phone = '';
      this.selectedAreas = [];


    },

    loadUser(){
      console.log('this.user= ', this.user);
      this.lastname = this.user.lastname;
      this.firstname = this.user.firstname;
      this.surname = this.user.surname;
      this.email = this.user.email;
      this.password = this.user.password;
      this.phone = this.user.phone;
      this.selectedAreas = this.user.areas.map(e => {
            return {name: e.name, value: e.id}});
      // this.selectedAreas = [1, 2, 3, 4]
          console.log('this.selectedAreas= ',  this.selectedAreas);
    },

    async saveUser() {
      const isFormCorrect = await this.v$.$validate()
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return
      const bodyParameters = {
        "lastname": this.lastname,
        "firstname": this.firstname,
        "surname": this.surname,
        'email': this.email,
        'password': this.password,
        "phone": this.phone,
      };

      // const result = store.dispatch('storeMetricValue', bodyParameters);
      store.dispatch('storeUser', bodyParameters).then(data => {
        console.log('DATA^ ', data)
        if (!isEmpty(data.code))
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка добавления пользователя',
            detail: data.message,
            life: 4000
          });
        else if (!isEmpty(data.data))
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка добавления пользователя',
            detail: {...data.data.errors, error: data.data.message},
            life: 4000
          });
        else {
          this.$toast.add({severity: 'success', summary: 'Пользователь добавлен', detail: data, life: 4000});
          if (!isEmpty(this.selectedAreas)){
            const bodyParameters = {
              "id_areas": this.selectedAreas.map(e => {return e.value}).join(','),
            };
            store.dispatch('storeUserAreas', [data.user.id, bodyParameters] ).then(data => {
              console.log('DATA^ ', data)
              if (!isEmpty(data.code))
                this.$toast.add({
                  severity: 'error',
                  summary: 'Ошибка добавления городов/районов пользователю',
                  detail: data.message,
                  life: 4000
                });
              else if (!isEmpty(data.data))
                this.$toast.add({
                  severity: 'error',
                  summary: 'Ошибка добавления городов/районов пользователю',
                  detail: {...data.data.errors, error: data.data.message},
                  life: 4000
                });
              else{
                this.$toast.add({
                  severity: 'success',
                  summary: 'Города/районы добавлены уполномоченному пользователю',
                  detail: data,
                  life: 4000
                });

              }

            })
          }
          this.resetForm();
          this.v$.$reset();
          this.closeDialog();
          store.dispatch('getUsers');

        }

      })

    },
  },


  computed:
      {
        areas() {
          console.log('areas COMPUTED')
          return store.state.areas.map(e => {
            return {name: e.name, value: e.id}
          });
        },
      },

}
</script>

<style scoped>

</style>