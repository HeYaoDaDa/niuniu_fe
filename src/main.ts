import './styles/app.scss'
import messages from '@/i18n';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

const app = createApp(App)

const userLocale = navigator.language || 'en';
const defaultLocale = userLocale.startsWith('zh') ? 'zh' : 'en';
const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'en',
    legacy: false,
    messages
})
app.use(i18n)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)

app.use(router)

app.mount('#app')
