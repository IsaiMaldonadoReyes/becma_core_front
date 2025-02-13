<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="80%" persistent>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          <v-icon icon="mdi-laptop" color="primary" />
          <v-divider
            class="ml-3 mr-2 align-self-center border-opacity-25"
            length="20"
            thickness="2"
            vertical
          />
          {{ dialogPropiedades.titulo }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn color="primary" icon size="large" @click="onClose">
          <v-icon icon="mdi-window-close" />
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-md-10">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="dialogPropiedades.elementos.nombre"
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
          <v-col cols="12" md="6">
            <v-tooltip>
              <template v-slot:activator="{ props: tooltip }">
                <v-checkbox
                  v-bind="mergeProps(tooltip)"
                  color="success"
                  false-icon="mdi-checkbox-blank-circle-outline"
                  label="Es activo"
                  true-icon="mdi-checkbox-marked-circle-outline"
                />
              </template>
              <span>Marque o desmarque la casilla para activar o desactivar el registro.</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="border-opacity-25" />
      <v-card-actions>
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
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { ref, mergeProps, watch, defineComponent } from 'vue'
import { useField, useForm } from 'vee-validate'

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
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      elementos: { ...props.dialogItems },
      evento: ref(props.dialogEvent),
      titulo: ref(props.dialogTitle),
    })

    const nombreEvento = ref<string>('')

    const onClose = () => {
      emit('close')
    }

    const onCancel = () => {
      emit('cancel')
    }

    const onSave = () => {
      emit('save', nombreEvento.value)
    }

    watch(
      () => props.dialogView,
      (newDialogView) => {
        dialogPropiedades.value = {
          dialog: newDialogView, // Actualiza con el nuevo valor de `dialogView`
          elementos: props.dialogItems, // Usa los props más recientes
          evento: props.dialogEvent,
          titulo: props.dialogTitle,
        }

        // Actualiza otras referencias si es necesario
        nombreEvento.value = props.dialogEvent ?? ''
      },
    )

    return {
      dialogPropiedades,
      mergeProps,
      onCancel,
      onClose,
      onSave,
    }
  },
})
</script>
