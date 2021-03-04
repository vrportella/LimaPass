<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-container class="login_container">
      <b-alert show variant="danger" v-if="error">{{error_msg}}</b-alert>
      <img class="logo" src="@/assets/img/logo.png" />
      <b-form v-on:submit.prevent="login">
        <b-form-group style="margin-bottom:70px">
          <b-form-input
            type="number"
            placeholder="DNI"
            v-model="campo_dni"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
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
        campo_dni: "",
        error: false,
        error_msg: "",
        loading: false,
        pin: null
      }
    },
    created() {
    this.$store.replaceState({})
  },
    methods: {
      login() {
        this.loading = true;
        let object = {
          "dni": this.campo_dni
        };
        axios.post('http://metropolitano.atspace.cc/php/login.php', object)
        .then(res => {
          console.log("res : ",res.data)
          if(res.data.status == 200) {
            console.log("BIENVENIDO");
            let data = res.data.data;
            this.$store.commit('setUser', { data });
            this.$store.commit('setLogged', {logged:true});
            let json2 = {
              "user_id": 'user_h4PURwJXfyqxNMXb8osEh',
              "service_id": 'service_3z6vpyf',
              "template_id": 'template_8UZWBPKn',
              "template_params" : {
                "message" : data.codigo            
                }
            }

            axios.post('https://api.emailjs.com/api/v1.0/email/send', json2)
              .then( data => {
              if(data.statusText == "OK") {
                this.loading = false;
                this.$router.push({
                  name: 'verficacion',
                  params: {
                    pin: res.data.data.codigo
                  }
                })
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
            console.log('res.codigo',data.codigo)
            
          } else {
            this.loading = false;
            this.error = true;
            this.error_msg = res.data.mensaje;
            this.$store.commit('setLogged', {logged:false});
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
      },
    },
    computed: {
      apellido: {
        get() {
          return this.$store.state.apellido;
        },
        set(value) {
          this.$store.commit("mutateApellido", value);
        }
      },
      correo: {
        get() {
          return this.$store.state.correo;
        },
        set(value) {
          this.$store.commit("mutateCorreo", value);
        }
      },
      dni: {
        get() {
          return this.$store.state.dni;
        },
        set(value) {
          this.$store.commit("mutateDni", value);
        }
      },
      id: {
        get() {
          return this.$store.state.id;
        },
        set(value) {
          this.$store.commit("mutateId", value);
        }
      },
      nombre: {
        get() {
          return this.$store.state.nombre;
        },
        set(value) {
          this.$store.commit("mutateNombre", value);
        }
      },
      numero: {
        get() {
          return this.$store.state.numero;
        },
        set(value) {
          this.$store.commit("mutateNumero", value);
        }
      },
    }
  }
</script>