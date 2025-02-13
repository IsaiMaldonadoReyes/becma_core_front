<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="80%" persistent>
    <v-card>
      <v-form ref="form" v-model="isValid">
        <v-toolbar>
          <v-toolbar-title>
            <v-icon color="primary" icon="mdi-laptop" />
            <v-divider
              class="ml-3 mr-2 align-self-center border-opacity-25"
              length="20"
              thickness="2"
              vertical
            />
            {{ dialogPropiedades.titulo }}
          </v-toolbar-title>
          <v-spacer />

          <v-btn-group variant="outlined" divided class="mr-3">
            <v-btn color="primary" icon="mdi-format-align-right">
              <v-tooltip>
                <template v-slot:activator="{ props: tooltip }">
                  <v-checkbox-btn
                    v-bind="mergeProps(tooltip)"
                    color="primary"
                    color="success"
                    true-icon="mdi-checkbox-marked-outline"
                  />
                </template>
                <span>Marque la casilla para activar el registro.</span>
              </v-tooltip>
            </v-btn>
            <v-btn color="primary" icon="mdi-content-save"></v-btn>
            <v-btn color="primary" icon="mdi-window-close" @click="onClose"></v-btn>
          </v-btn-group>
        </v-toolbar>
        <v-card-text class="pa-md-10">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dialogPropiedades.elementos.nombre"
                :rules="[rules.required]"
                clearable
                label="Nombre"
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
                label="Código"
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
                label="Descripción"
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
        <v-divider class="border-opacity-25" />
        <v-card-actions class="d-flex justify-end">
          <v-btn
            class="text-none px-8"
            color="primary"
            elevation="2"
            size="large"
            variant="tonal"
            @click="onCancel"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="text-none px-8"
            color="primary"
            size="large"
            variant="elevated"
            @click="onSave"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { ref, mergeProps, watch, defineComponent } from 'vue'
export interface Elementos {
  codigo: string
  descripcion: string
  nombre: string
}
export default defineComponent({
  name: 'DialogSistema',
  components: {},
  props: {
    dialogEvent: String,
    dialogItems: {
      type: Object as () => Partial<Elementos>,
      required: true,
    },
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
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

    return {
      dialogPropiedades,
      form,
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
