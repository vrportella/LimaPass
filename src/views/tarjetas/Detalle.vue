<template>
  <div>
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="light" align="center">
      <h6 class="text-center">Tarjeta General</h6> 
    </b-navbar>
      <b-container class="py-5 verificar_tarjeta">
        <img src="@/assets/img/detalle_tarjeta.png" />
        <b-form-group>
          <b-input placeholder="CODIGO TARJETA - XXXXXXXX" v-model="codigo"></b-input>
          <div class="label-error" v-if="error">{{error_msg}}</div>
        </b-form-group>
        <b-button block variant="primary" @click="validateCode()">VERIFICAR TARJETA</b-button>
      </b-container>
  </div>
</template>
<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        loading: false,
        codigo: "",
        error: false,
        error_msg: '',
        modalMsg: ''
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      validateCode() {
        this.loading = true;
        let object = {
          "dni": this.dni,
          "codigo": this.codigo
        };
        axios.post('http://metropolitano.atspace.cc/php/verificarTarjeta.php', object)
        .then(res => {
          let data = res.data;
          console.log("res : ",data)
          if(data.status == 200) {
            this.loading = false;
            this.error = false;
            this.showMsgModal(data.mensaje);
            // let data = res.data.data.data;
          }
          else {
            this.loading = false;
            this.error = true;
            this.error_msg = data.mensaje
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
      showMsgModal(text) {
        this.modalMsg = '';
        this.$bvModal.msgBoxOk(text,{
          title: 'Mensaje',
        })
          .then(value => {
            console.log('value',value)
          })
      },
    },
    computed: {
      dni: function(){
        return this.$store.state.user != null ? this.$store.state.user.data.dni : '--';
      },
    }
  }
</script>