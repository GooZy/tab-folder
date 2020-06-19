import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
  Row, Col, Option, Select, Message
} from 'element-ui';

[Row, Col, Option, Select].forEach((c) => Vue.use(c));

Vue.prototype.$message = Message;

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
