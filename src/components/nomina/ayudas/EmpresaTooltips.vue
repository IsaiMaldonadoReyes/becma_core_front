<template>
  <!-- Principales -->

  <!-- ayudaFiltroCliente -->
  <v-card
    v-if="name === 'ayudaFiltroCliente'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        elija un cliente del cuál se dará de alta una nueva empresa.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-cursor-default-click" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar una opción en este campo, se habilitará el botón:
        <b style="color: #2a73c5"><i>Agregar nueva combinación de esquemas</i></b>
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaEsquemasDePago -->
  <v-card
    v-if="name === 'ayudaEsquemasDePago'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        elija uno o más esquemas para configurar una combinación de esquemas de pago.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-cursor-default-click" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar las opciones de este de campo de habilitarán los campos de la siguiente
        forma: <br /><br />
        - <b style="color: #2a73c5"><i>Sueldo IMSS:</i></b> Empresa CONTPAQi Nóminas <br />
        - <b style="color: #2a73c5"><i>Previsión social:</i></b> Empresa CONTPAQi Nóminas <br />
        - <b style="color: #2a73c5"><i>Fondos sindical:</i></b> Empresa CONTPAQi Nóminas <br />
        - <b style="color: #2a73c5"><i>Honorarios asimilados:</i></b> Empresa CONTPAQi Nóminas
        <br />
        - <b style="color: #2a73c5"><i>Tarjeta fácil:</i></b> Razón Social, RFC, Mascara del código,
        Código inicial<br />
        - <b style="color: #2a73c5"><i>Gastos por comprobar:</i></b> Razón Social, RFC, Mascara del
        código, Código inicial<br />
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaEmpresaNomina -->
  <v-card
    v-if="name === 'ayudaEmpresaNomina'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        Elija la empresa del sistema CONTPAQi Nóminas que desea vincular a la nueva empresa para
        establecer la conexión correspondiente.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
        debe configurar y habilitar el esquema de pago
        <b style="color: #2a73c5"><i>Sueldo IMSS</i></b> u
        <b style="color: #2a73c5"><i>Honorarios asimilados</i></b> para poder habilitar este campo y
        mostrar las empresas correspondientes de CONTPAQi Nóminas.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaRazonSocial -->
  <v-card
    v-if="name === 'ayudaRazonSocial'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        Ingrese la razón social de la empresa.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaRfc -->
  <v-card
    v-if="name === 'ayudaRfc'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-card-account-details" />
      </v-col>
      <v-col cols="11">
        Capture el RFC correspondiente a la empresa fiscal registrada ante el SAT.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaCorreoNotificacion -->
  <v-card
    v-if="name === 'ayudaCorreoNotificacion'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-email" />
      </v-col>
      <v-col cols="11"> Ingrese un correo electrónico válido. </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaCodigoInterno -->
  <v-card
    v-if="name === 'ayudaCodigoInterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-barcode" />
      </v-col>
      <v-col cols="11"> Ingrese un código de identificación del cliente/empresa. </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaMascara -->
  <v-card
    v-if="name === 'ayudaMascara'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-barcode" />
      </v-col>
      <v-col cols="11"> Ingrese una mascara para la generación automática de códigos. </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaCodigoInicial -->
  <v-card
    v-if="name === 'ayudaCodigoInicial'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-barcode" />
      </v-col>
      <v-col cols="11">
        Ingrese el código númerico inicial a partir del cual el sistema comenzará la generación
        automática de códigos de empleado. Este valor servirá como punto de partida para numerar de
        forma consecutiva los nuevos registros de acuerdo a la mascara establecida.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaCodigoActual -->
  <v-card
    v-if="name === 'ayudaCodigoActual'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-barcode" />
      </v-col>
      <v-col cols="11">
        Ingrese el código númerico actual a partir del cual el sistema continuara la generación
        automática de códigos de empleado. Este valor servirá como punto de partida para numerar de
        forma consecutiva los nuevos registros de acuerdo a la mascara establecida.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaInstruccionConcepto -->
  <v-card
    v-if="name === 'ayudaInstruccionConcepto'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        arrastre y suelte los conceptos alternativos de pago para organizarlos en el orden deseado.
        El sistema utilizará este orden para calcular los excedentes durante el proceso de cálculo
        de la prenómina.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaEsquemasPago -->
  <v-card
    v-if="name === 'ayudaEsquemasPago'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Formulario de configuración de combinaciones de esquemas de pago.</v-col>
    </v-row>
  </v-card>

  <!-- ayudaDatosEmpresa -->
  <v-card
    v-if="name === 'ayudaDatosEmpresa'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Formulario para datos de la empresa.</v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Formulario dependiente:</span>
        debe configurar y habilitar los esquemas de pago para poder acceder a este formulario.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaParametrizacion -->
  <v-card
    v-if="name === 'ayudaParametrizacion'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Formulario para configuración de la parametrización de las combinaciones de los esquemas de pago.</v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Formulario dependiente:</span>
        debe completar el formulario de <b style="color: #2a73c5"><i>Datos de la empresa</i></b> parar poder acceder a esté apartado.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaBancos -->
  <v-card
    v-if="name === 'ayudaBancos'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Formulario de configuración de Bancos para dispersión de pagos.</v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Formulario dependiente:</span>
        debe completar el formulario de <b style="color: #2a73c5"><i>Datos de la empresa</i></b> parar poder acceder a esté apartado.
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'EmpresaTooltips',
  props: {
    name: {
      type: String as PropType<
        | 'empresaNomina'
        | 'razonSocial'
        | 'rfc'
        | 'correoNotificacion'
        | 'codigoInterno'
        | 'mascara'
        | 'codigoInicial'
        | 'codigoActual'
        | 'ayudaInstruccionConcepto'
        | 'ayudaFiltroCliente'
        | 'ayudaEsquemasPago'
        | 'ayudaParametrizacion'
        | 'ayudaBancos'
        | string
      >,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
