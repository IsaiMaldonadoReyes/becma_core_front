<template>
  <div>
    <v-dialog v-model="dialogPropiedades.dialog" :width="smAndDown ? '95vw' : '40vw'" persistent>
      <v-card>
        <v-form ref="form" v-model="isValid">
          <v-card-title
            class="position-fixed bg-surface-light dialog-header border-b-0 rounded-t"
            ref="dialogHeader"
          >
            <v-row>
              <v-col cols="12" md="6" class="d-flex align-center">
                <v-icon color="primary" icon="mdi-account-cog" />
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
                  <v-btn :disabled="isDisableForm" color="primary" icon="mdi-format-align-right">
                    <v-tooltip>
                      <template v-slot:activator="{ props: tooltip }">
                        <v-checkbox-btn
                          v-bind="mergeProps(tooltip)"
                          color="primary"
                          true-icon="mdi-checkbox-marked-outline"
                          :disabled="isDisableForm"
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
                        :disabled="!isPasswordFilled || isSavingBtn"
                        @click="onDecision"
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
              <v-col cols="12">
                <bec-text-field
                  v-model="dialogPropiedades.elementos.nombre"
                  :clearable="true"
                  :disabled="isDisableForm"
                  :label="'Nombre(s)'"
                  :placeholder="'Nombre(s)'"
                  :prepend-icon="'mdi-account-cog'"
                >
                  <template #tooltip>
                    <cuenta-tooltips name="ayudaNombre" />
                  </template>
                </bec-text-field>
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dialogPropiedades.elementos.apellidoPaterno"
                  :clearable="true"
                  :disabled="isDisableForm"
                  :label="'Apellido paterno'"
                  :placeholder="'Apellido paterno'"
                  :prepend-icon="'mdi-account-cog'"
                >
                  <template #tooltip>
                    <cuenta-tooltips name="ayudaApellidoPaterno" />
                  </template>
                </bec-text-field>
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dialogPropiedades.elementos.apellidoMaterno"
                  :clearable="true"
                  :disabled="isDisableForm"
                  :label="'Apellido materno'"
                  :placeholder="'Apellido materno'"
                  :prepend-icon="'mdi-account-cog'"
                >
                  <template #tooltip>
                    <cuenta-tooltips name="ayudaApellidoMaterno" />
                  </template>
                </bec-text-field>
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dialogPropiedades.elementos.correo"
                  :clearable="true"
                  :disabled="isDisableForm"
                  :label="'Correo electrónico'"
                  :placeholder="' *'"
                  :prepend-icon="'mdi-email'"
                >
                  <template #tooltip>
                    <cuenta-tooltips name="ayudaCorreo" />
                  </template>
                </bec-text-field>
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dialogPropiedades.elementos.password"
                  :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :clearable="true"
                  :label="'Contraseña'"
                  :placeholder="'Contraseña'"
                  :prepend-icon="'mdi-lock-question'"
                  :rules="[rules.requiredEmpty, rules.validatePasswordUpdate]"
                  :type="visiblePassword ? 'text' : 'password'"
                  counter
                  hint="Ingresa al menos 8 caracteres"
                  @click:append-inner="visiblePassword = !visiblePassword"
                >
                  <template #tooltip>
                    <cuenta-tooltips name="ayudaPassword" />
                  </template>
                </bec-text-field>
              </v-col>
              <v-col cols="12">
                <bec-text-field
                  v-model="dialogPropiedades.elementos.passwordConfirm"
                  :append-inner-icon="visiblePasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                  :clearable="true"
                  :label="'Confirmación de contraseña'"
                  :placeholder="'Confirmación de contraseña'"
                  :prepend-icon="'mdi-lock-alert'"
                  :rules="[rules.requiredEmpty, rules.validatePasswordUpdate]"
                  :type="visiblePasswordConfirm ? 'text' : 'password'"
                  counter
                  hint="Ingresa al menos 8 caracteres"
                  @click:append-inner="visiblePasswordConfirm = !visiblePasswordConfirm"
                >
                  <template #tooltip>
                    <cuenta-tooltips name="ayudaPasswordConfirm" />
                  </template>
                </bec-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
      <dialog-confirmation
        :dialog-content="dialogConfirmation.cuerpo"
        :dialog-event="dialogConfirmation.evento"
        :dialog-icon="dialogConfirmation.icono"
        :dialog-items="dialogConfirmation.items"
        :dialog-title="dialogConfirmation.titulo"
        :dialog-view="dialogConfirmation.dialog"
        @clickNo="onCloseDialogConfirmation"
        @clickYes="onClickYesDialogConfirmation"
      />
      <dialog-information
        :dialog-color="dialogInformation.color"
        :dialog-content="dialogInformation.cuerpo"
        :dialog-icon="dialogInformation.icono"
        :dialog-speed-icon="dialogInformation.velocidad"
        :dialog-title="dialogInformation.titulo"
        :dialog-view="dialogInformation.dialog"
        @close="onCloseDialogInformation"
      />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import { useDisplay } from 'vuetify'

// import components
import { BecSelect, BecAutocomplete, BecTextField } from '@/components/core/becmaComponents'
import { CuentaTooltips } from '@/components/nomina/ayudas'

import { validationRules } from '@/utils/validationRules'
import DialogConfirmation from '@/components/core/dialogMessage/DialogConfirmation.vue'
import DialogInformation from '@/components/core/dialogMessage/DialogInformation.vue'
import { sessionStore } from '@/stores/modules/Core/sesion'

export interface Item {
  id: number
  correo: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  imagen: string
  rol: string
  password: string
  passwordConfirm: string
  iniciales: string
}

export default defineComponent({
  name: 'DialogCuenta ',
  components: {
    DialogConfirmation,
    DialogInformation,
    BecSelect,
    BecAutocomplete,
    BecTextField,
    CuentaTooltips,
  },
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
    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()
    const sesion = sessionStore()

    // Estado reactivo
    const form = ref()
    const isValid = ref(false)
    const isSavingBtn = ref(false)
    type Eventos = 'onEdit'

    const rules = {
      requiredEmpty: (v: string) =>
        validationRules.requiredEmpty(v, isPasswordUpdateRequired.value),
      validatePasswordUpdate: () =>
        validationRules.validatePasswordUpdate(
          dialogPropiedades.value.elementos.password,
          dialogPropiedades.value.elementos.passwordConfirm,
        ),
    }
    const nombreEvento = ref<string>('')

    const visiblePassword = ref(false)
    const visiblePasswordConfirm = ref(false)

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      elementos: { ...props.dialogItems },
      evento: ref(props.dialogEvent),
      titulo: ref(props.dialogTitle),
    })

    // DialogConfirmation
    const dialogConfirmation = ref({
      cuerpo: '',
      dialog: false,
      evento: '',
      icono: '',
      items: {},
      titulo: '',
    })

    const onOpenDialogConfirmation = (
      cuerpo: string,
      evento: string,
      items: object,
      titulo: string,
    ) => {
      dialogConfirmation.value = {
        cuerpo: cuerpo,
        dialog: true,
        evento: evento,
        icono: 'alert',
        items: items,
        titulo: titulo,
      }
    }

    const onClickYesDialogConfirmation = (evento: Eventos, items: object) => {
      methods[evento](items)
    }

    const onCloseDialogConfirmation = () => {
      dialogConfirmation.value.dialog = false
    }

    // DialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

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

    const onCloseDialogInformation = () => {
      dialogInformation.value.dialog = false
      emit('save', nombreEvento.value)
    }

    const methods: Record<Eventos, (...args: any[]) => void> = {
      onEdit: async () => {
        dialogConfirmation.value.dialog = false
        const isValidForm = await form.value?.validate()

        if (isValidForm.valid) {
          isSavingBtn.value = true

          const data = {
            password: dialogPropiedades.value.elementos.password,
            passwordConfirm: dialogPropiedades.value.elementos.passwordConfirm,
          }

          try {
            await sesion.resetPassword(data)

            await form.value?.reset()

            onOpenDialogInformation(
              '#438701',
              sesion.object.message,
              'correct',
              'Registro guardado',
              1,
            )
          } catch (error) {
            onOpenDialogInformation(
              '#438701',
              sesion.responseMessage,
              'incorrect',
              'Ocurrió un error en el registro guardado',
              1,
            )
          } finally {
            isSavingBtn.value = false
          }
        }
      },
    }

    // Metodos
    const onCancel = () => {
      emit('cancel')
    }

    const onClose = () => {
      emit('close')
    }

    async function onDecision() {
      let mensaje = ''
      let titulo = ''
      let evento = 'onEdit'

      if (dialogPropiedades.value.elementos.id) {
        titulo = 'Actualización de contraseña'
        mensaje = `¿Está seguro de que desea actualizar su contraseña? Recuerde guardar su nueva contraseña.`
      }

      onOpenDialogConfirmation(mensaje, evento, [], titulo)
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

    // forza que se validen todas las reglas cuando detecta un cambio en los valores (password, confirm)
    watch(
      () => [
        dialogPropiedades.value.elementos.password,
        dialogPropiedades.value.elementos.passwordConfirm,
      ],
      () => {
        if (form.value) {
          form.value.validate()
        }
      },
      { deep: true },
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

    // auxilia las reglas de los campos, para que valide siempre y cuando alguno de los campos tenga contenido
    const isPasswordUpdateRequired = computed(() => {
      return (
        !!dialogPropiedades.value.elementos.password ||
        !!dialogPropiedades.value.elementos.passwordConfirm
      )
    })

    // habilita el botón de guardar cuando los campos coincidan y tengan contenido
    const isPasswordFilled = computed(() => {
      return (
        dialogPropiedades.value.elementos.password &&
        dialogPropiedades.value.elementos.passwordConfirm &&
        dialogPropiedades.value.elementos.password ===
          dialogPropiedades.value.elementos.passwordConfirm
      )
    })

    const isDisableForm = ref(true)

    return {
      dialogConfirmation,
      dialogHeader,
      dialogInformation,
      dialogPropiedades,
      form,
      getDialogContentPaddingTop,
      isDisableForm,
      isPasswordFilled,
      isSavingBtn,
      isValid,
      mergeProps,
      onCancel,
      onClickYesDialogConfirmation,
      onClose,
      onCloseDialogConfirmation,
      onCloseDialogInformation,
      onDecision,
      rules,
      smAndDown,
      visiblePassword,
      visiblePasswordConfirm,
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
