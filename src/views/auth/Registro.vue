<template>
  <div id="bg_blue">
    <b-navbar  variant="light" align="center">
      <b-navbar-brand href="/"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>REGISTRO</h6> 
    </b-navbar>
    <b-container class="registro_container py-5">
      <img class="logo" src="@/assets/img/logo.png" />
      <b-form>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Nombre:"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Apellido:"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="DNI"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="01 - 03 - 1999"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="CODIGO DNI 00000000-x"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="correo@gmail.com"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Número de cel."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mt-5">
          <b-button block  variant="outline-light" @click="$router.push('seleccion-verficacion')">REGISTRARME</b-button>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>
