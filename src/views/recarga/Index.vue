<template>
  <div>
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="dark" align="center">
      <b-navbar-brand href="/tarjetas"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>Recargar</h6> 
    </b-navbar>
      <b-container class="py-5 verificar_tarjeta">
        <h1 class="text-left mb-5" style="font-weight:600">INGRESE UN <br/> MONTO:</h1>
        <b-form-group>
          <b-input placeholder="S/0.00" type="number" v-model="monto"></b-input>
          <div class="label-error" v-if="error">{{error_msg}}</div>
        </b-form-group>
        <b-button block variant="primary" @click="validateMonto()">RECARGAR TARJETA</b-button>
      </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        monto: null,
        loading: false,
        error: false,
        error_msg: '',
        tipo: null
      }
    },
    created() {
    },
    mounted() {
      this.tipo = this.$route.params.tipo;
    },
    methods: {
      validateMonto() {
        this.loading = true;
        if( this.monto > 0 && this.monto <= 100) {
          this.loading = false;
          this.$router.push({
            name: 'pago',
            params: {
              monto: this.monto,
              tipo: this.tipo
            }
          })
        } else {
          this.loading = false;
          this.error=true;
          this.error_msg="Ingrese un monto válido de 0 a S/.100"
        }
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