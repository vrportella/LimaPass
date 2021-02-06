<template>
  <div id="bg_blue">
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="light" align="center">
      <h6 class="text-center">Tarjeta General</h6> 
    </b-navbar>
    <div class="">
      <b-container class="py-5">
        <img class="logo" src="@/assets/img/detalle_tarjeta.png" />
        <b-form-group>
          <b-input></b-input>
        </b-form-group>
        <b-button block variant="outline-light">VERIFICAR TARJETA</b-button>
      </b-container>
    </div>
  </div>
</template>