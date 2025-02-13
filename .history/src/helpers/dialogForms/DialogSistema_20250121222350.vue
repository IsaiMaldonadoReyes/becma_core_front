<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="80%" persistent>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          <v-icon icon="mdi-laptop" color="primary"></v-icon>
          <v-divider
            class="ml-3 mr-2 align-self-center border-opacity-25"
            length="20"
            thickness="2"
            vertical
          ></v-divider>
          {{ dialogPropiedades.mensajeTitulo }}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn color="primary" icon size="large" @click="cerrarDialogPropiedades">
          <v-icon>mdi-window-close</v-icon>
        </v-btn></v-toolbar
      >
      <v-card-text class="pa-md-10">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              clearable
              label="Nombre"
              placeholder="Nombre del sistema"
              prepend-inner-icon="mdi-laptop"
              variant="outlined"
            >
              <template v-slot:prepend>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)"></v-icon>
                  </template>
                  <span>Mensaje de ayuda o informativo del campo.</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              clearable
              label="Código"
              placeholder="Código del sistema"
              prepend-inner-icon="mdi-barcode"
              variant="outlined"
            >
              <template v-slot:prepend>
                <v-tooltip>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)"></v-icon>
                  </template>
                  <span>Mensaje de ayuda o informativo del campo.</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
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
                    <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)"></v-icon>
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
                ></v-checkbox>
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
          size="large"
          variant="tonal"
          elevation="2"
          @click="cerrarDialogPropiedades"
        >
          Cancelar
        </v-btn>
        <v-btn
          class="text-none px-8"
          color="primary"
          size="large"
          variant="elevated"
          @click="cerrarDialogPropiedades"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, mergeProps } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import CorrectAnimation from '../../assets/images/correct.json'

export default defineComponent({
  name: 'DialogSistema',
  components: {
    Vue3Lottie,
  },
  props: {
    dialogView: Boolean,
    dialogTitle: String,
    dialogContent: String,
    dialogRoute: String,
    dialogColour: String,
    dialogTextButton: String,
    dialogSpeed: Number,
  },
  setup(props, { emit }) {
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      mensajeTitulo: ref(props.dialogTitle),
      mensajeCuerpo: ref(props.dialogContent),
      ruta: ref(props.dialogRoute),
      color: ref(props.dialogColour),
      boton: ref(props.dialogTextButton),
      velocidad: ref(props.dialogSpeed),
    })

    const cerrarDialogPropiedades = () => {
      emit('cerrarDialog')
    }

    const animationLink = ref('')

    watch(
      [() => props.dialogView, () => props.dialogRoute],
      async ([newDialogView, newDialogRoute]) => {
        dialogPropiedades.value = {
          dialog: props.dialogView,
          mensajeTitulo: props.dialogTitle,
          mensajeCuerpo: props.dialogContent,
          ruta: props.dialogRoute,
          color: props.dialogColour,
          boton: props.dialogTextButton,
          velocidad: props.dialogSpeed,
        }
        if (newDialogView && newDialogRoute != '') {
          animationLink.value = `/src/assets/images/${props.dialogRoute}.json`
        }
      },
    )

    return {
      dialogPropiedades,
      CorrectAnimation,
      cerrarDialogPropiedades,
      animationLink,
      mergeProps,
    }
  },
})
</script>
<style scoped>
.lottie-container {
  height: 100px;
}

.icon-box {
  color: #fff;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  z-index: 2401;
  background-color: rgb(var(--v-theme-surface));
  padding: 10px;
  text-align: center;
}
</style>
