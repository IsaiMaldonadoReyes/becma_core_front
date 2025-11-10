<template>
  <!-- Código -->
  <v-card
    v-if="name === 'ayudaCodigo'"
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
  <div v-if="name === 'ayudaFechaDeAlta'" style="pointer-events: auto; cursor: help">
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

  <!-- Tipo de contrato -->
  <v-card
    v-if="name === 'ayudaTipoDeContrato'"
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
        Permite identificar el tipo de contrato con base al nuevo catálogo del SAT.
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

  <!-- Apellido paterno -->
  <v-card
    v-if="name === 'ayudaApellidoPaterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Apellido paterno del empleado.</v-col>
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

  <!-- Apellido materno -->
  <v-card
    v-if="name === 'ayudaApellidoMaterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Apellido materno del empleado.</v-col>
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

  <!-- Nombre(s) -->
  <v-card
    v-if="name === 'ayudaNombres'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Nombre(s) del empleado.</v-col>
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

  <!-- Tipo de periodo -->
  <v-card
    v-if="name === 'ayudaTipoDePeriodo'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Identificador del tipo de periodo.</v-col>
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

  <!-- Salario diario -->
  <v-card
    v-if="name === 'ayudaSalarioDiario'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Importe del sueldo diario del empleado.</v-col>
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

  <!-- Base de cotización -->
  <v-card
    v-if="name === 'ayudaBaseCotizacion'"
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

  <!-- SBC Parte fija -->
  <v-card
    v-if="name === 'ayudaSBCParteFija'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Sueldo base de cotización fijo.</v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5"> Campo dependiente: </span>
        debe seleccionar primero la opción
        <b style="color: #2a73c5"><i>Fijo</i></b> del campo
        <b style="color: #2a73c5"><i>BASE DE COTIZACIÓN</i></b> para poder habilitar este campo.
      </v-col>
    </v-row>
  </v-card>

  <!-- SBC Parte variable-->
  <v-card
    v-if="name === 'ayudaSBCParteVariable'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="py-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Sueldo base de cotización variable.</v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5"> Campo dependiente: </span>
        debe seleccionar primero la opción
        <b style="color: #2a73c5"><i>Variable</i></b> del campo
        <b style="color: #2a73c5"><i>BASE DE COTIZACIÓN</i></b> para poder habilitar este campo.
      </v-col>
    </v-row>
  </v-card>

  <!-- SBC Parte topado a 25 UMA-->
  <v-card
    v-if="name === 'ayudaSBCTopado'"
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
        >Salario Base de Cotización (SBC) utilizado para el cálculo de cuotas y aportaciones. Este
        valor se encuentra topado a 25 UMA, conforme a lo establecido por la ley.</v-col
      >
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5"> Campo dependiente: </span>
        debe seleccionar primero la opción
        <b style="color: #2a73c5"><i>Mixto</i></b> del campo
        <b style="color: #2a73c5"><i>BASE DE COTIZACIÓN</i></b> para poder habilitar este campo.
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
