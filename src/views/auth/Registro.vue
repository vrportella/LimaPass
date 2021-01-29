<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="light" align="center">
      <b-navbar-brand href="/"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>REGISTRO</h6> 
    </b-navbar>
    <b-container class="registro_container py-5">
      <!-- <img class="logo" src="@/assets/img/logo.png" /> -->
      <b-alert show variant="danger" v-if="error">{{error_msg}}</b-alert>
      <b-form v-on:submit.prevent="registro">
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Nombre:"
            required
            v-model="nombre"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Apellido:"
            required
            v-model="apellido"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="DNI"
            required
            v-model="dni"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="01-03-1999"
            required
            v-model="fec_nac"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="correo@gmail.com"
            required
            v-model="email"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Número de cel."
            required
            v-model="celular"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mt-5">
          <b-button block  variant="outline-light" type="submit">REGISTRARME</b-button>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        nombre: "",
        apellido: "",
        dni: "",
        fec_nac: "",
        email: "",
        celular: "",
        error: false,
        error_msg: false,
        loading: false
      }
    },
    methods: {
      registro() {
        this.loading = true;
        let json = {
          "nombre": this.nombre,
          "apellido": this.apellido,
          "nacimiento": this.fec_nac,
          "email": this.email ,
          "dni": this.dni,
          "celular": this.celular
        };
        axios.post('https://backend-passs.herokuapp.com/api/usuarios', json)
        .then( data => {
          console.log(data)
          if(data.status == 200) {
            this.loading = false;
            console.log("BIENVENIDO");
            this.$router.push('seleccion-verficacion')
          } 
        })
        .catch(err =>
          {
            console.log(err.response)
            this.loading = false;
            this.error = true;
            this.error_msg = err.response.data.data.msg
          }
        )
      }
    }
  }
</script>
