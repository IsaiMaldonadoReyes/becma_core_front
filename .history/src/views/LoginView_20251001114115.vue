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
      <v-col v-if="smAndDown" cols="12" md="2" ref="vtimContenidoRef">
        <v-timeline
          align="center"
          direction="horizontal"
          line-inset="5"
          side="start"
          truncate-line="both"
          :style="{
            zIndex: 1,
            transform: 'translateY(85px)',
          }"
          class="pa-3"
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
              ></v-icon>
            </template>

            <v-card
              class="d-flex align-center justify-center text-center rounded-lg"
              min-height="60px"
              color="#E1DDE8"
              elevation="16"
              :width="getTimelineItemWidth"
              :style="{
                fontSize: '14px',
                color: '#722B81',
              }"
            >
              {{ step.title }}
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col cols="12" md="9" class="d-flex align-center justify-end" ref="vcarContenidoRef">
        <vue3-lottie
          v-if="!smAndDown"
          width="400px"
          height="400px"
          :animation-link="'/src/assets/images/doctor4.json'"
          style="position: absolute; bottom: 0; left: 0; z-index: 1; width: 400px; height: 400px"
        />

        <v-row justify="end">
          <v-col cols="12" md="9">
            <v-card
              color="#E6E6E6"
              elevation="16"
              :class="{
                'rounded-lg': true,
                'pa-15': !smAndDown,
                'px-5': smAndDown,
                'pt-16': smAndDown,
                'ma-5': smAndDown,
              }"
              :style="getCardContenidoHeight"
            >
              <v-tabs-window v-model="current" color="transparent">
                <!--Paso 1-->
                <v-tabs-window-item key="s1" value="s1" color="transparent">
                  <!-- vrowTituloRef -->
                  <v-row ref="vrowTituloRef">
                    <v-col cols="12" class="d-flex align-center">
                      <v-card-title class="text-h5" style="color: #722b81">
                        <v-icon color="#722b81">mdi-invoice-text</v-icon> 1. Ticket
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
                            @click="onOpenDialogSistema('onSave', {}, 'Nuevo recibo')"
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
                    :items="games"
                    items-per-page="-1"
                    ref="vdtiRecibosRef"
                    class="overflow-auto"
                    :style="getRowTablaRecibosHeight"
                  >
                    <template v-slot:default="{ items }">
                      <v-row>
                        <v-col v-for="item in items" key="title" cols="12" md="12">
                          <v-card
                            class="rounded d-flex justify-center align-center my-2 mx-4 pa-2"
                            flat
                            min-height="60px"
                            color="#f0f0f0"
                            elevation="5"
                          >
                            <v-row>
                              <v-col cols="12" lg="4">
                                <v-card-title
                                  style="font-size: 10px; color: #722b81; font-weight: bold"
                                >
                                  Fecha
                                </v-card-title>
                                <v-card-text>01/10/2025</v-card-text>
                              </v-col>
                              <v-col cols="12" lg="4">
                                <v-card-title
                                  style="font-size: 10px; color: #722b81; font-weight: bold"
                                >
                                  Folio
                                </v-card-title>
                                <v-card-text>0102030405</v-card-text>
                              </v-col>
                              <v-col cols="12" lg="3" class="d-flex align-center justify-end">
                                <v-card-title
                                  class="d-flex align-center justify-end"
                                  style="font-size: 16px; color: #722b81; font-weight: bold"
                                >
                                  $ 345.67
                                </v-card-title>
                              </v-col>
                              <v-col class="d-flex justify-end align-center" cols="12" lg="1">
                                <!-- vbtnEliminar -->
                                <v-tooltip bottom color="primary" interactive>
                                  <template v-slot:activator="{ props: tooltipProps }">
                                    <v-btn
                                      v-bind="mergeProps(tooltipProps)"
                                      class="mr-1"
                                      color="#722B81"
                                      height="40px"
                                      min-width="40px"
                                      width="40px"
                                      flat
                                    >
                                      <v-icon color="white" icon="mdi-delete" size="24px" />
                                    </v-btn>
                                  </template>
                                  <span>Eliminar</span>
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
                  <v-card-text>
                    <h3 style="color: #722b81">2. Datos fiscales</h3>
                    <p></p>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      border
                      class="text-none mr-3"
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
                      class="text-none mr-3"
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
      :dialog-event="dialogKioskoPropiedades.evento"
      :dialog-items="dialogKioskoPropiedades.items"
      :dialog-title="dialogKioskoPropiedades.titulo"
      :dialog-view="dialogKioskoPropiedades.dialog"
      @close="onCloseDialogSistema"
      @cancel="onCloseDialogSistema"
      @save="onSaveDialogSistema"
    />
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, shallowRef, mergeProps, computed, onMounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
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

    const vditPrincipalItems = ref<SistemaModel[]>([])

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
        const alto = vconPrincipalRef.value.$el.clientHeight * 0.39
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

    // 8. Functions (fetch, metodos, async)
    const fetchEmpresas = async () => {
      try {
        await storeKiosko.storeEmpresas()
        itemsEmpresas.value = storeKiosko.resultEmpresas.data
      } catch (error) {
      } finally {
      }
    }

    // Kiosko

    const games = [
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png',
        title: 'The Sci-Fi Shooter Experience',
        subtitle: 'Dive into a futuristic world of intense battles and alien encounters.',
        advanced: false,
        duration: '8 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png',
        title: 'Epic Adventures in Open Worlds',
        subtitle: 'Embark on a journey through vast, immersive landscapes and quests.',
        advanced: true,
        duration: '10 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png',
        title: 'Surviving the Space Station Horror',
        subtitle: 'Navigate a haunted space station in this chilling survival horror game.',
        advanced: false,
        duration: '9 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png',
        title: 'Neon-Lit High-Speed Racing Thrills',
        subtitle: 'Experience adrenaline-pumping races in a futuristic, neon-soaked city.',
        advanced: true,
        duration: '12 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png',
        title: 'Retro-Style Platformer Adventures',
        subtitle: 'Jump and dash through pixelated worlds in this classic-style platformer.',
        advanced: false,
        duration: '11 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png',
        title: 'Medieval Strategic War Campaigns',
        subtitle: 'Lead armies into epic battles and conquer kingdoms in this strategic war game.',
        advanced: true,
        duration: '10 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png',
        title: 'Underwater VR Exploration Adventure',
        subtitle: 'Dive deep into the ocean and discover the mysteries of the underwater world.',
        advanced: true,
        duration: '11 minutes',
      },
      {
        img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png',
        title: '1920s Mystery Detective Chronicles',
        subtitle: 'Solve crimes and uncover secrets in the glamorous 1920s era.',
        advanced: false,
        duration: '9 minutes',
      },
    ]

    const current = ref(0)

    const palette = {
      done: '#722B81',
      active: '#E1DDE8',
      pending: '#E1DDE8',
    }

    const itemColor = (i: number) => {
      if (i < current.value) return palette.done
      if (i === current.value) return palette.active
      return palette.pending
    }

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

    function next() {
      if (current.value < steps.length - 1) current.value++
    }

    function prev() {
      if (current.value > 0) current.value--
    }

    function goTo(i: number) {
      current.value = i
    }

    const dialogKioskoPropiedades = ref({
      dialog: false,
      evento: '',
      items: {},
      titulo: '',
    })

    const onCloseDialogSistema = () => {
      dialogKioskoPropiedades.value.dialog = false
      //fnCargarListado()
    }

    type Eventos = 'onSave' | 'onEdit' | 'onDelete' | 'onDeleteIds'

    const methods: Record<Eventos, (...args: any[]) => void> = {
      onSave: () => {
        /*dialogSistemaPropiedades.value.dialog = false
        fnCargarListado()*/
      },
      onEdit: () => {
        /*dialogSistemaPropiedades.value.dialog = false
        fnCargarListado()*/
      },
      onDelete: async () => {
        /*dialogConfirmation.onCloseDialogConfirmation()

        const idsToDelete = Array.isArray(items) ? items.map((item) => item.id) : [items.id]

        try {
          // Llamar a la API para eliminar los registros por sus IDs
          await sistemaStore.destroySistemasByIds(idsToDelete) // Asegúrate de que esta función exista en tu store

          // Mostrar mensaje de éxito
          dialogConfirmation.onOpenDialogInformation(
            sistemaStore.responseMessage,
            'Registros eliminados',
            'correct',
            '#438701',
            1,
          )
          // Refrescar la lista
          fnCargarListado()

          // Limpiar la selección
          vdtbPrincipalItemsSeleccionados.value = []
        } catch (error) {
          // Mostrar mensaje de error
          dialogConfirmation.onOpenDialogInformation(
            sistemaStore.responseMessage,
            'Error al eliminar',
            'incorrect',
            '#FF0000',
            1,
          )
        }*/
      },
      onDeleteIds: () => {
        let titulo = 'Eliminar registro(s)'
        let mensaje = 'Esta acción eliminará los sistemas seleccionados. ¿Desea continuar?'

        /*const itemsSeleccionados = vdtbPrincipalItems.value.filter((item) =>
          vdtbPrincipalItemsSeleccionados.value.includes(item.codigo),
        )

        dialogConfirmation.onOpenDialogConfirmation(
          mensaje,
          () => methods.onDelete(itemsSeleccionados), // << callback directo
          itemsSeleccionados,
          titulo,
          'alert',
        )*/
      },
    }

    const onSaveDialogSistema = (evento: Eventos) => {
      methods[evento]()
    }

    const onOpenDialogSistema = (evento: string, items: object, titulo: string) => {
      dialogKioskoPropiedades.value = {
        dialog: true,
        evento: evento,
        items: items,
        titulo: titulo,
      }
    }

    return {
      getTimelineItemWidth,
      getCardContenidoHeight,
      getRowTablaRecibosHeight,
      vconPrincipalRef,
      vcarContenidoRef,
      vrowSucursalRef,
      vrowTituloRef,
      vactFootRef,
      onOpenDialogSistema,
      onCloseDialogSistema,
      onSaveDialogSistema,
      dialogKioskoPropiedades,
      itemColor,
      next,
      prev,
      goTo,
      steps,
      current,
      modelEmpresa,
      itemsEmpresas,
      games,
      dialogInformation,
      onCloseDialogInformation,
      onOpenDialogInformation,
      mergeProps,
      smAndDown,
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
