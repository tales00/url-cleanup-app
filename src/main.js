import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//css
import '@/scss/water-light.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import '@/scss/base.scss';

createApp(App).use(store).use(router).mount('#app');
