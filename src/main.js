import { createApp } from 'vue'
import { createPinia } from 'pinia'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import App from './App.vue'
import router from '@/router/index.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import '@/assets/main.css'

NProgress.configure({ showSpinner: false, speed: 1200, trickleSpeed: 1200 });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

const app = createApp(App)

app.directive('tippy', {
  mounted(el, binding) {
    const options = typeof binding.value === 'object' ? binding.value : { content: binding.value };
    el._tippy = tippy(el, options);
  },
  updated(el, binding) {
    if (el._tippy) {
      const options = typeof binding.value === 'object' ? binding.value : { content: binding.value };
      el._tippy.setProps(options);
    }
  },
});

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast);

app.mount('#app')
