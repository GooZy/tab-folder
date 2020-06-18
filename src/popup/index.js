import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
  Card, Button, Tooltip, Container, Aside, Footer, Header
} from 'element-ui';

[Card, Button, Tooltip, Container, Aside, Footer, Header].forEach((c) => Vue.use(c));

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
