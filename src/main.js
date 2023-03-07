import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import './assets/all.scss'
import 'bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App)

app.use(VueAxios, axios)
app.component('VueLoading', Loading);
app.use(createPinia())
app.use(router)

app.mount('#app')
