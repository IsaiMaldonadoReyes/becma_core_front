<template>
  <v-dialog v-model="dialogPropiedades.dialog" :width="smAndDown ? '95vw' : '40vw'" persistent>
    <v-card>
      <v-form ref="formRef">
        <v-card-title
          class="position-fixed bg-surface-light dialog-header border-b-0 rounded-t"
          ref="dialogHeader"
        >
          <v-row>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-icon color="primary" icon="mdi-microsoft-excel" />
              <v-divider
                class="ml-3 mr-2 align-self-center border-opacity-25"
                length="20"
                thickness="2"
                vertical
              />
              {{ dialogPropiedades.titulo }}
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center justify-end">
              <v-btn-group variant="outlined" divided>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(tooltip)"
                      :loading="loading"
                      color="primary"
                      icon="mdi-download"
                      @click="descargarFormato"
                    />
                  </template>
                  <template #default>Clic aquí para descargar el formato de importación</template>
                </v-tooltip>

                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(tooltip)"
                      color="primary"
                      icon="mdi-close"
                      @click="onClose"
                    />
                  </template>
                  <template #default>Clic aquí para salir</template>
                </v-tooltip>
              </v-btn-group>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text class="dialog-content px-5" :style="getDialogContentPaddingTop">
          <v-row>
            <v-col cols="12" class="d-flex align-start justify-end">
              <bec-select
                v-model="tipoEmpresa"
                :clearable="false"
                :item-title="'title'"
                :item-value="'value'"
                :items="[
                  { title: 'Empresa fiscal', value: true },
                  { title: 'Empresa no fiscal', value: false },
                ]"
                :label="'Tipo de empresa'"
                :multiple="false"
                :placeholder="'Seleccione'"
                :prepend-icon="'mdi-briefcase-account'"
                :rules="[validationRules.required2]"
              >
                <template #tooltip>
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
                        <span style="font-weight: bold; color: #2a73c5">Instrucción:</span>
                        seleccione el tipo de empresa (fiscal o no fiscal) y haga clic en
                        <v-icon color="primary" icon="mdi-download"></v-icon>
                        para descargar el formato correspondiente de importación en Excel.
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </bec-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-overlay :model-value="loading" persistent class="align-center justify-center">
        <v-card width="420" class="pa-6 text-center rounded-xl">
          <v-icon size="40" color="primary">mdi-file-excel</v-icon>

          <div class="text-h6 mt-2">Generando formato</div>

          <div class="text-caption mb-4 text-medium-emphasis">
            Esto puede tardar algunos segundos...
          </div>

          <v-progress-linear indeterminate color="primary" height="6" rounded />
        </v-card>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import { useDisplay } from 'vuetify'
// import components
import { BecSelect } from '@/components/core/becmaComponents'

// import stores
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { useEmpleadoStore } from '@/stores/modules/Nomina/gape'

// utils
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

export default defineComponent({
  name: 'EmpleadoModalExportForm',
  components: { BecSelect },
  props: {
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 2. Props y Emits
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      titulo: ref(props.dialogTitle),
    })

    const onClose = () => {
      emit('close')
    }

    // 3. Composables (funciones reusables)
    const { name, mobile, smAndDown } = useDisplay()
    const dialogConfirmation = useDialogManagerStore()
    const empleadoStore = useEmpleadoStore()

    // 4. Reactive
    const formRef = ref()
    const loading = ref(false)

    const dialogHeader = ref()
    const headerHeight = ref(0)

    const tipoEmpresa = ref<boolean | null>(null)

    // 5. Computed properties
    const getDialogContentPaddingTop = computed(() => {
      if (dialogHeader.value) {
        calcularDimensiones()
      }

      return { paddingTop: `${headerHeight.value}px !important` }
    })

    // 6. Watchers
    watch(
      () => props.dialogView,
      (newDialogView) => {
        dialogPropiedades.value = {
          dialog: newDialogView,
          titulo: props.dialogTitle,
        }
      },
    )

    // 7. Lifecycle hooks (onMounted, mounted)
    onMounted(() => {
      window.addEventListener('resize', calcularDimensiones)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    const calcularDimensiones = () => {
      if (dialogHeader.value) {
        headerHeight.value = dialogHeader.value.$el.clientHeight + 20
      }
    }

    const descargarFormato = async () => {
      validateForm()
    }

    const validateForm = async () => {
      dialogConfirmation.onCloseDialogConfirmation()

      const formResult = await formRef.value?.validate()
      if (!formResult || !formResult.valid) return

      if (tipoEmpresa.value === null) {
        return
      }

      try {
        loading.value = true

        await empleadoStore.descargarFormato({
          fiscal: tipoEmpresa.value === true,
        })

        await formRef.value?.reset()
      } catch (error: any) {
        if (error?.type === 'validation') {
          const errores = Object.values(error.errors ?? {})
            .flat()
            .join('<br>')

          dialogConfirmation.onOpenDialogInformation(
            errores || 'Existen errores de validación.',
            'Verifique los siguientes errores',
            'incorrect',
            '#B00000',
            2,
          )
        } else {
          dialogConfirmation.onOpenDialogInformation(
            'Ocurrió un error inesperado al procesar la solicitud.',
            'Error',
            'incorrect',
            '#B00000',
            2,
          )
        }
      } finally {
        loading.value = false
      }
    }

    return {
      descargarFormato,
      tipoEmpresa,
      dialogHeader,
      dialogPropiedades,
      formRef,
      getDialogContentPaddingTop,
      inputFilters,
      loading,
      mergeProps,
      onClose,
      smAndDown,
      validationRules,
    }
  },
})
</script>

<style scoped>
.dialog-header {
  border-bottom: 1px solid #ddd;
  left: 0;
  padding: 16px;
  right: 0;
  top: 0;
  z-index: 1;
}

.dialog-content {
  overflow-y: auto;
}
</style>
