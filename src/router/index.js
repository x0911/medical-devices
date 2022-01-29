import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/index.vue";
import ControlPanel from "../views/control-panel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/control-panel",
    name: "ControlPanel",
    component: ControlPanel,
  },
  {
    path: "/:id?",
    name: "index",
    component: LandingPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
