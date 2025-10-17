//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { es } from 'vuetify/locale'
import * as labsComponents from 'vuetify/labs/components'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './styles/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  locale: {
    locale: 'es-MX',
    fallback: 'es',
    messages: { es, 'es-MX': es },
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
