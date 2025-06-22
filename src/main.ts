import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'

import 'primeicons/primeicons.css'

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount('#app')