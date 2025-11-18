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
        elija un cliente para mostrar únicamente las empresas asociadas y continuar con el proceso
        de ejecución de cálculo de prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-cursor-default-click" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Evento:</span>
        al seleccionar una opción en este campo, se habilitará:
        <b style="color: #2a73c5"><i>TIPO DE EMPRESA</i></b>
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaFiltroTipoEmpresa -->
  <v-card
    v-if="name === 'ayudaFiltroTipoEmpresa'"
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
        <span style="font-weight: bold; color: #2a73c5">Instruccións:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
        debe seleccionar primero
        <b style="color: #2a73c5"><i>CLIENTE</i></b> para poder habilitar este campo.
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
        correspondiente de:
        <b style="color: #2a73c5"><i>EMPRESA</i></b>
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
        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
        seleccione la empresa donde se registrarán los nuevos empleados.
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
  </v-card>

  <!-- ayudaEjercicio -->
  <v-card
    v-if="name === 'ayudaEjercicio'"
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
        elija el año o ejercicio fiscal correspondiente para realizar el cálculo de la prenómina.
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

  <!-- ayudaTipoDePeriodo -->
  <v-card
    v-if="name === 'ayudaTipoDePeriodo'"
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
        indique el tipo de periodo que se utilizará para el cálculo de la prenómina.
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

  <!-- ayudaPeriodoInicial -->
  <v-card
    v-if="name === 'ayudaPeriodoInicial'"
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
        Seleccione el periodo inicial desde el cual se iniciará el cálculo de la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        el periodo inicial debe ser anterior o inferior al
        <b style="color: #2a73c5"><i>Periodo final</i></b
        >.
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

  <!-- ayudaPeriodoFinal -->
  <v-card
    v-if="name === 'ayudaPeriodoFinal'"
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
        elija el periodo final hasta el cual se realizará el cálculo de la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este periodo debe ser mayor que o posterior a el
        <b style="color: #2a73c5"><i>Periodo inicial</i></b
        >.
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

  <!-- ayudaDepartamentoInicial -->
  <v-card
    v-if="name === 'ayudaDepartamentoInicial'"
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
        elija el departamento inicial a partir del cual se considerarán en el proceso de cálculo de
        la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo debe ser anterior o inferior al
        <b style="color: #2a73c5"><i>Departamento final</i></b
        >.
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

  <!-- ayudaDepartamentoFinal -->
  <v-card
    v-if="name === 'ayudaDepartamentoFinal'"
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
        elija el departamento final, que será el último departamento considerado dentro del rango
        para el cálculo de la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo debe ser mayor que o posterior a el
        <b style="color: #2a73c5"><i>Departamento inicial</i></b
        >.
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

  <!-- ayudaEmpleadoInicial -->
  <v-card
    v-if="name === 'ayudaEmpleadoInicial'"
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
        elija el empleado inicial, a partir del cual se considerará el rango de empleados para
        ejecutar el cálculo de la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo debe ser anterior o inferior al
        <b style="color: #2a73c5"><i>Empleado final</i></b
        >.
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

  <!-- ayudaEmpleadoFinal -->
  <v-card
    v-if="name === 'ayudaEmpleadoFinal'"
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
        Elija el empleado final, es decir, el último empleado que será considerado dentro del rango
        para el cálculo de la prenómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        este campo debe ser mayor que o posterior a el
        <b style="color: #2a73c5"><i>Empleado inicial</i></b
        >.
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

  <!-- ayudaCodigo -->
  <v-card
    v-if="name === 'ayudaCodigo'"
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
        Código único que se asigna al empleado para su identificación en los procesos de nómina.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        el sistema genera el código del empleado según el tipo de empresa: <br /><br />
        - <b style="color: #2a73c5"><i>Fiscal:</i></b> usa el último consecutivo de CONTPAQi
        Nóminas. <br />- <b style="color: #2a73c5"><i>No fiscal:</i></b> usa el consecutivo
        configurado en la empresa. <br /><br />Si la empresa no fiscal no tiene máscara de código,
        no se asignará ningún valor automáticamente.
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'PrenominaTooltips',
  props: {
    name: {
      type: String as PropType<'baseCotizacion' | 'codigo' | 'curp' | 'rfc' | 'puesto' | string>,
      required: true,
    },
  },
  setup(props, { emit }) {},
})
</script>
