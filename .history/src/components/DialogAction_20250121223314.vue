<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px" persistent>
    <div class="icon-animated">
      <vue3-lottie
        :loop="false"
        :speed="dialogPropiedades.velocidad"
        :animation-link="animationLink"
      />
    </div>

    <v-card class="pa-6">
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
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-h6 pt-15 text-center" :color="dialogPropiedades.color">
        <span>{{ dialogPropiedades.mensajeTitulo }}</span>
      </v-card-text>

      <v-divider class="border-opacity-25" />

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1" v-html="dialogPropiedades.mensajeCuerpo">
        </span>
      </v-card-text>

      <v-card-actions color="primary">
        <v-row>
          <v-col cols="6" class="d-flex justify-end">
            <v-btn
              :color="dialogPropiedades.color"
              class="text-none"
              elevation="2"
              size="large"
              variant="tonal"
              @click="cerrarDialogPropiedades"
            >
              No
            </v-btn>
          </v-col>
          <v-col cols="6" class="d-flex justify-start">
            <v-btn
              :color="dialogPropiedades.color"
              class="text-none"
              size="large"
              variant="elevated"
              @click="cerrarDialogPropiedades"
            >
              Si
            </v-btn>
          </v-col>
        </v-row>
        <!--v-btn
          :color="dialogPropiedades.color"
          block
          size="large"
          variant="flat"
          @click="cerrarDialogPropiedades"
          class="text-none"
        >
          {{ dialogPropiedades.boton }}
        </v-btn-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import CorrectAnimation from '../assets/images/correct.json'

export default defineComponent({
  name: 'DialogAction',
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
    }
  },
})
</script>
<style scoped>
.lottie-container {
  height: 100px;
}

.icon-animated {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 50%;
  color: #fff;
  height: 120px;
  left: 0;
  margin: 0 auto;
  padding: 10px;
  position: absolute;
  right: 0;
  text-align: center;
  top: -40px;
  width: 120px;
  z-index: 2401;
}
</style>
