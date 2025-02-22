//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import VDateInput from 'vuetify/labs/VDateInput'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './styles/main.scss'

import App from './App.vue'
import router from './router'

import axios from 'axios'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  components: {
    VDateInput,
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(axios)

app.mount('#app')
