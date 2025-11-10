<template>
  <!-- Principales -->
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
        <v-icon class="mr-1" color="white" icon="mdi-alert-outline" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Nota:</span>
        los campos marcados con (*) son obligatorios para continuar con el proceso.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaFechaDeAlta -->
  <div v-if="name === 'ayudaFechaDeAlta'" style="pointer-events: auto; cursor: help">
    <v-tooltip location="bottom">
      <template #activator="{ props: tooltipProps }">
        <v-icon v-bind="tooltipProps" icon="mdi-information-slab-circle-outline" size="20" />
      </template>
      <template #default>
        <v-card
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

  <!-- ayudaTipoDeContrato -->
  <v-card
    v-if="name === 'ayudaTipoDeContrato'"
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

  <!-- ayudaApellidoPaterno -->
  <v-card
    v-if="name === 'ayudaApellidoPaterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
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

  <!-- ayudaApellidoMaterno -->
  <v-card
    v-if="name === 'ayudaApellidoMaterno'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
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

  <!-- ayudaNombres -->
  <v-card
    v-if="name === 'ayudaNombres'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
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

  <!-- ayudaTipoDePeriodo-->
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

  <!-- ayudaSalarioDiario -->
  <v-card
    v-if="name === 'ayudaSalarioDiario'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
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

  <!-- ayudaBaseCotizacion -->
  <v-card
    v-if="name === 'ayudaBaseCotizacion'"
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

  <!-- ayudaSBCParteFija -->
  <v-card
    v-if="name === 'ayudaSBCParteFija'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
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

  <!-- ayudaSBCParteVariable-->
  <v-card
    v-if="name === 'ayudaSBCParteVariable'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Sueldo base de cotización variable.</v-col>
    </v-row>
  </v-card>

  <!-- ayudaSBCTopado -->
  <v-card
    v-if="name === 'ayudaSBCTopado'"
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
        Salario Base de Cotización (SBC) utilizado para el cálculo de cuotas y aportaciones. Este
        valor se encuentra topado a 25 UMA, conforme a lo establecido por la ley.
      </v-col>
    </v-row>
  </v-card>

  <!-- Generales -->
  <!-- ayudaDepartamento -->
  <v-card
    v-if="name === 'ayudaDepartamento'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Identificador del <b>Departamento</b> al que pertenece el empleado.</v-col>
    </v-row>
  </v-card>

  <!-- ayudaPuesto -->
  <v-card
    v-if="name === 'ayudaPuesto'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Identificador del <b>Puesto</b> al que pertenece el empleado.</v-col>
    </v-row>
  </v-card>

  <!-- ayudaSindicalizado -->
  <v-card
    v-if="name === 'ayudaSindicalizado'"
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
        Indique si el empleado pertenece a un sindicato. Seleccione si el empleado está
        sindicalizado o no, según su situación laboral.
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

  <!-- ayudaTipoDePrestacion -->
  <v-card
    v-if="name === 'ayudaTipoDePrestacion'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Identificador del <b>tipo de prestación</b> asignado al empleado.</v-col>
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

  <!-- ayudaBaseDePago -->
  <v-card
    v-if="name === 'ayudaBaseDePago'"
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
        Seleccione el <b>Tipo de base de pago</b> que corresponde al esquema laboral del empleado.
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

  <!-- ayudaMetodoDePago -->
  <v-card
    v-if="name === 'ayudaMetodoDePago'"
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
        Seleccione el método de pago correspondiente según la forma en que se realizará el pago de
        nómina.
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

  <!-- ayudaTurnoDeTrabajo -->
  <v-card
    v-if="name === 'ayudaTurnoDeTrabajo'"
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
        Elija el turno laboral correspondiente al empleado según su horario establecido.
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

  <!-- ayudaZonaDeSalario -->
  <v-card
    v-if="name === 'ayudaZonaDeSalario'"
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
        Indica la zona salarial asignada al empleado conforme a las disposiciones vigentes para el
        cálculo de sueldos y prestaciones.
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

  <!-- ayudaTipoJornada -->
  <v-card
    v-if="name === 'ayudaTipoJornada'"
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
        Seleccione y guarde el tipo de jornada correspondiente, de acuerdo con la clasificación
        establecida por el SAT.
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

  <!-- ayudaRegimenFiscal -->
  <v-card
    v-if="name === 'ayudaRegimenFiscal'"
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
        Indique la clave correspondiente al Régimen Fiscal del contribuyente, según las disposiciones
        y catálogos emitidos por el SAT.
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

  <!-- Datos GAPE -->
  <!-- ayudaFechaDeAltaConGape -->
  <div v-if="name === 'ayudaFechaDeAltaConGape'" style="pointer-events: auto; cursor: help">
    <v-tooltip location="bottom">
      <template #activator="{ props: tooltipProps }">
        <v-icon v-bind="tooltipProps" icon="mdi-information-slab-circle-outline" size="20" />
      </template>
      <template #default>
        <v-card
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
              Fecha con la que se dan de alta a los trabajadores formalmente en GAPE, la cual
              corresponde a la fecha de implementación y contratación de servicios, y a las
              contrataciones subsecuentes.
            </v-col>
          </v-row>
          <v-divider class="border-opacity-50 my-2" />
          <v-row>
            <v-col cols="1" class="d-flex align-center justify-center">
              <v-icon class="mr-1" color="white" icon="mdi-lightbulb-on-outline" />
            </v-col>
            <v-col cols="11">
              <span style="font-weight: bold; color: #2a73c5">Nota:</span>
              Esta fecha coincidirá con la <b style="color: #2a73c5"><i>FECHA DE ALTA</i></b> cuando
              el ingreso del colaborador sea posterior a la implementación del servicio que GAPE
              presta al cliente.
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
    </v-tooltip>
  </div>
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
