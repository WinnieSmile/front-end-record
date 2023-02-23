import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routers/index"
import { createPinia } from "pinia"

import 'virtual:svg-icons-register'
// 导入 svgIcon
// import SvgIcon from './components/SvgIcon.vue';
import SvgIcon from './components/SvgIcon/index.vue';

const app = createApp(App)
app.component('svg-icon', SvgIcon);
app.use(router)
app.use(createPinia())
app.mount('#app')

