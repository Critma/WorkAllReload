import '@/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loader from '@/components/global/Loader.vue'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.component('Loader', Loader)
app.use(pinia)
// app.use(router)

app.mount('#app')

export {pinia};