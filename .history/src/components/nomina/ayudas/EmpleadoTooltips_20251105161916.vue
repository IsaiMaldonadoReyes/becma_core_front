<template>
  <!-- Código -->
  <v-card
    v-if="name === 'codigo'"
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
        Código único que se asigna al empleado para su identificación en los procesos de nómina.
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

  <!-- Fecha de alta -->
  <div v-if="name === 'fechaDeAlta'" style="pointer-events: auto; cursor: help">
    <v-tooltip location="bottom">
      <template #activator="{ props: tooltipProps }">
        <v-icon v-bind="tooltipProps" icon="mdi-information-slab-circle-outline" size="20" />
      </template>
      <template #default>
        <v-card
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
              Fecha de ingreso del trabajador con el cliente, utilizada para determinar su
              antigüedad y calcular las prestaciones correspondientes conforme al tiempo de
              servicio.
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
      </template>
    </v-tooltip>
  </div>

  <!-- Base de cotización -->
  <v-card
    v-if="name === 'baseCotizacion'"
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
        Indica el tipo de la base de cotización:<br /><b>F</b> = Fijo <br /><b>V</b> = Variable
        <br /><b>M</b> = Mixto
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'EmpleadoTooltips',
  props: {
    name: {
      type: String as PropType<'baseCotizacion' | 'codigo' | 'curp' | 'rfc' | 'puesto' | string>,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
