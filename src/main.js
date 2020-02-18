import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store'
import axiox from "axios";
axiox.defaults.baseURL = "http://47.104.88.122/api";
Vue.prototype.$axios = axiox
import "mint-ui/lib/style.css";
import "./common/stylus/index.styl";
import "./common/fonts/iconfont.css"
// fastclick.attach(document.body)
import { Button, Header, Lazyload, Swipe, SwipeItem } from "mint-ui";
Vue.use(Lazyload);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});