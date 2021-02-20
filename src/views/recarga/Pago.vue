<template>
  <div>
    <div v-if="loading" class="container-loader"><div class="loader">Cargando...</div></div>
    <b-navbar  variant="dark" align="center">
      <b-navbar-brand href="/recarga"><b-icon icon="arrow-left"></b-icon></b-navbar-brand>
      <h6>Recargar</h6> 
    </b-navbar>
      <b-container class="py-5">
        <div class="card card_pago">
          <img class="logo" src="@/assets/img/logo-2.png" />
          <div class="credit_cards">
            <img v-bind:style=" c_master ? 'opacity:1;' : 'opacity:0.5;'" src="@/assets/img/credit_master.png" />
            <img v-bind:style=" c_visa ? 'opacity:1;' : 'opacity:0.5;'" src="@/assets/img/credit_visa.png" />
          </div>
          <b-form-group>
            <b-input placeholder="Numero de Tarjeta" type="number" v-model="num_card" @change="pintarCard()"></b-input>
            <div class="label-error" v-if="error.num_card">{{error.num_card}}</div>
          </b-form-group>
          <b-form-row>
            <b-col>
              <b-form-group>
                <b-input placeholder="MM/AAAA"  pattern="'(1[0-2]|0[1-9])\/(1[5-9]|2\d)'" data-valid-example="05/18" v-model="fecha"></b-input>
                <div class="label-error" v-if="error.fecha">{{error.fecha}}</div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-input placeholder="CVV" v-model="cvv"></b-input>
                <div class="label-error" v-if="error.cvv">{{error.cvv}}</div>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-checkbox
            size="sm"
            v-model="checkbox"
          >
            He leído y acepto los <b-link v-b-modal.modal-terminos>Términos y Condiciones</b-link>
          </b-form-checkbox>
          <div class="label-error" v-if="error.checkbox">{{error.checkbox}}</div>
          <b-button block variant="primary" @click="RealizarPago()">PAGAR S/.{{monto}}</b-button>
        </div>
      </b-container>
      <b-modal id="modal-terminos" scrollable  title="Términos y Condiciones">
        <p>1. DERECHOS DEL USUARIO DE ESTE SITIO <br/> La sola visita a este sitio en el cual se ofrecen diferentes modalidades de pago no impone al usuario obligación alguna, a menos que haya aceptado las condiciones ofrecidas por Metropolitano, en la forma indicada en estos términos y condiciones.
          El usuario goza de todos los derechos establecidos según la legislación vigente en el Perú sobre protección al consumidor.
          Metropolitano efectúa permanentemente todos los esfuerzos por asegurar la disponibilidad de esta pasarela de pagos, las 24 horas, los siete días de la semana, sin interrupciones. Sin embargo, y debido a la naturaleza misma del internet, a través del cual opera este servicio, no es posible garantizar al 100% tal extremo.
          Asimismo, el acceso a esta pasarela de pagos podría ocasionalmente verse suspendido debido a la realización de trabajos mantenimiento o actualización del servicio con nuevas funcionalidades que tengan por objetivo brindarle un mejor servicio. Al respecto, procuraremos reducir en lo posible la frecuencia y duración de tales suspensiones.
        </p>
        <p>
          2. MEDIOS DE PAGO QUE SE PODRÁ UTILIZAR <br/>Los pagos a través de esta pasarela podrán ser efectuados bajo una modalidad:
          a) Tarjetas de crédito y débito Visa.
          El uso, condiciones de pago y otras condiciones aplicables a las tarjetas de crédito, son de exclusiva responsabilidad del emisor de su tarjeta.
          Dependiendo del nivel de riesgo, producto de la calificación dada a la operación por parte de los procesadores de pago, se solicitará al titular de la tarjeta de crédito/débito confirmar la operación autenticándose en Verified by Visa, por lo que previamente deberá estar afiliado a este sistema de autentificación en línea. De no encontrarse afiliado, deberá consultar con su Banco sobre el procedimiento de afiliación a Verified by Visa.
          Los montos de pago aceptados por el usuario serán retenidos por un tiempo máximo de 04 días para su atención. De no realizarse la transacción de manera correcta y ser interrumpida esta antes de que el usuario pueda recibir el voucher electrónico de pago (por time out), o exceder el tiempo establecido, la retención se libera y el pago del servicio queda anulado automáticamente y sin cargo alguno.
          Metropolitano procesa los pagos vía procesadores de pago locales, aplicando el cobro a su tarjeta de débito/crédito en moneda local. Sin embargo, si usted utiliza una tarjeta de crédito/débito emitida en el extranjero, el emisor de esta podría cargar el importe del pago en dólares norteamericanos, utilizando una tasa de cambio que fije el banco internacional de forma unilateral y en correspondencia a las condiciones de uso que tenga acordada para su tarjeta con dicha entidad.
        </p>
        <p>
          3. DERECHO DE ANULACIÓN <br/>
          Por ser un servicio en Línea no se aceptan anulaciones. La transacción se procesará inmediatamente recibida la conformidad del pago por parte del Banco Emisor de su tarjeta de crédito/débito. Por tratarse de operaciones seguras, los cargos autorizados no son reembolsables.
        </p>
        <p>4. DELIMITACIÓN DE RESPONSABILIDAD <br/>
          Metropolitano, no se responsabiliza frente a los usuarios o terceros por los daños y perjuicios que sean consecuencia directa o indirecta de la interrupción, suspensión o finalización de los servicios ofrecidos a través de esta pasarela de pagos, siendo esto responsabilidad del emisor de las tarjetas.
          Metropolitano, no se responsabiliza por los errores del usuario en el registro de los datos requeridos para el pago de los servicios en esta ventanilla virtual. Es responsabilidad del usuario verificar toda la información registrada antes de proceder con el pago.</p>
      </b-modal>
  </div>
</template>

<script>
import axios from "axios";
  
  export default {
    data() {
      return {
        loading: false,
        codigo: "",
        error: {
          num_card:'',
          fecha: '',
          cvv: '',
          checkbox: ''
        },
        error_msg: '',
        modalMsg: '',
        monto: null,
        num_card: null,
        fecha: null,
        cvv: null,
        checkbox: false,
        c_visa: false,
        c_master: false,
        tipo: null,
        mes: null,
        anio: null
      }
    },
    created() {
    },
    mounted() {
      this.monto = this.$route.params.monto;
      this.tipo = this.$route.params.tipo;
    },
    methods: {
      pintarCard(){
        let visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        let master = /^(?:5[1-5][0-9]{14})$/;
        if(this.num_card.match(visa)) {
          this.c_visa = true;
          console.log('VISA');
          this.error.num_card= '';
        } else {
          this.c_visa = false;
        }
        if(this.num_card.match(master)) {
          this.c_master = true;
          console.log('MASTER')
          this.error.num_card= '';
        } else {
          this.c_master = false;
        }
      },
      validateCampos() {
        this.loading = true;
        let visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        let master = /^(?:5[1-5][0-9]{14})$/;
        if(this.num_card) {
          if(this.num_card.match(visa) || this.num_card.match(master)) {
            this.loading = false;
            this.error.num_card = ''
            console.log('entro')
          }
          else {
            this.loading = false;
            this.error.num_card = 'El número ingresado es incorrecto'
            console.log('ERROR')
          }
        } else {
          this.loading = false;
          this.error.num_card = 'Debe ingresar el campo obligatorio'
        }
        if(this.fecha) {
          this.loading = false;
          let date = this.fecha;

          let dataArray = date.split('/');
          this.mes = dataArray[0];
          this.anio = dataArray[1];
          this.error.fecha = ''
        } else {
          this.loading = false;
          this.error.fecha = 'Debe ingresar fecha'
        }
        if(this.cvv) {
          this.error.cvv = '';
          this.loading = false;
        } else {
          this.loading = false;
          this.error.cvv = 'Debe ingresar cvv'
        }
      },
      RealizarPago() {
        this.validateCampos();
        this.loading = true;
        if(this.checkbox) {
          this.error.checkbox = ''
          let object = {
            "dni": this.dni,
            "nro": this.num_card,
            "mes" : this.mes,
            "anio" : this.anio,
            "ccv" : this.cvv,
            "tipo" : this.tipo,
            "monto" : this.monto
          };
          axios.post('http://metropolitano.atspace.cc/php/pasarela.php', object)
          .then(res => {
            let data = res.data;
            console.log("res : ",data)
            if(data.status == 200) {
              this.loading = false;
              // this.error = false;
              this.showMsgModal(data.mensaje);
              // let data = res.data.data.data;
            }
            else {
              this.loading = false;
              // this.error = true;
              // this.error_msg = data.mensaje
            }
          })
          .catch(err =>
            {
              console.log(err.response)
              this.loading = false;
              // this.error = true;
              // this.error_msg = err.response.data.data.cambio
            }
          )
        } else {
          this.loading = false;
          this.error.checkbox = 'Debe aceptar los términos y Condiciones'
        }
      },
      showMsgModal(text) {
        this.modalMsg = '';
        this.$bvModal.msgBoxOk(text,{
          title: 'Mensaje',
        })
          .then(value => {
            console.log('value',value)
            // this.$router.push({
            //   name: 'recarga'
            // })
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

<style>
  
</style>