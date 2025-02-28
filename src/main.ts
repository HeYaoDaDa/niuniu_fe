import './styles/app.scss'
import messages from '@/i18n';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

const app = createApp(App)

app.use(createPinia())

const i18n = createI18n({
    locale: 'en-US',
    // locale: 'zh-CN',
    legacy: false,
    messages
})
app.use(router)
app.use(i18n)

app.mount('#app')
