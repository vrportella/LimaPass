<template>
  <div id="bg_blue">
    <b-container class="login_container">
      <b-alert show variant="danger" v-if="error">{{error_msg}}</b-alert>
      <img class="logo" src="@/assets/img/logo.png" />
      <b-form v-on:submit.prevent="login">
        <b-form-group style="margin-bottom:70px">
          <b-form-input
            type="number"
            placeholder="DNI"
            v-model="dni"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <!-- <b-button block  variant="outline-light" @click="$router.push('tarjetas')">INGRESAR</b-button> -->
          <b-button block  variant="outline-light" type="submit">INGRESAR</b-button> 
        </b-form-group>
        <b-form-group>
          <b-button block variant="outline-light" @click="$router.push('registro')">REGISTRARSE</b-button>
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
        dni: "",
        error: false,
        error_msg: ""
      }
    },
    methods: {
      login() {
        let json = {
          "dni": this.dni
        };
        axios.post('https://backend-passs.herokuapp.com/api/login', json)
        .then( data => {
          console.log(data)
          if(data.status == 200) {
            console.log("BIENVENIDO");
            this.$router.push('tarjetas')
          } 
        })
        .catch(err =>
          {
            console.log(err.response)
            this.error = true;
            this.error_msg = err.response.data.data.cambio
          }
        )
      }
    }
  }
</script>