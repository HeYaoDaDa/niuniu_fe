import './styles/app.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import i18n from '@/i18n';

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)

app.use(router)

app.use(FloatingVue)

app.use(i18n)

app.mount('#app')
