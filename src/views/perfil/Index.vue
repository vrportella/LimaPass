<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="light" align="center">
      <h6 class="text-center">METROPOLITANO</h6> 
    </b-navbar>
    <div class="">
      <b-container class="py-5 login_container">
        <b-alert show variant="danger" v-if="error">{{error_msg}}</b-alert>
        <img class="logo" src="@/assets/img/logo-3.png" />
        <b-form v-on:submit.prevent="editProfile">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="nombre"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              type="text"
              v-model="apellido"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              type="text"
              v-model="dni"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              type="text"
              v-model="campo_correo"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              type="text"
              v-model="campo_numero"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="mt-5">
            <b-button block  variant="outline-light" @click="editProfile()">GUARDAR<b-icon class="ml-3" icon="pencil-square" /></b-button> 
          </b-form-group>
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      campo_correo: null,
      campo_numero: null,
      error: false,
      error_msg: "",
      loading: false,
    }
  },
  mounted() {
    this.getDataUser();
    this.campo_correo = this.correo;
    this.campo_numero = this.numero;
  },
  methods: {
    sendCode() {
      this.loading = true;
      let object = {
        "usuario": this.dni,
        "tipo" : '0',
      };
      axios.post('http://metropolitano.atspace.cc/php/verificarUpdate.php', object)
      .then(res => {
        let data = res.data;
        console.log("res : ",data)
        if(data.status == 200) {
          this.error = false;
          this.loading = false;
          this.$router.push({
            name: 'perfil-verificacion',
            params: {
              pin: data.data.codigo
            }
          })
          let json2 = {
            "user_id": 'user_h4PURwJXfyqxNMXb8osEh',
            "service_id": 'service_3z6vpyf',
            "template_id": 'template_8UZWBPKn',
            "template_params" : {
              "message" : data.data.codigo            
              }
          }
          axios.post('https://api.emailjs.com/api/v1.0/email/send', json2)
            .then( data => {
            if(data.statusText == "OK") {
              console.log(data.statusText)
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
        else {
          this.loading = false;
          this.error = true;
          this.error_msg = 'Ocurrió un error. Inténtelo más tarde';
        }
      })
      
    },
    editProfile() {
      this.loading = true;
      let object = {
        "dni": this.dni,
        "correo" : this.campo_correo,
        "numero" : this.campo_numero
      };
      axios.post('http://metropolitano.atspace.cc/php/updateProfile.php', object)
      .then(res => {
        let data = res.data;
        console.log("res : ",data)
        if(data.status == 200) {
          this.loading = false;
          this.error = false;
          // this.showMsgModal(data.mensaje);
          this.getDataUser()
          this.sendCode()
        }
        else {
          this.loading = false;
          this.error = true;
          this.error_msg = data.mensaje;
        }
      })
      .catch(err =>
        {
          console.log(err.response)
          this.loading = false;
        }
      )
    },
    getDataUser() {
      this.loading = true;
      let object = {
        "dni": this.dni
      };
      axios.post('http://metropolitano.atspace.cc/php/login.php', object)
      .then(res => {
        console.log("res : ",res.data)
        if(res.data.status == 200) {
          let data = res.data.data;
          console.log("BIENVENIDO",data);
          this.campo_correo = data.correo;
          this.campo_numero = data.numero;
          this.loading = false;
        }
      })
      .catch(err =>
        {
          console.log(err.response)
          this.loading = false;
          this.error = false;
          this.error_msg = err.response.data.data.cambio
        }
      )
    }
  },
  computed: {
    nombre: function(){
      return this.$store.state.user != null ? this.$store.state.user.data.nombre : '--';
    },
    apellido: function(){
      return this.$store.state.user != null ? this.$store.state.user.data.apellido : '--';
    },
    dni: function(){
      return this.$store.state.user != null ? this.$store.state.user.data.dni : '--';
    },
    correo: function(){
      return this.$store.state.user != null ? this.$store.state.user.data.correo : '--';
    },
    numero: function(){
      return this.$store.state.user != null ? this.$store.state.user.data.numero : '--';
    },
  }
}
</script>

<style>

</style>