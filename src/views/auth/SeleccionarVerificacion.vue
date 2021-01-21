<template>
  <div id="bg_blue">
    <b-navbar  variant="light" align="center">
      <b-navbar-brand href="/registro"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>VERIFICACIÓN</h6> 
    </b-navbar>
    <div class="container_360">
      <b-container class="registro_container py-5">
        <h2 class="white mb-5">Seleccione en donde le llegar el codigo de verificacion:</h2> 
        <b-form-group>
          <b-button block size="lg" variant="outline-light" @click="$router.push('verficacion')">VERIFICAR POR NUMERO</b-button>
        </b-form-group>
        <b-form-group>
          <b-button block size="lg" variant="outline-light" @click="$router.push('verficacion')">VERIFICAR POR CORREO</b-button>
        </b-form-group>
      </b-container>
    </div>
  </div>
</template>
