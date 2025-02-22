<template>
  <v-dialog v-model="dialogPropiedades.dialog" width="auto" persistent>
    <div class="icon-animated bg-surface-light">
      <v-avatar size="100%">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="DD" />
      </v-avatar>
    </div>

    <v-card>
      <v-form ref="form" v-model="isValid">
        <v-card-title class="position-fixed bg-surface-light dialog-header" ref="dialogHeader">
          <v-row>
            <v-col cols="12" md="12" class="d-flex align-center justify-end">
              <v-btn-group variant="outlined" divided>
                <v-btn color="primary" icon="mdi-format-align-right">
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-checkbox-btn
                        v-bind="mergeProps(tooltip)"
                        color="primary"
                        true-icon="mdi-checkbox-marked-outline"
                      />
                    </template>
                    <span>Marque la casilla para activar este registro.</span>
                  </v-tooltip>
                </v-btn>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(tooltip)"
                      color="primary"
                      icon="mdi-floppy"
                      @click="onSave"
                    />
                  </template>
                  <span>Clic aquí para guardar</span>
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
                  <span>Clic aquí para salir</span>
                </v-tooltip>
              </v-btn-group>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text class="dialog-content px-5" :style="getDialogContentPaddingTop">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dialogPropiedades.elementos.nombre"
                :rules="[rules.required]"
                clearable
                label="Nombre *"
                placeholder="Nombre del sistema"
                prepend-inner-icon="mdi-laptop"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                    </template>
                    <span>Mensaje de ayuda o informativo del campo.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dialogPropiedades.elementos.codigo"
                :rules="[rules.required]"
                clearable
                label="Código *"
                placeholder="Código del sistema"
                prepend-inner-icon="mdi-barcode"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                    </template>
                    <span>Mensaje de ayuda o informativo del campo.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="dialogPropiedades.elementos.descripcion"
                :rules="[rules.required]"
                auto-grow
                clearable
                label="Descripción *"
                placeholder="Descripción del sistema"
                prepend-inner-icon="mdi-text"
                rows="1"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-tooltip>
                    <template v-slot:activator="{ props: tooltip }">
                      <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
                    </template>
                    <span>Mensaje de ayuda o informativo del campo.</span>
                  </v-tooltip>
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" md="6"> </v-col>
          </v-row>
        </v-card-text>
        <VueAvatarUpload />
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import VueAvatarUpload from '@pkhadson/vue-avatar-upload'
import '@pkhadson/vue-avatar-upload/lib/style.css'

export interface Item {
  codigo: string
  descripcion: string
  nombre: string
}

export default defineComponent({
  name: 'DialogCuenta ',
  components: { VueAvatarUpload },
  props: {
    dialogEvent: String,
    dialogItems: {
      type: Object as () => Partial<Item>,
      required: true,
    },
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    const avatarUpload = useAvatarUpload({
      color: '#ff5478',
      default: {
        // pass default props
      },
    })

    const openUpload = () => {
      avatarUpload({
        onCustomRequest: (file: File, close: Function) => {
          // upload flow
          close() // close pop-up
        },
      })
    }

    // Estado reactivo
    const form = ref()
    const isValid = ref(false)
    const rules = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
    }
    const nombreEvento = ref<string>('')

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      elementos: { ...props.dialogItems },
      evento: ref(props.dialogEvent),
      titulo: ref(props.dialogTitle),
    })

    // Metodos
    const onCancel = () => {
      emit('cancel')
    }

    const onClose = () => {
      emit('close')
    }

    const onSave = async () => {
      const isValidForm = await form.value?.validate()

      if (isValidForm.valid) {
        emit('save', nombreEvento.value)
      }
    }

    watch(
      () => props.dialogView,
      (newDialogView) => {
        dialogPropiedades.value = {
          dialog: newDialogView,
          elementos: props.dialogItems,
          evento: props.dialogEvent,
          titulo: props.dialogTitle,
        }
        nombreEvento.value = props.dialogEvent ?? ''
      },
    )

    // Header
    const dialogHeader = ref()
    const headerHeight = ref(0)

    const calcularDimensiones = () => {
      if (dialogHeader.value) {
        headerHeight.value = dialogHeader.value.$el.clientHeight + 30
      }
    }

    onMounted(() => {
      window.addEventListener('resize', calcularDimensiones)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', calcularDimensiones)
    })

    const getDialogContentPaddingTop = computed(() => {
      if (dialogHeader.value) {
        calcularDimensiones()
      }

      return { paddingTop: `${headerHeight.value}px !important` }
    })

    return {
      dialogHeader,
      dialogPropiedades,
      form,
      getDialogContentPaddingTop,
      isValid,
      mergeProps,
      onCancel,
      onClose,
      onSave,
      rules,
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
.lottie-container {
  height: 100px;
}

.icon-animated {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 50%;
  color: #fff;
  height: 150px;
  left: 0;
  margin: 0 auto;
  padding: 10px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0px;
  width: 150px;
  z-index: 2401;
}
</style>
