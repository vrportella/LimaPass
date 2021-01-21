<template>
  <div id="bg_blue">
    <b-container class="login_container">
      <img class="logo" src="@/assets/img/logo.png" />
      <b-form>
        <b-form-group style="margin-bottom:70px">
          <b-form-input
            type="number"
            placeholder="Nombre"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <b-button block  variant="outline-light">INGRESAR</b-button>
        </b-form-group>
        <b-form-group>
          <b-button block variant="outline-light" @click="$router.push('registro')">REGISTRARSE</b-button>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
     
    }
  }
</script>