import { createApp } from 'vue'
import { createPinia } from 'pinia'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import App from './App.vue'
import '@/assets/main.css'
// import { createVuePlugin } from 'unplugin-vue-components/vite';
// import { createAutoImportPlugin } from 'unplugin-auto-import/vite';

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

// app.use(createVuePlugin([
//   'src/**/*.vue' 
// ]));

app.use(pinia)
// app.use(createAutoImportPlugin({
//   imports: [
//     'vue'
//   ],
// }));
// app.use(newTippy)
app.mount('#app')
