<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="light" align="center">
      <h6 class="text-center">METROPOLITANO</h6>
      <router-link class="h5 ml-auto" to="/perfil" style="color:#000">
        <b-icon class="mr-2" icon="person" />Mi perfil
      </router-link>
    </b-navbar>
    <div class="">
      <b-container class="py-5">
        <h3 class="text-center" style="color:#fff">Hola {{nombre}}!</h3> 
        <div class="cards-wrap">
          <div 
            class="card_tarjeta" 
            v-for="(tarjeta, index)  in tarjetasArr"
            :key="index"
          >
            <div>
              <h6>{{tarjeta.nombre}}</h6>
              <img class="logo" :src="tarjeta.imagen" />
            </div>
            <div class="ml-4">
              <b-button block variant="outline-light" @click="goToRecargas(tarjeta.tipo)">Recargar</b-button>
              <b-button block variant="outline-light" @click="goToHistorial(tarjeta.tipo)">Ver mas</b-button>
            </div>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        loading: false,
        tarjetasArr:[],
      }
    },
    created() {
    },
    mounted() {
      this.getTarjetas()
    },
    methods: {
      getTarjetas() {
        this.loading = true;
        let object = {
          "dni": this.dni
        };
        axios.post('http://metropolitano.atspace.cc/php/consultarTarjeta.php', object)
        .then(res => {
          console.log("res : ",res)
          if(res.status == 200) {
            this.loading = false;
            let data = res.data.data;
            console.log("----LISTADO TARJETAS");
            this.tarjetasArr = data;
            
          }
        })
        .catch(err =>
          {
            console.log(err.response)
            this.loading = false;
            this.error = true;
            // this.error_msg = err.response.data.data.cambio
          }
        )
      },
      goToRecargas(tipo) {
        if(tipo == 0) {
          this.$router.push({
            name: 'tarjeta-detalle',
            params: {
              tipo: tipo
            }
          })
        } else {
          this.$router.push({
            name: 'recarga',
            params: {
              tipo: tipo
            }
          })
        }
      },
      goToHistorial(tipo){
        if(tipo == 0) {
          this.$router.push({
            name: 'tarjeta-detalle',
            params: {
              tipo: tipo,
              historial: true
            }
          })
        } else {
          this.$router.push({
            name: 'movimientos',
            params: {
              tipo: tipo
            }
          })
        }
      }
    },
    computed: {
      nombre: function(){
        return this.$store.state.user != null ? this.$store.state.user.data.nombre : '--';
      },
      dni: function(){
        return this.$store.state.user != null ? this.$store.state.user.data.dni : '--';
      },
    }
  }
</script>