import Vue from 'vue';
import CKEditor from 'ckeditor4-vue';
import App from './App';

Vue.use(CKEditor);
console.log(CKEditor);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
