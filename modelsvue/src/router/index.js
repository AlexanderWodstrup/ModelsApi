import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Models from "../views/CreateModel.vue";
import About from "../views/About.vue";
import Managers from "../views/CreateManager.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //  import(/* webpackChunkName: "about" */ "../views/About.vue")
    //},
    {
        path: "/createmodel",
        name: "CreateModel",
        component: Models
    },
    {
        path: "/createmanager",
        name: "CreateManager",
        component: Managers
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
