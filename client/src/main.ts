import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import queryClient from './services/queryClient.ts';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import cs from './locales/cs.json';


const app = createApp(App);

app.use(router);

app.use(VueQueryPlugin, { queryClient });

app.use(
  Vue3Toastify,
  {
    autoClose: 5000,
    hideProgressBar: true,
    transition: "slide",
    dangerouslyHTMLString: false,
    position: 'bottom-left',
    multiple: true,
    limit: 3,
    newestOnTop: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true
  } as ToastContainerOptions
);

app.use(createI18n({
  locale: 'cs',
  messages: {
    en,
    cs
  },
}))

app.mount('#app');

// app.config.errorHandler = (err, vm, info) => {
//
// }
