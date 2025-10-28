import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Pages
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import CreateAccount from "../views/CreateAccount.vue";
import CreateTicket from "../views/CreateTicket.vue";
import Dashboard from "../views/Dashboard.vue";
import ManageTicket from "../views/ManageTicket.vue";

// Example of a "protected route" guard
function requireAuth(_to: any, _from: any, next: any) {
  const isAuthenticated = Boolean(localStorage.getItem("authToken")); // replace with your auth logic
  if (!isAuthenticated) {
    next("/login");
  } else {
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  // Public routes
  { path: "/", name: "LandingPage", component: LandingPage },
  { path: "/login", name: "Login", component: Login },
  { path: "/create-account", name: "CreateAccount", component: CreateAccount },

  // Protected routes
  {
    path: "/create-ticket",
    name: "CreateTicket",
    component: CreateTicket,
    beforeEnter: requireAuth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
  },
  {
    path: "/manage-ticket",
    name: "ManageTicket",
    component: ManageTicket,
    beforeEnter: requireAuth,
  },
  {
    path: "/edit-ticket/:id",
    name: "EditTicket",
    component: CreateTicket,
    beforeEnter: requireAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
