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
        loading: false,
        modalMsg: ''
      }
    },
    methods: {
      registro() {
        this.loading = true;
        let json = {
          "nombre": this.nombre,
          "apellido": this.apellido,
          "fecha": this.fec_nac,
          "correo": this.email ,
          "dni": this.dni,
          "numero": this.celular
        };
        axios.post('http://metropolitano.atspace.cc/php/registrarUsuario.php', json)
        .then(data => {
          let res = data.data;
          console.log('res: ',res)
          this.loading = false;
          if(res.status == 200) {
            console.log("BIENVENIDO");
            let cod =  res.data.codigo;
            let user = {
              nombre: this.nombre,
              apellido: this.apellido,
              fecha: this.fec_nac,
              correo: this.email ,
              dni: this.dni,
              numero: this.celular,
              cod: cod,
            }
            this.sendEmail(cod)
            this.showMsgModal(res.mensaje, user);
          } else {
            this.error = true;
            this.error_msg = res.mensaje
          }
        })
        .catch(err =>
          {
            // console.log(err.response)
            this.loading = false;
            this.error = true;
            this.error_msg = err.response.data.data.msg
          }
        )
      },
      sendEmail(cod) {
        let json2 = {
          "user_id": 'user_h4PURwJXfyqxNMXb8osEh',
          "service_id": 'service_3z6vpyf',
          "template_id": 'template_8UZWBPKn',
          "template_params" : {
            "message" : cod          
            }
        }
        axios.post('https://api.emailjs.com/api/v1.0/email/send', json2)
        .then( data => {
          if(data.statusText == "OK") {
            this.loading = false;
            // this.$router.push({
            //   name: 'verficacion',
            //   params: {
            //     pin: cod
            //   }
            // })
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
      },
      showMsgModal(text,user) {
        this.modalMsg = '';
        this.$bvModal.msgBoxOk(text,{
          title: 'Mensaje',
        })
          .then(value => {
            console.log('value',value)
            this.$router.push({
              name: 'registro-verficacion',
              params: user
            })
          })
          // .catch(err => {
          //   // An error occurred
          // })
      },
    }
  }
</script>
