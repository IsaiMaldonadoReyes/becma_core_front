<template>
  <!-- Filtros -->

  <!-- cliente -->
  <v-card
    v-if="name === 'ayudaCliente'"
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
        es necesario configurar la parametrización de la prenómina para cada una de las empresas de
        cada cliente.<br />
        Elija el <b style="color: #2a73c5"><i>CLIENTE</i></b> para después elegir la empresa a la
        que desea configurar su parametrización.
      </v-col>
    </v-row>
  </v-card>

  <!-- tipoEmpresa -->
  <v-card
    v-if="name === 'ayudaTipoEmpresa'"
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
        elija el tipo de empresa (fiscal o no fiscal) para mostrar únicamente las empresas
        correspondientes.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-cursor-default-click" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar una opción en este campo, se habilitará y mostrará la información
        correspondiente de: <b style="color: #2a73c5"><i>EMPRESA</i></b>
      </v-col>
    </v-row>
  </v-card>

  <!-- empresa -->
  <v-card
    v-if="name === 'ayudaEmpresa'"
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
        elija la empresa a la que desea definir los parámetros de la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
        debe seleccionar primero
        <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b> para poder habilitar este campo y
        mostrar las empresas correspondientes.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-cursor-default-click" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar una opción en este campo, se habilitará y mostrará la información
        correspondiente de: <b style="color: #2a73c5"><i>TIPO DE PERIODO</i></b>
      </v-col>
    </v-row>
  </v-card>

  <!-- tipoPeriodo -->
  <v-card
    v-if="name === 'ayudaTipoPeriodo'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        la parametrización debe configurarse de forma independiente para cada uno de los tipos de
        periodo manejados dentro de la empresa. <br />Elija el tipo de periodo (periodicidad) para
        el cual desea definir la configuración de parametrización de prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
        debe seleccionar primero una <b style="color: #2a73c5"><i>EMPRESA</i></b> fiscal para poder
        habilitar este campo y mostrar los tipos de periodo manejados en la empresa.
      </v-col>
    </v-row>
  </v-card>

  <!-- Formulario -->

  <!-- clasePrimaRiesgo -->
  <v-card
    v-if="name === 'ayudaClasePrimaRiesgo'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-laptop" />
      </v-col>
      <v-col cols="11">Elija la Clase prima de riesgo. </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-cursor-default-click" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar la opción <b style="color: #2a73c5"><i>ACTUALIZADA</i></b> en este campo, se
        habilitará el campo <b style="color: #2a73c5"><i>PRIMA DE RIESGO ACTUALIZADA</i></b> para
        que pueda capturar su valor correspondiente.
      </v-col>
    </v-row>
  </v-card>

  <!-- clasePrimaRiesgoValor -->
  <v-card
    v-if="name === 'ayudaClasePrimaRiesgoValor'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-laptop" />
      </v-col>
      <v-col cols="11">Capture el valor de la prima de riesgo actualizada.</v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
        debe seleccionar primero la opción:
        <b style="color: #2a73c5"><i>ACTUALIZADA</i></b> del campo
        <b style="color: #2a73c5"><i>CLASE PRIMA DE RIESGO</i></b> para poder habilitar este campo.
      </v-col>
    </v-row>
  </v-card>

  <!-- fee -->
  <v-card
    v-if="name === 'ayudaFee'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Porcentaje de comisión que se aplicará al cliente.</v-col>
    </v-row>
  </v-card>

  <!-- baseFee -->
  <v-card
    v-if="name === 'ayudaBaseFee'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11"
        ><span style="font-weight: bold; color: #2a73c5">Instrucción:</span> indique la base de
        cálculo que se utilizará para determinar la comisión aplicada al cliente.
      </v-col>
    </v-row>
  </v-card>

  <!-- provisiones -->
  <v-card
    v-if="name === 'ayudaProvisiones'"
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
        Corresponde a las provisiones de las prestaciones de ley, como aguinaldo y prima vacacional,
        que deberán calcularse y provisionarse conforme a cada periodo de pago, cuando aplique.
      </v-col>
    </v-row>
  </v-card>

  <!-- isn -->
  <v-card
    v-if="name === 'ayudaIsn'"
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
        Capture el porcentaje correspondiente al Impuesto Sobre Nómina (ISN).
      </v-col>
    </v-row>
  </v-card>

  <!-- instruccionConcepto -->
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
        <br />
        El sistema utilizará este orden para calcular los excedentes durante el proceso de cálculo
        de la prenómina.
      </v-col>
    </v-row>
  </v-card>

  <!-- cuotaSindical -->
  <v-card
    v-if="name === 'ayudaCuotaSindical'"
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
        Corresponde al porcentaje de retención que se aplicará en la nómina fiscal a los
        trabajadores agremiados, tomando como base su sueldo o percepción bruta.
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ParametrizacionTooltips',
  props: {
    name: {
      type: String as PropType<
        | 'cliente'
        | 'tipoEmpresa'
        | 'empresa'
        | 'tipoPeriodo'
        | 'clasePrimaRiesgo'
        | 'clasePrimaRiesgoValor'
        | 'fee'
        | 'ayudaBaseFee'
        | 'isn'
        | 'cuotaSindical'
        | 'ayudaInstruccionConcepto'
        | string
      >,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
