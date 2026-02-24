<template>
  <!-- Principales -->

  <!-- ayudaNombre -->
  <v-card
    v-if="name === 'ayudaNombre'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo es únicamente informativo; por este motivo, se muestra deshabilitado.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaApellidoPaterno -->
  <v-card
    v-if="name === 'ayudaApellidoPaterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo es únicamente informativo; por este motivo, se muestra deshabilitado.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaApellidoMaterno -->
  <v-card
    v-if="name === 'ayudaApellidoMaterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo es únicamente informativo; por este motivo, se muestra deshabilitado.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaCorreo -->
  <v-card
    v-if="name === 'ayudaCorreo'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo es únicamente informativo; por este motivo, se muestra deshabilitado.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaPassword -->
  <v-card
    v-if="name === 'ayudaPassword'"
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
        ingrese la nueva contraseña.
        <b style="color: #2a73c5"><i>Empresa</i></b
        >.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaPasswordConfirm -->
  <v-card
    v-if="name === 'ayudaPasswordConfirm'"
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
        confirme la nueva contraseña.
        <b style="color: #2a73c5"><i>Empresa</i></b
        >.
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'CuentaTooltips',
  props: {
    name: {
      type: String as PropType<
        | 'ayudaNombre'
        | 'ayudaApellidoPaterno'
        | 'ayudaApellidoMaterno'
        | 'ayudaCorreo'
        | 'ayudaPassword'
        | 'ayudaPasswordConfirm'
        | string
      >,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
