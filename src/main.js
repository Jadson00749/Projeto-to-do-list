import { createApp } from 'vue'
import { createPinia } from 'pinia'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import App from './App.vue'
import '@/assets/main.css'
import router from '@/router/index.js'; 

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

app.mount('#app')
