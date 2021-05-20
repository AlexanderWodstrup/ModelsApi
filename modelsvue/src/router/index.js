import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Models from "../views/CreateModel.vue";
import Managers from "../views/CreateManager.vue";
import Jobs from "../views/CreateJob.vue";
import ViewJobs from "../views/ViewJobs.vue";
import EditJob from "../components/EditJob.vue";
import AddModelToJob from "../components/AddModelToJob.vue";
import AddExpense from "../components/AddExpense.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/createmodel",
        name: "CreateModel",
        component: Models
    },
    {
        path: "/createmanager",
        name: "CreateManager",
        component: Managers
    },
    {
        path: "/createjob",
        name: "CreateJob",
        component: Jobs
    },
    {
        path: "/jobs",
        name: "Jobs",
        component: ViewJobs
    },
    {
        path: "/editjobs/:id",
        name: "EditJob",
        component: EditJob
    },
    {
        path: "/editjobs/:id/addmodel",
        name: "AddModelToJob",
        component: AddModelToJob
    },
    {
        path: "/addexpense/:id",
        name: "AddExpense",
        component: AddExpense
    }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
