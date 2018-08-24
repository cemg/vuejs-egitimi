// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import './firebase'

window.toastr = require('toastr');
toastr.options = {
    preventDuplicates: true,
    showDuration: 500,
    positionClass: 'toast-top-right'
}

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
      /* eslint-disable no-new */
      app = new Vue({
          el: '#app',
          router,
          components: { App },
          template: '<App/>'
      })
  }
})
