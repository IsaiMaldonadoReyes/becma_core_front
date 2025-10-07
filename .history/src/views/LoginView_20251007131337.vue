<template>
  <v-container ref="vconPrincipalRef" class="fill-height login-body" fluid>
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <v-row>
      <v-img
        src="https://salorma.com/wp-content/uploads/2023/01/Salorma-Pharma-logo.png"
        contain
        :style="{
          left: '40%',
          position: 'absolute',
          transform: smAndDown ? 'translateY(20px)' : 'translateY(-60px)',
          width: '150px',
          zIndex: 1,
        }"
      />
      <!-- vtimContenidoRef Responsive -->
      <v-col v-if="smAndDown" cols="12" md="2" ref="vtimContenidoRef">
        <v-timeline
          align="center"
          class="pa-3"
          direction="horizontal"
          line-inset="5"
          side="start"
          truncate-line="both"
          :style="{
            zIndex: 1,
            transform: 'translateY(85px)',
          }"
        >
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="step.value"
            :dot-color="itemColor(i)"
            :line-color="itemColor(i)"
            class="cursor-pointer"
            fill-dot
            size="60px"
            @click="goTo(i)"
          >
            <template v-slot:icon>
              <v-icon
                size="30px"
                :color="i < current ? 'white' : i === current ? '#722B81' : '#722B81'"
                :icon="i < current ? 'mdi-check' : i === current ? 'mdi-progress-clock' : step.icon"
              />
            </template>

            <v-card
              :width="getTimelineItemWidth"
              :style="{
                fontSize: '14px',
                color: '#722B81',
              }"
              class="d-flex align-center justify-center text-center rounded-lg"
              color="#E1DDE8"
              elevation="16"
              min-height="60px"
            >
              {{ step.title }}
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col ref="vcarContenidoRef" class="d-flex align-center justify-end" cols="12" md="9">
        <vue3-lottie
          v-if="!smAndDown"
          :animation-link="'/src/assets/images/doctor4.json'"
          height="400px"
          width="400px"
          style="bottom: 0; height: 400px; left: 0; position: absolute; width: 400px; z-index: 1"
        />

        <v-row justify="end">
          <v-col cols="12" md="9">
            <v-card
              :class="{
                'rounded-lg': true,
                'pa-15': !smAndDown,
                'px-5': smAndDown,
                'pt-16': smAndDown,
                'ma-5': smAndDown,
              }"
              :style="getCardContenidoHeight"
              color="#E6E6E6"
              elevation="16"
            >
              <v-tabs-window v-model="current" color="transparent">
                <!--Paso 1-->
                <v-tabs-window-item key="s1" value="s1" color="transparent">
                  <!-- vrowTituloRef -->
                  <v-row ref="vrowTituloRef">
                    <v-col cols="12" class="d-flex align-center">
                      <v-card-title class="text-h5" style="color: #722b81">
                        <v-icon color="#722b81">mdi-invoice-text</v-icon> 1. Recibo
                      </v-card-title>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-divider class="border-opacity-50" />
                    </v-col>
                  </v-row>

                  <!-- vrowSucursalRef -->
                  <v-row ref="vrowSucursalRef">
                    <v-col cols="10" lg="11">
                      <bec-autocomplete
                        v-model="modelEmpresa"
                        :item-subtitle="(item) => `${item.nombre_base}`"
                        :item-title="'nombre_empresa'"
                        :item-value="'id'"
                        :items="itemsEmpresas"
                        :label="'Empresa'"
                        :multiple="false"
                        :prepend-icon="'mdi-home-city'"
                        :return-object="false"
                        :show-chips="true"
                        :color="'#722b81'"
                        :tooltip="'Seleccione una sucursal para poder agregar recibos'"
                      />
                    </v-col>
                    <v-col cols="2" lg="1" class="d-flex justify-end">
                      <v-tooltip bottom color="primary" interactive>
                        <template v-slot:activator="{ props: tooltipProps }">
                          <v-btn
                            v-bind="mergeProps(tooltipProps)"
                            class="mr-1"
                            color="#722b81"
                            flat
                            height="40px"
                            min-width="40px"
                            width="40px"
                            @click="onOpenModalForm('Recibo')"
                          >
                            <!--:disabled="!modelEmpresa ? true : false"-->
                            <v-icon color="white" icon="mdi-plus" size="24px" />
                          </v-btn>
                        </template>
                        <span>Agregar ticket para facturar</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-divider class="border-opacity-50" />
                    </v-col>
                  </v-row>

                  <!-- vdtiRecibosRef -->
                  <v-data-iterator
                    ref="vdtiRecibosRef"
                    :items="itemsRecibos"
                    :style="getRowTablaRecibosHeight"
                    class="overflow-auto"
                    items-per-page="-1"
                  >
                    <template v-slot:default="{ items }">
                      <v-row>
                        <v-col v-for="item in items" key="id" cols="12" md="12">
                          <v-card
                            class="rounded d-flex justify-center align-center my-2 mx-4 pa-2"
                            color="#f0f0f0"
                            elevation="5"
                            min-height="60px"
                          >
                            <v-row v-if="!smAndDown">
                              <v-col :class="{ 'pl-2': true }" cols="12" md="3">
                                <v-card-title
                                  style="color: #722b81; font-size: 10px; font-weight: bold"
                                >
                                  Fecha
                                </v-card-title>
                                <v-card-text>{{ item.raw.fecha }}</v-card-text>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-card-title
                                  style="color: #722b81; font-size: 10px; font-weight: bold"
                                >
                                  Folio
                                </v-card-title>
                                <v-card-text>{{ item.raw.folio }}</v-card-text>
                              </v-col>
                              <v-col class="d-flex align-center justify-end" cols="12" md="3">
                                <v-card-title
                                  class="d-flex align-center justify-end"
                                  style="color: #722b81; font-size: 16px; font-weight: bold"
                                >
                                  $ {{ item.raw.importe }}
                                </v-card-title>
                              </v-col>
                              <v-col class="d-flex justify-end align-center" cols="12" md="2">
                                <!-- vbtnEliminar -->
                                <v-tooltip bottom color="primary" interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="#722B81"
                                      flat
                                      height="40px"
                                      min-width="40px"
                                      width="40px"
                                    >
                                      <v-icon color="white" icon="mdi-delete" size="24px" />
                                    </v-btn>
                                  </template>
                                  <span>Quitar recibo</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                            <v-row v-else class="pa-2">
                              <v-col cols="9">
                                <v-row>
                                  <v-col
                                    class="d-flex align-center"
                                    cols="6"
                                    style="color: #722b81; font-size: 14px; font-weight: bold"
                                  >
                                    Fecha
                                  </v-col>
                                  <v-col cols="6" class="d-flex align-center justify-end">
                                    {{ item.raw.fecha }}
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    style="color: #722b81; font-size: 14px; font-weight: bold"
                                  >
                                    Folio
                                  </v-col>
                                  <v-col cols="6" class="d-flex align-center justify-end">
                                    {{ item.raw.folio }}
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    style="color: #722b81; font-size: 14px; font-weight: bold"
                                  >
                                    Importe
                                  </v-col>
                                  <v-col cols="6" class="d-flex align-center justify-end">
                                    {{ item.raw.importe }}
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="3" class="d-flex align-center justify-end">
                                <!-- vbtnEliminar -->
                                <v-divider vertical class="mr-3 my-2 border-opacity-25" />
                                <v-tooltip bottom color="primary" interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      color="#722B81"
                                      flat
                                      height="40px"
                                      min-width="40px"
                                      width="40px"
                                    >
                                      <v-icon color="white" icon="mdi-delete" size="24px" />
                                    </v-btn>
                                  </template>
                                  <span>Quitar recibo</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </template>
                  </v-data-iterator>

                  <v-row>
                    <v-col>
                      <v-divider class="border-opacity-50 my-2" />
                    </v-col>
                  </v-row>

                  <v-card-actions ref="vactFootRef" class="justify-end">
                    <v-btn
                      border
                      class="text-none mr-2"
                      color="#722B81"
                      height="40px"
                      prepend-icon="mdi-arrow-left-thin"
                      variant="text"
                      width="120px"
                      @click="prev"
                    >
                      Anterior
                    </v-btn>
                    <v-btn
                      append-icon="mdi-arrow-right-thin"
                      class="text-none"
                      color="#722B81"
                      height="40px"
                      variant="flat"
                      width="120px"
                      @click="next"
                    >
                      Siguiente
                    </v-btn>
                  </v-card-actions>
                </v-tabs-window-item>
                <!--Paso 2-->
                <v-tabs-window-item key="s2" value="s2">
                  <!-- vrowTituloRef2 -->
                  <v-row ref="vrowTituloRef2">
                    <v-col cols="12" class="d-flex align-center">
                      <v-card-title class="text-h5" style="color: #722b81">
                        <v-icon color="#722b81">mdi-badge-account</v-icon> 2. Datos fiscales
                      </v-card-title>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-divider class="border-opacity-50" />
                    </v-col>
                  </v-row>

                  <!-- vrowTabMenuRef -->
                  <v-row ref="vrowTabMenuRef">
                    <v-col>
                      <v-tabs
                        v-model="vtabMenuModel"
                        color="#722B81"
                        class="text-medium-emphasis border"
                        grow
                      >
                        <v-tab
                          v-for="tab in vtabGraficaItems"
                          :key="tab.value"
                          :value="tab.value"
                          :variant="vtabMenuModel == tab.value ? 'tonal' : 'text'"
                        >
                          <v-icon left class="px-5" size="24px">{{ tab.icon }}</v-icon>
                          {{ tab.title }}
                        </v-tab>
                      </v-tabs>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-divider class="border-opacity-50" />
                    </v-col>
                  </v-row>

                  <!-- vrowSucursalRef -->
                  <v-tabs-window v-model="vtabMenuModel">
                    <v-tabs-window-item value="tabBarV" eager>
                      <v-row ref="vrowSucursalRef">
                        <v-col cols="12">
                          <bec-text-field
                            v-model="modelEmpresa"
                            :label="'RFC *'"
                            :placeholder="'Ingrese el RFC'"
                            :prepend-icon="'mdi-card-account-details'"
                            :tooltip="'Folio del recibo de compra'"
                            :color="'#722B81'"
                          />
                        </v-col>
                        <v-col cols="12" class="mt-5">
                          <bec-text-field
                            v-model="modelEmpresa"
                            :label="'Razón social *'"
                            :placeholder="'Ingrese el RFC'"
                            :prepend-icon="'mdi-account-credit-card'"
                            :tooltip="'Folio del recibo de compra'"
                            :color="'#722B81'"
                          />
                        </v-col>
                        <v-col cols="12" class="mt-5">
                          <bec-text-field
                            v-model="modelEmpresa"
                            :label="'Correo electrónico *'"
                            :placeholder="'Correo electrónico'"
                            :prepend-icon="'mdi-email'"
                            :tooltip="'Folio del recibo de compra'"
                            :color="'#722B81'"
                          />
                        </v-col>
                        <v-col cols="12" class="mt-5">
                          <bec-text-field
                            v-model="modelEmpresa"
                            :label="'Observaciones'"
                            :placeholder="'Correo electrónico'"
                            :prepend-icon="'mdi-account-eye'"
                            :tooltip="'Folio del recibo de compra'"
                            :color="'#722B81'"
                          />
                        </v-col>
                      </v-row>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="tabBarH" eager>
                      <v-row ref="vrowSucursalRef">
                        <v-card>
                          <v-col cols="6">
                            <bec-text-field
                              v-model="modelEmpresa"
                              :label="'RFC *'"
                              :placeholder="'Ingrese el RFC'"
                              :prepend-icon="'mdi-card-account-details'"
                              :tooltip="'Folio del recibo de compra'"
                              :color="'#722B81'"
                            />
                          </v-col>
                          <v-col cols="6">
                            <bec-text-field
                              v-model="modelEmpresa"
                              :label="'Razón social *'"
                              :placeholder="'Ingrese el RFC'"
                              :prepend-icon="'mdi-account-credit-card'"
                              :tooltip="'Folio del recibo de compra'"
                              :color="'#722B81'"
                            />
                          </v-col>
                          <v-col cols="6" class="mt-5">
                            <bec-text-field
                              v-model="modelEmpresa"
                              :label="'Correo electrónico *'"
                              :placeholder="'Correo electrónico'"
                              :prepend-icon="'mdi-email'"
                              :tooltip="'Folio del recibo de compra'"
                              :color="'#722B81'"
                            />
                          </v-col>
                          <v-col cols="6" class="mt-5">
                            <bec-text-field
                              v-model="modelEmpresa"
                              :label="'Observaciones'"
                              :placeholder="'Correo electrónico'"
                              :prepend-icon="'mdi-account-eye'"
                              :tooltip="'Folio del recibo de compra'"
                              :color="'#722B81'"
                            />
                          </v-col>
                        </v-card>
                      </v-row>
                    </v-tabs-window-item>
                  </v-tabs-window>

                  <v-row>
                    <v-col>
                      <v-divider class="border-opacity-50" />
                    </v-col>
                  </v-row>

                  <v-card-actions ref="vactFootRef" class="justify-end">
                    <v-btn
                      border
                      class="text-none mr-2"
                      color="#722B81"
                      height="40px"
                      prepend-icon="mdi-arrow-left-thin"
                      variant="text"
                      width="120px"
                      @click="prev"
                    >
                      Anterior
                    </v-btn>
                    <v-btn
                      append-icon="mdi-arrow-right-thin"
                      class="text-none"
                      color="#722B81"
                      height="40px"
                      variant="flat"
                      width="120px"
                      @click="next"
                    >
                      Siguiente
                    </v-btn>
                  </v-card-actions>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- vtimContenidoRef-->
      <v-col v-if="!smAndDown" cols="12" md="2" ref="vtimContenidoRef">
        <v-timeline
          align="center"
          class="pa-0 ma-0"
          direction="vertical"
          line-inset="5"
          side="start"
          truncate-line="both"
          :style="{
            zIndex: 1,
            transform: smAndDown ? 'none' : 'translateX(-50px)',
            ...getCardContenidoHeight,
          }"
        >
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="step.value"
            :dot-color="itemColor(i)"
            :line-color="itemColor(i)"
            class="cursor-pointer"
            fill-dot
            size="55px"
            @click="goTo(i)"
          >
            <template v-slot:icon>
              <v-icon
                size="30px"
                :color="i < current ? 'white' : i === current ? '#722B81' : '#722B81'"
                :icon="i < current ? 'mdi-check' : i === current ? 'mdi-progress-clock' : step.icon"
              ></v-icon>
            </template>

            <template v-slot:opposite>
              <div :class="[current === i ? 'text-h5' : 'text-h6']" style="color: white">
                {{ step.title }}
              </div>
              <div class="text-body-2" style="color: #e1dde8">
                {{ step.subtitle }}
              </div>
            </template>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <dialog-information
      :dialog-color="dialogInformation.color"
      :dialog-content="dialogInformation.cuerpo"
      :dialog-icon="dialogInformation.icono"
      :dialog-speed-icon="dialogInformation.velocidad"
      :dialog-title="dialogInformation.titulo"
      :dialog-view="dialogInformation.dialog"
      @close="onCloseDialogInformation"
    />

    <kiosko-modal-form
      :dialog-title="modalFormPropiedades.titulo"
      :dialog-view="modalFormPropiedades.dialog"
      @cancel="onCloseModalForm"
      @close="onCloseModalForm"
      @save="onSaveModalForm"
    />
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, shallowRef, mergeProps, computed, onMounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { Vue3Lottie } from 'vue3-lottie'

// import utils
import { sessionStore } from '@/stores/modules/Core/sesion'

// import interfaces
import type { SistemaModel } from '@/interfaces/core/Sistema'

// import stores
import { useSistemaStore } from '@/stores/modules/Core/sistema'
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { kiosko } from '@/stores/modules/Core/kiosko'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'
import DialogInformation from '@/components/core/dialogMessage/DialogInformation.vue'

// import views
import KioskoModalForm from '@/views/KioskoModalForm.vue'

interface Empresa {
  id: number
  nombre_empresa: string
  nombre_base: string
}

export interface Recibo {
  id: number
  fecha: string
  folio: string
  importe: number
}

export default defineComponent({
  name: 'Login',
  components: {
    DialogInformation,
    Vue3Lottie,
    BecSelect,
    BecAutocomplete,
    BecTextField,
    KioskoModalForm,
  },
  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // 3. Composables | Store
    const dialogStore = useDialogManagerStore()
    const storeKiosko = kiosko()

    // 3. Composables | Store
    const sistemaStore = useSistemaStore()
    const dialogConfirmationStore = useDialogManagerStore()

    // 4. Reactive | dialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

    // 4. Reactive | ref
    const vconPrincipalRef = ref()
    const vcarContenidoRef = ref()
    const vrowTituloRef = ref()
    const vrowSucursalRef = ref()
    const vactFootRef = ref()

    type Step = { value: string; title: string; subtitle?: string; icon?: string }
    const steps: Step[] = [
      {
        value: 's1',
        title: '1. Ticket',
        subtitle: 'Ingresa información del ticket',
        icon: 'mdi-invoice',
      },
      {
        value: 's2',
        title: '2. Datos fiscales',
        subtitle: 'Ingresa información fiscal',
        icon: 'mdi-badge-account-outline',
      },
      {
        value: 's3',
        title: '3. Descarga',
        subtitle: 'Descarga PDF y XML',
        icon: 'mdi-file-download-outline',
      },
    ]

    // 4. Reactive | recibo
    const modelEmpresa = ref<Empresa>()
    const itemsEmpresas = ref<Empresa[]>([])

    const itemsRecibos = ref<Recibo[]>([])

    // Recibos de prueba
    itemsRecibos.value = [
      {
        id: 1,
        fecha: '09/09/2025',
        folio: 'FA01020304',
        importe: 356.45,
      },
      {
        id: 2,
        fecha: '22/09/2025',
        folio: 'FA02030506',
        importe: 489.35,
      },
    ]

    // 4. Reactive | timeline
    const current = ref(0)

    const palette = {
      done: '#722B81',
      active: '#F0F0F0',
      pending: '#F0F0F0',
    }

    //4. Reactive | modalForm
    const modalFormPropiedades = ref({
      dialog: false,
      titulo: '',
    })

    // 5. Computed | getHeight
    const getCardContenidoHeight = computed(() => {
      const alto = ref(0)
      if (vcarContenidoRef.value) {
        alto.value = vconPrincipalRef.value.$el.clientHeight * 0.8
      }
      return { height: `${alto.value}px !important` }
    })

    const getRowTablaRecibosHeight = computed(() => {
      if (vcarContenidoRef.value) {
        const alto =
          vconPrincipalRef.value.$el.clientHeight * 0.8 -
          vrowTituloRef.value.$el.clientHeight -
          vrowSucursalRef.value.$el.clientHeight -
          vactFootRef.value.$el.clientHeight -
          170

        console.log(alto)
        return { height: `${alto}px !important` }
      }
      return { height: '0px' }
    })

    const getTimelineItemWidth = computed(() => {
      if (vcarContenidoRef.value) {
        const ancho = (vcarContenidoRef.value.$el.clientWidth - 180) / 3
        console.log(vcarContenidoRef.value.$el.clientWidth)
        return `${ancho}px`
      }
      return '0px'
    })

    // 6. Watch

    // 7. Lifecycle hooks | onMounted, onBeforeUnmount
    onMounted(() => {
      nextTick(() => {
        fetchEmpresas()
      })
    })

    // 8. Functions (fetch, metodos, async) | fetchs
    const fetchEmpresas = async () => {
      try {
        await storeKiosko.storeEmpresas()
        itemsEmpresas.value = storeKiosko.resultEmpresas.data
      } catch (error) {
      } finally {
      }
    }

    // 8. Functions (fetch, metodos, async) | timeline
    const itemColor = (i: number) => {
      if (i < current.value) return palette.done
      if (i === current.value) return palette.active
      return palette.pending
    }

    function next() {
      if (current.value < steps.length - 1) current.value++
    }

    function prev() {
      if (current.value > 0) current.value--
    }

    function goTo(i: number) {
      current.value = i
    }

    // 8. Functions (fetch, metodos, async) | modalForm
    const onCloseModalForm = () => {
      modalFormPropiedades.value.dialog = false
    }

    const onSaveModalForm = (recibo: Recibo) => {
      itemsRecibos.value.push(recibo)
    }

    const onOpenModalForm = (titulo: string) => {
      modalFormPropiedades.value = {
        dialog: true,
        titulo: titulo,
      }
    }

    // 8. Functions (fetch, metodos, async) | dialogInformation
    const onCloseDialogInformation = () => {
      dialogInformation.value.dialog = false
    }

    const onOpenDialogInformation = (
      color: string,
      cuerpo: string,
      icono: string,
      titulo: string,
      velocidad: number,
    ) => {
      dialogInformation.value = {
        color: color,
        cuerpo: cuerpo,
        dialog: true,
        icono: icono,
        titulo: titulo,
        velocidad: velocidad,
      }
    }

    // Tabs

    // 4. Reactive | vrowTabMenuRef
    const vrowTabMenuRef = ref()

    const vtabMenuModel = ref<any>('tabBarV')

    // 4. Reactive  | vrowContenidoRef
    const vtabGraficaItems = ref([
      {
        icon: 'mdi-account-box',
        title: 'Personal',
        value: 'tabBarV',
        canvas: 'canvasChartBarV',
      },
      {
        icon: 'mdi-home-account',
        title: 'Dirección',
        value: 'tabBarH',
        canvas: 'canvasChartBarH',
      },
      {
        icon: 'mdi-badge-account-horizontal',
        title: 'Fiscal',
        value: 'tabLine',
        canvas: 'canvasChartLine',
      },
    ])

    return {
      vrowTabMenuRef,
      vtabMenuModel,
      vtabGraficaItems,
      current,
      dialogInformation,
      getCardContenidoHeight,
      getRowTablaRecibosHeight,
      getTimelineItemWidth,
      goTo,
      itemColor,
      itemsEmpresas,
      itemsRecibos,
      mergeProps,
      modalFormPropiedades,
      modelEmpresa,
      next,
      onCloseDialogInformation,
      onCloseModalForm,
      onOpenDialogInformation,
      onOpenModalForm,
      onSaveModalForm,
      prev,
      smAndDown,
      steps,
      vactFootRef,
      vcarContenidoRef,
      vconPrincipalRef,
      vrowSucursalRef,
      vrowTituloRef,
    }
  },
})
</script>

<style scoped>
@import '../styles/background.css';

.login-body {
  min-height: 100vh;
  /* 0→33.333% color A, el resto color B */
  background: linear-gradient(to left, #71618c 0 40%, #f0f0f0 40% 100%);
}

.login-body .theme--light {
  color: #e6e9f5 !important;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow {
  position: relative;
  z-index: 0;
  overflow: hidden;
  padding: 5px;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      #ab2f32 0deg 60deg,
      #ff6000 60deg 120deg,
      #ed3237 120deg 180deg,
      #00335f 180deg 240deg,
      #00a859 240deg 300deg,
      #025595 300deg 360deg
    );
    animation: rotate 10s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: white;
    border-radius: 5px;
  }
}

.parallelogram {
  -webkit-transform: skew(-40deg);
  -moz-transform: skew(-40deg);
  -o-transform: skew(-40deg);
  transform: skew(-40deg);
  position: absolute;
  z-index: -9;
}

/* Colors */
:root {
  --color1: #025595;
  --color2: #00a859;
  --color3: #ff6000;
}

/* Keyframes */
@keyframes moveBar {
  100% {
    transform: skew(-40deg) translateY(-1000px);
  }
}

.v-timeline .v-timeline-divider__dot {
  background: transparent !important;
}
</style>
