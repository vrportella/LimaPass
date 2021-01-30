<template>
  <div id="bg_blue">
    <b-navbar  variant="light" align="center">
      <b-navbar-brand href="/"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>VERIFICACIÓN</h6> 
    </b-navbar>
    <div class="container_360">
      <b-container class="registro_container py-5">
        <h3 class="white mb-5">SE TE ENVIO UN CODIGO A LA OPCION QUE SELECCIONASTE</h3> 
        <div class="group-code">
          <input class="form-control" v-for="(c, index) in ct" :key="index"
           type="number" v-model="ct[index]" ref="input"
           @input="e => {onInput(e.target.value, index)}"
           @keydown.delete="e=>{onKeydown(e.target.value, index)}"
           @focus="onFocus"
           :disabled="loading"
          >
        </div>
        <p style="color:#fff">{{msg}}</p>
        <b-form-group>
          <b-button block variant="outline-light" @click="sendCaptcha()">VERIFICAR CODIGO</b-button>
        </b-form-group>
      </b-container>
    </div>
  </div>
</template>
<script>
  // import axios from "axios";
  export default {
    data() {
      return {
        pin: null,
        ct: ['','','',''],
        newPin: null,
        loading: false,
        msg:'',
      }
    },
    watch: {
      cIndex() {
        this.resetCaret();
      },
      lastCode(val) {
        if (val) {
          // console.log('this.ctSize', this.ctSize)
          this.$refs.input[this.ctSize-1].blur();
          // this.sendCaptcha();
        }
      }
    },
    mounted() {
      this.pin = this.$route.params.pin;
      this.resetCaret();
    },
    methods: {
      onInput(val, index) {
        this.msg =''
        val = val.replace(/\s/g,'');
        if (index == this.ctSize-1) {
          this.ct[this.ctSize-1] = val[0];
        } else if(val.length> 1) {
          let i = index;
          for (i = index; i <this.ctSize && i-index <val.length; i++) {
            this.ct[i] = val[i];
          }
          this.resetCaret();
        }
      },
      resetCaret() {
        this.$refs.input[this.ctSize-1].focus();
      },
      onFocus() {
        let index = this.ct.findIndex(item => item ==='');
        index = (index + this.ctSize)% this.ctSize;
        // console.log(this.$refs.input)
        this.$refs.input[index].focus();
      },
      onKeydown(val, index) {
        if (val ==='') {
          if (index> 0) {
            this.ct[index-1] ='';
            this.$refs.input[index-1].focus();
          }
        }
      },
      sendCaptcha() {
        this.newPin = parseInt(this.ct.join(''));
        this.loading = true;
        if(this.pin == this.newPin) {
          this.$router.push('tarjetas')
          this.loading = false;
        } else {
          this.loading = false;
          this.msg = ('Verification code error')
        }
      },
    },
    computed: {
      ctSize() {
        return this.ct.length;
      },
      cIndex() {
        let i = this.ct.findIndex(item => item ==='');
        i = (i + this.ctSize)% this.ctSize;
        return i;
      },
      lastCode() {
        return this.ct[this.ctSize-1];
      }
    }
  }
</script>