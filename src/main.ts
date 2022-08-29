import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import loading from './loading/loading';

const app = createApp(App)
app.directive('loading', loading)
    app.mount('#app')
