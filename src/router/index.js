import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Challenges from "../views/dashboard/Challenges.vue";
import Events from "../views/dashboard/Events.vue";
import Games from "../views/dashboard/Games.vue";
import Users from "../views/dashboard/Users.vue";
import Upload from "../views/dashboard/upload.vue";
import Slides from "../views/dashboard/SlidShow.vue";
import DLogin from "../views/dashboard/Login.vue";
import Profile from "../components/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: DLogin,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "challenges",
        name: "Challenges",
        component: Challenges,
        meta: { requiresAuth: true },
      },
      {
        path: "events",
        name: "Events",
        component: Events,
        meta: { requiresAuth: true },
      },
      {
        path: "games",
        name: "Games",
        component: Games,
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        name: "Users",
        component: Users,
        meta: { requiresAuth: true },
      },
      {
        path: "slides",
        name: "Slides",
        component: Slides,
        meta: { requiresAuth: true },
      },
      {
        path: "upload",
        name: "Upload",
        component: Upload,
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: "/:pathMatch(.*)", component: NotFoundComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    if (!token) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
