<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="light" align="center">
      <b-navbar-brand href="/tarjetas"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>Ver mas</h6> 
    </b-navbar>
    <div class="container_historial py-5">
      <h1 class="saldo">SALDO ACTUAL: <span>S/.{{saldo}}</span></h1>
      <div class="mov_title">Historial</div>
      <ul>
        <li
          v-for="(item, index)  in historial"
          :key="index"
        >
          <span>{{item.fecha}}</span>
          <span class="price">S/.{{item.saldo}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      tipo: null,
      historial: [],
      saldo: 0,
    }
  },
  mounted() {
    this.tipo = this.$route.params.tipo;
    this.getHistorial()
  },
  methods: {
    getHistorial() {
      this.loading = true;
      let object = {
        "dni": this.dni,
        "tipo": this.tipo
      };
      axios.post('http://metropolitano.atspace.cc/php/historial.php', object)
      .then(res => {
        if(res.status == 200) {
          this.loading = false;
          let data = res.data.data;
          console.log("----LISTADO HISTORIAL", data);
          this.historial = data.movimientos;
          this.saldo = data.saldo;
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
  },
  computed: {
    dni: function(){
      return this.$store.state.user != null ? this.$store.state.user.data.dni : '--';
    },
  }
}
</script>

<style>

</style>