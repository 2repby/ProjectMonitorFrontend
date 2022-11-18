// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')

import { createApp } from 'vue'
import axios from 'axios';
import router from './router.js'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ToastService from 'primevue/toastservice';
import '@vuelidate/core'
import '@vuelidate/validators'
import ConfirmationService from 'primevue/confirmationservice';


import store from './state.js';

const myApp = createApp(App);
window.axios = axios;
myApp.use(store)
myApp.use(router)
myApp.use(PrimeVue)
myApp.use(ToastService);
myApp.use(PrimeVue, { ripple: true })
myApp.use(ConfirmationService);
myApp.mount('#app');
