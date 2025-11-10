<template>
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
      type: String as PropType<'baseCotizacion' | 'fechaAlta' | 'curp' | 'rfc' | 'puesto' | string>,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
