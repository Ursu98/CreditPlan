import { createApp } from "vue";
import App from "./App.vue";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import "./assets/main.css";

createApp(App).mount("#app");

const app = createApp(App);

app.component('Datepicker', Datepicker);

app.mount('#app');

