import '@/shared/styles/base.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { i18n } from '@/shared/i18n'

import App from './App.vue'
import { setupHttpAuth } from './plugins/http-auth'
import { queryClient } from './plugins/vue-query'
import { router } from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.use(VueQueryPlugin, { queryClient })
setupHttpAuth(pinia)
app.use(router)

app.mount('#app')
