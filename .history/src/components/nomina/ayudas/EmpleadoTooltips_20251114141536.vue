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
        Seleccione el <b style="color: #2a73c5"><i>CLIENTE</i></b> para el que desea registrar
        nuevos empleados.
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
              <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        <span style="font-weight: bold; color: #2a73c5">Advertencia:</span>
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
        Seleccione el tipo de jornada correspondiente, de acuerdo con la clasificación establecida
        por el SAT.
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
        Indique la clave correspondiente al <b>Régimen Fiscal</b> del contribuyente, según las
        disposiciones y catálogos emitidos por el SAT.
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

  <!-- ayudaNumeroFonacot -->
  <v-card
    v-if="name === 'ayudaNumeroFonacot'"
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
        Ingrese el número identificador del cliente <b><i>FONACOT</i></b
        >. Este número permite vincular la empresa con el sistema del instituto para aplicar
        descuentos y retenciones correspondientes.
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

  <!-- ayudaAfore -->
  <v-card
    v-if="name === 'ayudaAfore'"
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
        Capture el número de cuenta de la Administradora de Fondos para el Retiro (AFORE)
        correspondiente al empleado.
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

  <!-- ayudaCorreoElectronico -->
  <v-card
    v-if="name === 'ayudaCorreoElectronico'"
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
        Correo electrónico registrado del empleado que se utilizará para el envío automático del
        archivo XML de su CFDI de nómina. Este dato es requerido para la distribución electrónica de
        los comprobantes fiscales.
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

  <!-- IMMS, Infonavit -->
  <!-- ayudaNumeroSeguridadSocial -->
  <v-card
    v-if="name === 'ayudaNumeroSeguridadSocial'"
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
        Capture el número del Seguro Social correspondiente al empleado, tal como aparece en su
        documento oficial del IMSS.
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

  <!-- ayudaRegistroPatronal -->
  <v-card
    v-if="name === 'ayudaRegistroPatronal'"
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
        Asigne la clave única asignada por el IMSS a la empresa para identificarla como patrón en
        los trámites y registros de seguridad social.
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

  <!-- ayudaUMF -->
  <v-card
    v-if="name === 'ayudaUMF'"
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
        Ingrese la Unidad de Medicina Familiar (UMF) del empleado, que indica el centro médico del
        IMSS donde recibe atención. Este dato es requerido para el registro y control de afiliación.
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

  <!-- ayudaEstadoCivil -->
  <v-card
    v-if="name === 'ayudaEstadoCivil'"
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
        Indique el estado civil correspondiente al empleado según su situación actual.
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

  <!-- ayudaSexo -->
  <v-card
    v-if="name === 'ayudaSexo'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11"> Seleccione el sexo del empleado. </v-col>
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

  <!-- ayudaFechaDeNacimiento -->
  <div v-if="name === 'ayudaFechaDeNacimiento'" style="pointer-events: auto; cursor: help">
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
              Ingrese la fecha de nacimiento del empleado. Asegúrese de que coincida con la
              registrada en su documentación oficial.
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

  <!-- ayudaEntidadFederativaNacimiento -->
  <v-card
    v-if="name === 'ayudaEntidadFederativaNacimiento'"
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
        Indique la entidad federativa donde nació el empleado, conforme a su documentación oficial.
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

  <!-- ayudaCiudadNacimiento -->
  <v-card
    v-if="name === 'ayudaCiudadNacimiento'"
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
        Ingrese la ciudad de nacimiento del empleado, tal como aparece en su acta de nacimiento o en
        la información oficial registrada ante el RENAPO.
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

  <!-- ayudaHomoclave -->
  <v-card
    v-if="name === 'ayudaHomoclave'"
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
        Ingrese la homoclave de tres caracteres que complementa el RFC del empleado, asignada por el
        SAT para evitar duplicidades en los registros fiscales.
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

  <!-- ayudaCURP -->
  <v-card
    v-if="name === 'ayudaCURP'"
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
        Capture la CURP correspondiente al empleado, conforme a su documentación oficial.
      </v-col>
    </v-row>
    <v-divider class="border-opacity-50 my-2 mx-2" />
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-file-rotate-left" />
      </v-col>
      <v-col cols="11">
        <span style="font-weight: bold; color: #2a73c5">Campo dependiente:</span>
        desactive casilla de verificación de
        <b style="color: #2a73c5"><i>Extranjero sin CURP</i></b> del campo
        <b style="color: #2a73c5"><i>BASE DE COTIZACIÓN</i></b> para poder habilitar este campo.
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

  <!-- ayudaExtranjeroSinCurp -->
  <v-card
    v-if="name === 'ayudaExtranjeroSinCurp'"
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
        Active esta casilla cuando el empleado sea extranjero y no tenga CURP, de acuerdo con su
        situación migratoria. Esta opción permitirá registrar al empleado sin dicho requisito.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaDireccion -->
  <v-card
    v-if="name === 'ayudaDireccion'"
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
        Active esta casilla cuando el empleado sea extranjero y no tenga CURP, de acuerdo con su
        situación migratoria. Esta opción permitirá registrar al empleado sin dicho requisito.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaPoblacion -->
  <v-card
    v-if="name === 'ayudaPoblacion'"
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
        Ingrese la población o localidad que forma parte de la dirección del empleado, conforme al
        comprobante de domicilio.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaEntidadFederativaDomicilio -->
  <v-card
    v-if="name === 'ayudaEntidadFederativaDomicilio'"
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
        Seleccione la entidad federativa asociada al domicilio del empleado, conforme a su
        comprobante de domicilio.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaCodigoPostal -->
  <v-card
    v-if="name === 'ayudaCodigoPostal'"
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
        Capture el código postal del domicilio del empleado, conforme al comprobante de domicilio.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaTelefono -->
  <v-card
    v-if="name === 'ayudaTelefono'"
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
        Ingrese el número de teléfono del empleado (fijo o móvil). Este dato se utiliza para fines
        de contacto y registro administrativo.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaPadre -->
  <v-card
    v-if="name === 'ayudaPadre'"
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
        Ingrese el nombre del padre del empleado. Este dato se utiliza para complementar la
        información personal y de identificación del trabajador.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaMadre -->
  <v-card
    v-if="name === 'ayudaMadre'"
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
        Ingrese el nombre de la madre del empleado. Este dato se utiliza para completar la
        información personal y documental del trabajador.
      </v-col>
    </v-row>
  </v-card>

  <!-- Sueldos y salarios -->
  <!-- ayudaSueldoVariable -->
  <v-card
    v-if="name === 'ayudaSueldoVariable'"
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
        Indica el importe actual del sueldo variable correspondiente al empleado.
      </v-col>
    </v-row>
  </v-card>

  <!-- ayudaFechaSueldoVariable -->
  <div v-if="name === 'ayudaFechaSueldoVariable'" style="pointer-events: auto; cursor: help">
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
              Registre la fecha en que comenzó a aplicarse el sueldo variable del empleado. Este
              dato se utiliza para el control de movimientos salariales y el cálculo de percepciones
              en nómina.
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

  <!-- ayudaFechaSueldoDiario -->
  <div v-if="name === 'ayudaFechaSueldoDiario'" style="pointer-events: auto; cursor: help">
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
              Ingrese la fecha de nacimiento del empleado. Asegúrese de que coincida con la
              registrada en su documentación oficial.
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

  <!-- ayudaSueldoPromedio -->
  <v-card
    v-if="name === 'ayudaSueldoPromedio'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11">Capture el monto correspondiente al salario promedio del empleado.</v-col>
    </v-row>
  </v-card>

  <!-- ayudaFechaSueldoPromedio -->
  <div v-if="name === 'ayudaFechaSueldoPromedio'" style="pointer-events: auto; cursor: help">
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
              Capture la fecha de inicio de vigencia del salario promedio correspondiente al
              empleado.
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-tooltip>
  </div>

  <!-- ayudaFechaSueldoIntegrado -->
  <div v-if="name === 'ayudaFechaSueldoIntegrado'" style="pointer-events: auto; cursor: help">
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
              Capture la fecha de inicio de vigencia del sueldo integrado correspondiente al
              empleado.
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-tooltip>
  </div>

  <!-- ayudaSueldoBaseLiquidacion -->
  <v-card
    v-if="name === 'ayudaSueldoBaseLiquidacion'"
    :max-width="$vuetify.display.smAndDown ? '90vw' : '40vw'"
    class="pa-3"
    color="transparent"
    elevation="0"
  >
    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon icon="mdi-information-slab-circle-outline" />
      </v-col>
      <v-col cols="11"
        >Corresponde al monto del sueldo base considerado para el cálculo de la liquidación.</v-col
      >
    </v-row>
  </v-card>

  <!-- ayudaSueldoDelAjusteAlNeto -->
  <v-card
    v-if="name === 'ayudaSueldoDelAjusteAlNeto'"
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
        Corresponde al monto ajustado que puede resultar a favor o en contra del empleado tras
        aplicar el ajuste a neto.
      </v-col>
    </v-row>
  </v-card>

  <!-- Pagos y extras -->
  <!-- ayudaBancoParaPagoElectronico -->
  <v-card
    v-if="name === 'ayudaBancoParaPagoElectronico'"
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
        Número de banco para el pago electrónico, conforme al catálogo publicado por el SAT. El
        valor debe contener <b style="color: #2a73c5"><i>3 caracteres</i></b
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
2

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
