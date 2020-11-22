import Vue from 'vue';
import {
  MdButton,
  MdCard,
  MdContent,
  MdEmptyState,
  MdField,
  MdIcon,
  MdRipple,
  MdTable,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './firebase/firebase';

Vue.config.productionTip = false;
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTable);
Vue.use(MdRipple);
Vue.use(MdEmptyState);
Vue.use(MdIcon);
Vue.use(VueToast);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
