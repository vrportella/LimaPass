import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apellido: "",
    celular: "",
    dni: "",
    email: "",
    enabled: "",
    nacimiento: "",
    nombre: "",
    role: "",
    uid: "",
  },
  mutations: {
    mutateApellido: function(state, payload) {
        state.apellido = payload;
    },
    mutateCelular: function(state, payload) {
        state.celular = payload;
    },
    mutateDni: function(state, payload) {
        state.dni = payload;
    },
    mutateEmail: function(state, payload) {
        state.email = payload;
    },
    mutateEnable: function(state, payload) {
        state.enabled = payload;
    },
    mutateNacimiento: function(state, payload) {
        state.nacimiento = payload;
    },
    mutateNombre: function(state, payload) {
        state.nombre = payload;
    },
    mutateRole: function(state, payload) {
        state.role = payload;
    },
    mutateUID: function(state, payload) {
        state.uid = payload;
    }
  },
  actions: {},
  modules: {}
});
