<template>
  <div id="bg_blue">
    <b-navbar  variant="light" align="center">
      <b-navbar-brand href="/seleccion-verficacion"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>VERIFICACIÓN</h6> 
    </b-navbar>
    <div class="container_360">
      <b-container class="registro_container py-5">
        <h3 class="white mb-5">SE TE ENVIO UN CODIGO A LA OPCION QUE SELECCIONASTE</h3> 
        <div class="group-code">
          <b-form-input
            type="number"
            placeholder="0"
            required
          ></b-form-input>
          <b-form-input
            type="number"
            placeholder="0"
            required
          ></b-form-input>
          <b-form-input
            type="number"
            placeholder="0"
            required
          ></b-form-input>
          <b-form-input
            type="number"
            placeholder="0"
            required
          ></b-form-input>
        </div>
        <b-form-group>
          <b-button block variant="outline-light" @click="$router.push('tarjetas')">VERIFICAR CODIGO</b-button>
        </b-form-group>
      </b-container>
    </div>
  </div>
</template>
