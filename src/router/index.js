import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Registro from "../views/auth/Registro";
import SeleccionarVerificacion from "../views/auth/SeleccionarVerificacion";
import Verificacion from "../views/auth/Verificacion";
import VerificacionRegistro from "../views/auth/VerificacionRegistro";
import Tarjetas from "../views/tarjetas/Index";
import TarjetaDetalle from "../views/tarjetas/Detalle";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    meta: { layout: "default"},
    props: true,
    component: Login
  },
  {
    path: "/registro",
    name: "registro",
    meta: { layout: "default"},
    component: Registro
  },
  {
    path: "/registro/verficacion",
    props: true,
    name: "registro-verficacion",
    meta: { layout: "default"},
    component: VerificacionRegistro
  },
  {
    path: "/seleccion-verficacion",
    name: "seleccion-verficacion",
    meta: { layout: "default"},
    component: SeleccionarVerificacion
  },
  {
    path: "/verficacion",
    props: true,
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
  {
    path: "/tarjeta-detalle",
    name: "tarjeta-detalle",
    meta: { layout: "default"},
    component: TarjetaDetalle
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
