<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      right
      flat
      width="350px"
      elevation="0"
      absolute
      clipped
      color="#F7FCFF"
    >
      <v-card class="ma-5" height="calc(100% - 40px)">
        <v-tabs-items v-model="tabPrincipal">
          <!--Filtro venta por concepto-->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="empresa"
                :items="empresas"
                clearable
                color="primary"
                hide-selected
                item-text="nombre"
                item-value="id"
                label="Empresa"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.nombre }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.nombre }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dates"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    v-model="dateRangeText"
                    v-bind="attrs"
                    chips
                    clearable
                    label="Rango de fechas"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    small-chips
                    v-on="on"
                  >
                    <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" color="primary" :input-value="selected" label small>
                        <span class="pr-2" style="color: white">
                          {{ item }}
                        </span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-chip color="primary" dark label small>
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </template>
                <v-date-picker
                  v-model="dates"
                  range
                  scrollable
                  color="primary"
                  locale="es-MX"
                  show-week
                  year-icon="mdi-calendar-blank"
                  @change="listaConceptosVenta()"
                >
                  <v-btn
                    color="primary"
                    width="32px"
                    height="32px"
                    min-width="32px"
                    @click="menu = false"
                  >
                    <v-icon color="white"> mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    width="32px"
                    height="32px"
                    min-width="32px"
                    color="primary"
                    @click="$refs.menu.save(dates)"
                  >
                    <v-icon color="white"> mdi-check-bold</v-icon>
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-autocomplete
                v-model="concepto"
                :items="conceptos"
                clearable
                color="primary"
                hide-selected
                item-text="CNOMBRECONCEPTO"
                item-value="CIDCONCEPTODOCUMENTO"
                label="Conceptos"
                multiple
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-label-outline"
                small-chips
                @change="labelsGrafica1()"
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.CNOMBRECONCEPTO }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.CNOMBRECONCEPTO }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-card-text>
          </v-tab-item>

          <!--Filtro venta por marca-->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="empresaR2"
                :items="empresasR2"
                clearable
                color="primary"
                hide-selected
                item-text="nombre"
                item-value="id"
                label="Empresa"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.nombre }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.nombre }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-menu
                ref="menuR2"
                v-model="menuR2"
                :close-on-content-click="false"
                :return-value.sync="datesR2"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    v-model="dateRangeTextR2"
                    v-bind="attrs"
                    chips
                    clearable
                    label="Rango de fechas"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    small-chips
                    v-on="on"
                  >
                    <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" color="primary" :input-value="selected" label small>
                        <span class="pr-2" style="color: white">
                          {{ item }}
                        </span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-chip color="primary" dark label small>
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </template>
                <v-date-picker
                  v-model="datesR2"
                  range
                  scrollable
                  color="primary"
                  locale="es-MX"
                  show-week
                  year-icon="mdi-calendar-blank"
                  @change="listaMarcasComercial()"
                >
                  <v-btn
                    color="primary"
                    width="32px"
                    height="32px"
                    min-width="32px"
                    @click="menuR2 = false"
                  >
                    <v-icon color="white"> mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    width="32px"
                    height="32px"
                    min-width="32px"
                    color="primary"
                    @click="$refs.menuR2.save(datesR2)"
                  >
                    <v-icon color="white"> mdi-check-bold</v-icon>
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-autocomplete
                v-model="marca"
                :items="marcas"
                color="primary"
                item-text="cvalorclasificacion"
                item-value="cidvalorclasificacion"
                label="Marca"
                multiple
                outlined
                small-chips
                hide-selected
                prepend-inner-icon="mdi-label-outline"
                clearable
                @change="labelsGrafica2()"
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.cvalorclasificacion }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.cvalorclasificacion }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <div class="switch-container">
                <span>{{ labelFalse }}</span>
                <!-- Etiqueta izquierda -->
                <v-switch v-model="filtroTipoR2" inset @change="labelsGrafica2()"></v-switch>
                <!-- Switch -->
                <span>{{ labelTrue }}</span>
                <!-- Etiqueta derecha -->
              </div>
            </v-card-text>
          </v-tab-item>

          <!--Filtro venta por clientes-->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="empresaR3"
                :items="empresasR3"
                clearable
                color="primary"
                hide-selected
                item-text="nombre"
                item-value="id"
                label="Empresa"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.nombre }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.nombre }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-menu
                ref="menuR3"
                v-model="menuR3"
                :close-on-content-click="false"
                :return-value.sync="datesR2"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    v-model="dateRangeTextR3"
                    v-bind="attrs"
                    chips
                    clearable
                    label="Rango de fechas"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    small-chips
                    v-on="on"
                  >
                    <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" color="primary" :input-value="selected" label small>
                        <span class="pr-2" style="color: white">
                          {{ item }}
                        </span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-chip color="primary" dark label small>
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </template>
                <v-date-picker
                  v-model="datesR3"
                  range
                  scrollable
                  color="primary"
                  locale="es-MX"
                  show-week
                  year-icon="mdi-calendar-blank"
                  @change="listaClientesComercial()"
                >
                  <v-btn
                    color="primary"
                    width="32px"
                    height="32px"
                    min-width="32px"
                    @click="menuR3 = false"
                  >
                    <v-icon color="white"> mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    width="32px"
                    height="32px"
                    min-width="32px"
                    color="primary"
                    @click="$refs.menuR3.save(datesR3)"
                  >
                    <v-icon color="white"> mdi-check-bold</v-icon>
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-autocomplete
                v-model="cliente"
                :items="clientes"
                color="primary"
                item-text="CRAZONSOCIAL"
                item-value="CIDCLIENTEPROVEEDOR"
                label="Clientes"
                multiple
                outlined
                small-chips
                hide-selected
                prepend-inner-icon="mdi-label-outline"
                clearable
                @change="labelsGrafica3()"
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.CRAZONSOCIAL }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.CRAZONSOCIAL }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <div class="switch-container">
                <span>{{ labelFalse }}</span>
                <!-- Etiqueta izquierda -->
                <v-switch v-model="filtroTipoR3" inset @change="labelsGrafica3()"></v-switch>
                <!-- Switch -->
                <span>{{ labelTrue }}</span>
                <!-- Etiqueta derecha -->
              </div>
            </v-card-text>
          </v-tab-item>
          <!--Filtro venta por agente-->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="empresaR4"
                :items="empresasR4"
                clearable
                color="primary"
                hide-selected
                item-text="nombre"
                item-value="id"
                label="Empresa"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.nombre }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.nombre }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-menu
                ref="menuR4"
                v-model="menuR4"
                :close-on-content-click="false"
                :return-value.sync="datesR4"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    v-model="dateRangeTextR4"
                    v-bind="attrs"
                    chips
                    clearable
                    label="Rango de fechas"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    small-chips
                    v-on="on"
                  >
                    <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" color="primary" :input-value="selected" label small>
                        <span class="pr-2" style="color: white">
                          {{ item }}
                        </span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-chip color="primary" dark label small>
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </template>
                <v-date-picker
                  v-model="datesR4"
                  range
                  scrollable
                  color="primary"
                  locale="es-MX"
                  show-week
                  year-icon="mdi-calendar-blank"
                  @change="listaAgentesComercial()"
                >
                  <v-btn
                    color="primary"
                    width="32px"
                    height="32px"
                    min-width="32px"
                    @click="menuR4 = false"
                  >
                    <v-icon color="white"> mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    width="32px"
                    height="32px"
                    min-width="32px"
                    color="primary"
                    @click="$refs.menuR4.save(datesR4)"
                  >
                    <v-icon color="white"> mdi-check-bold</v-icon>
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-autocomplete
                v-model="agente"
                :items="agentes"
                color="primary"
                item-text="CNOMBREAGENTE"
                item-value="CIDAGENTE"
                label="Agentes"
                multiple
                outlined
                small-chips
                hide-selected
                prepend-inner-icon="mdi-label-outline"
                clearable
                @change="labelsGrafica4()"
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.CNOMBREAGENTE }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.CNOMBREAGENTE }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <div class="switch-container">
                <span>{{ labelFalse }}</span>
                <!-- Etiqueta izquierda -->
                <v-switch v-model="filtroTipoR4" inset @change="labelsGrafica4()"></v-switch>
                <!-- Switch -->
                <span>{{ labelTrue }}</span>
                <!-- Etiqueta derecha -->
              </div>
            </v-card-text>
          </v-tab-item>
          <!--Filtro presupuestos -->
          <v-tab-item>
            <v-card-text>
              <v-autocomplete
                v-model="empresaR5"
                :items="empresasR5"
                clearable
                color="primary"
                hide-selected
                item-text="nombre"
                item-value="id"
                label="Empresa"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
                @change="obtenerEjerciciosPorEmpresa()"
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.nombre }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.nombre }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="ejercicioR5"
                :items="ejerciciosR5"
                clearable
                color="primary"
                hide-selected
                item-text="CEJERCICIO"
                item-value="CIDEJERCICIO"
                label="Ejercicio"
                no-data-text="No hay información disponible"
                outlined
                prepend-inner-icon="mdi-briefcase-variant-outline"
                small-chips
                @change="obtenerVendedorMarcasR5()"
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :input-value="selected"
                    color="primary"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.CEJERCICIO }}
                    </span>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.CEJERCICIO }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="marcaR5"
                :items="marcasR5"
                color="primary"
                item-text="marca"
                item-value="id_marca"
                label="Marcas"
                multiple
                outlined
                small-chips
                hide-selected
                prepend-inner-icon="mdi-label-outline"
                clearable
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.marca }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.marca }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="agenteR5"
                :items="agentesR5"
                color="primary"
                item-text="CNOMBREAGENTE"
                item-value="CIDAGENTE"
                label="Agentes"
                outlined
                small-chips
                hide-selected
                prepend-inner-icon="mdi-label-outline"
                clearable
              >
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    color="primary"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2" style="color: white">
                      {{ item.CNOMBREAGENTE }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)" color="white"> $delete </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip color="primary" dark label small>
                    {{ item.CNOMBREAGENTE }}
                  </v-chip>
                </template>
              </v-autocomplete>
              <v-menu
                ref="menuR5"
                v-model="menuR5"
                :close-on-content-click="false"
                :return-value.sync="datesR5"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-combobox
                    v-model="dateRangeTextR5"
                    v-bind="attrs"
                    chips
                    clearable
                    label="Periodo(s)"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    small-chips
                    v-on="on"
                  >
                    <template v-slot:selection="{ attrs, item, selected }">
                      <v-chip v-bind="attrs" color="primary" :input-value="selected" label small>
                        <span class="pr-2" style="color: white">
                          {{ item }}
                        </span>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-chip color="primary" dark label small>
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </template>
                <v-date-picker
                  v-model="datesR5"
                  range
                  scrollable
                  no-title
                  locale="es-MX"
                  type="month"
                  color="primary"
                  min="2024-01-01"
                  max="2024-12-31"
                  prev-icon=""
                  next-icon=""
                  @change="datosR5()"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    width="32px"
                    height="32px"
                    min-width="32px"
                    @click="menuR5 = false"
                  >
                    <v-icon color="white"> mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    width="32px"
                    height="32px"
                    min-width="32px"
                    color="primary"
                    @click="$refs.menuR5.save(datesR5)"
                  >
                    <v-icon color="white"> mdi-check-bold</v-icon>
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-navigation-drawer>
    <v-row dense>
      <v-col>
        <v-breadcrumbs class="text-h5" :items="vbrePrincipalItems" divider="|">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar" color="primary" />
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider class="border-opacity-25" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <Bar :options="chartOptions" :data="chartData" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, mergeProps, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export interface Elementos {
  codigo: string
  descripcion: string
  nombre: string
}

export default defineComponent({
  name: 'VentasPorMarcasChart',
  components: { Bar },

  setup() {
    // breadcrumbs
    const vbrePrincipalItems = ref([
      {
        disabled: false,
        href: 'breadcrumbs_dashboard',
        title: 'Panel de resultados',
      },
      {
        disabled: false,
        href: 'breadcrumbs_link_1',
        title: 'Ventas por marcas',
      },
    ])

    // Bar

    const chartData = ref({
      labels: ['January', 'February', 'March'],
      datasets: [{ label: 'Dataset 1', data: [40, 20, 12] }],
    })

    const chartOptions = ref({ responsive: true })

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    return {
      chartData,
      chartOptions,
      mergeProps,
      smAndDown,
      toRaw,
      vbrePrincipalItems,
    }
  },
})
</script>
