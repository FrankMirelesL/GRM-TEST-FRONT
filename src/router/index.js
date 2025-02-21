import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/LoginComponent.vue";
import Dashboard from "@/components/DashboardComponent.vue";
import Acerca from "@/components/AcercaComponent.vue";
import CrearCita from "@/components/CrearCita.vue";
import CitasList from "@/components/CitasList.vue";
import { getToken } from "@/services/authService";

const routes = [
  { path: "/", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/crear-cita",
    component: CrearCita,
    meta: { requiresAuth: true },
  },
  {
    path: "/lista-citas",
    component: CitasList,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    component: Acerca,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !getToken()) {
    next("/");
  } else {
    next();
  }
});

export default router;
