import { createVuetify } from 'vuetify'
import { vuetifyDefaults } from './vuetify-defaults'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  defaults: vuetifyDefaults,
  theme: {
    defaultTheme: 'light',
  },
})
