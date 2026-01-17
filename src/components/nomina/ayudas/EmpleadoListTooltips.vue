<template>
  <!-- Filtros -->
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
        Elija el <b style="color: #2a73c5"><i>CLIENTE</i></b> para poder filtrar la información
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
        correspondiente de: <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b>
      </v-col>
    </v-row>
  </v-card>
  <!-- ayudaFiltroEmpresa -->
  <v-card
    v-if="name === 'ayudaFiltroEmpresa'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
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
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar una opción en este campo, se habilitará el:
        <b style="color: #2a73c5"><i>BUSCADOR</i></b> de empleados
      </v-col>
    </v-row>
  </v-card>
  <v-card
    v-if="name === 'ayudaFiltroEsquema'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
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
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar una opción en este campo, se habilitará y mostrará la información
        correspondiente de: <b style="color: #2a73c5"><i>EMPRESA</i></b>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'EmpleadoListTooltips',
  props: {
    name: {
      type: String as PropType<'baseCotizacion' | 'codigo' | 'curp' | 'rfc' | 'puesto' | string>,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
