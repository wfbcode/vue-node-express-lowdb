import Vue from "vue";
import Router from "vue-router";
const login = () => import("./views/Login");
const companyList = () => import("./views/CompanyList");
const typeList = () => import("./views/TypeList");
const feedbackInfo = () => import("./views/FeedbackInfo");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/companyList",
      name: "companyList",
      component: companyList
    },
    {
      path: "/typeList",
      name: "typeList",
      component: typeList
    },
    {
      path: "/feedbackInfo",
      name: "feedbackInfo",
      component: feedbackInfo
    }
  ]
});
