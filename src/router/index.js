import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Registro from "../views/auth/Registro";
import SeleccionarVerificacion from "../views/auth/SeleccionarVerificacion";
import Verificacion from "../views/auth/Verificacion";
import Tarjetas from "../views/tarjetas/Index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    meta: { layout: "default"},
    component: Login
  },
  {
    path: "/registro",
    name: "registro",
    meta: { layout: "default"},
    component: Registro
  },
  {
    path: "/seleccion-verficacion",
    name: "seleccion-verficacion",
    meta: { layout: "default"},
    component: SeleccionarVerificacion
  },
  {
    path: "/verficacion",
    name: "verficacion",
    meta: { layout: "default"},
    component: Verificacion
  },
  {
    path: "/tarjetas",
    name: "tarjetas",
    meta: { layout: "default"},
    component: Tarjetas
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
