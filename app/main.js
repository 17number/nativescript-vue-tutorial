import Vue from 'nativescript-vue'
import App from './components/App'
import router from './router'

import VueDevtools from 'nativescript-vue-devtools'
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

const appSettings = require('tns-core-modules/application-settings');
import firebase from 'nativescript-plugin-firebase';

// プッシュ通知用トークンの更新
const onPushTokenReceived = token => {
  if (!token) {
    console.error(`token is undefined or null: ${token}`);
    return;
  }
  console.log({token});
  appSettings.setString("fcm_token", token);
};

const onMessageReceived = message => {
  console.log({message});
};

// Firebase プラグイン 初期化
firebase.init({
  onPushTokenReceivedCallback: onPushTokenReceived,
  onMessageReceivedCallback: onMessageReceived,
})
  .then(
    () => console.log("firebase.init success"),
    (error) => console.error(`firebase.init error: ${error}`)
  );

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  router,
  render: h => h('frame', [h(App)])
}).$start()
