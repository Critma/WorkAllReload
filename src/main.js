import '@/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Loader from '@/components/global/Loader.vue'
import App from './App.vue'
import router from '@/router/router.js'
import Error from '@/components/global/Error.vue';
import Success from '@/components/global/Success.vue';

const app = createApp(App)
const pinia = createPinia()

installGlobalComponents(app);
app.use(pinia)
app.use(router)

function installGlobalComponents(app) {
    app.component('Loader', Loader)
    app.component('Error', Error)
    app.component('Success', Success)
}


app.mount('#app')