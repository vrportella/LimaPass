import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    apellido: "",
    correo: "",
    dni: "",
    id: "",
    nombre: "",
    numero: "",
  },
  mutations: {
    setUser: function(state, payload) {
        state.user = payload
    },
    mutateApellido: function(state, payload) {
        state.apellido = payload;
    },
    mutateCorreo: function(state, payload) {
        state.correo = payload;
    },
    mutateDni: function(state, payload) {
        state.dni = payload;
    },
    mutateId: function(state, payload) {
        state.id = payload;
    },
    mutateNombre: function(state, payload) {
        state.nombre = payload;
    },
    mutateNumero: function(state, payload) {
        state.numero = payload;
    },
  },
  actions: {
    updateApellidoAction: function({ commit }, payload) {
        commit("mutateApellido", payload);
    },
    updateCorreoAction: function({ commit }, payload) {
        commit("mutateCorreo", payload);
    },
    updateDniAction: function({ commit }, payload) {
        commit("mutateDni", payload);
    },
    updateIdAction: function({ commit }, payload) {
        commit("mutateId", payload);
    },
    updateNombreAction: function({ commit }, payload) {
        commit("mutateNombre", payload);
    },
    updateNumeroAction: function({ commit }, payload) {
        commit("mutateNumero", payload);
    },
  },
});
