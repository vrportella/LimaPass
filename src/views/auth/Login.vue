<template>
  <div id="bg_blue">
    <b-container class="login_container">
      <img class="logo" src="@/assets/img/logo.png" />
      <b-form @submit="onSubmit">
        <b-form-group style="margin-bottom:70px">
          <b-form-input
            type="number"
            placeholder="DNI"
            v-model="dni"
            :state="dniState"
            required
            trim
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>
        </b-form-group>
        <span v-if="dniState" class="invalid-feedback">Campo requerido</span>
        <b-form-group class="mb-4">
          <b-button block  variant="outline-light" @click="$router.push('tarjetas')">INGRESAR</b-button>
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
        dni: null,
      }
    },
    computed: {
      dniState() {
        return this.dni ? true : false
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.dni))
      },
    }
  }
</script>