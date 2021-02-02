<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-container class="login_container">
      <b-alert show variant="danger" v-if="error">DNI no encontrado</b-alert>
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
  import emailjs from 'emailjs-com';
  export default {
    data() {
      return {
        dni: "",
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
      login(e) {
        this.loading = true;
        let json = {
          "dni": this.dni
        };
        axios.get(`https://backend-passs.herokuapp.com/api/login/${this.dni}`, json)
        .then( data => {
          console.log(data)
          if(data.status == 200) {
            this.loading = false;
            console.log("BIENVENIDO");
            let res = data.data.data;
            this.apellido = res.usuario.apellido;
            this.celular = res.usuario.celular;
            this.dni_id = res.usuario.dni;
            this.email = res.usuario.email;
            this.enabled = res.usuario.enabled;
            this.nacimiento = res.usuario.nacimiento;
            this.nombre = res.usuario.nombre;
            this.role = res.usuario.role;
            this.uid = res.usuario.uid;
            this.generatePIN();
            
            if(this.pin) {
              var params = {message: this.dni};
              // console.log('pin',params)
              emailjs.sendForm('service_3z6vpyf', 'template_8UZWBPKn', e.target, 'user_h4PURwJXfyqxNMXb8osEh',params)
              .then((result) => {
                  console.log('SUCCESS!', result.status, result.text);
              }, (error) => {
                  console.log('FAILED...', error);
              });
            }
            this.$router.push({
              name: 'verficacion',
              params: {
                pin: this.pin
              }
            })
          } 
        })
        .catch(err =>
          {
            console.log(err.response)
            this.loading = false;
            this.error = true;
            this.error_msg = err.response.data.data.cambio
          }
        )
      },
      generatePIN() {
        var pin = Math.floor(1000 + Math.random() * 9000);
        this.pin = pin;
      },
      sendEmail: (e) => {
        emailjs.sendForm('service_3z6vpyf', 'template_8UZWBPKn', e.target, 'user_h4PURwJXfyqxNMXb8osEh')
          .then((result) => {
              console.log('SUCCESS!', result.status, result.text);
          }, (error) => {
              console.log('FAILED...', error);
          });
      }
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
      celular: {
        get() {
          return this.$store.state.celular;
        },
        set(value) {
          this.$store.commit("mutateCelular", value);
        }
      },
      dni_id: {
        get() {
          return this.$store.state.dni_id;
        },
        set(value) {
          this.$store.commit("mutateDni", value);
        }
      },
      email: {
        get() {
          return this.$store.state.email;
        },
        set(value) {
          this.$store.commit("mutateEmail", value);
        }
      },
      enabled: {
        get() {
          return this.$store.state.enabled;
        },
        set(value) {
          this.$store.commit("mutateEnable", value);
        }
      },
      nacimiento: {
        get() {
          return this.$store.state.nacimiento;
        },
        set(value) {
          this.$store.commit("mutateNacimiento", value);
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
      role: {
        get() {
          return this.$store.state.role;
        },
        set(value) {
          this.$store.commit("mutateRole", value);
        }
      },
      uid: {
        get() {
          return this.$store.state.uid;
        },
        set(value) {
          this.$store.commit("mutateUID", value);
        }
      }
    }
  }
</script>