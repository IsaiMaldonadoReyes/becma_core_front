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
      <v-card-text class="text-h6 pt-15 text-center" :color="dialogPropiedades.color">
        <span>{{ dialogPropiedades.mensajeTitulo }}</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1" v-html="dialogPropiedades.mensajeCuerpo">
        </span>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="6" class="d-flex justify-end">
            <v-btn
              :color="dialogPropiedades.color"
              size="large"
              variant="tonal"
              @click="cerrarDialogPropiedades"
              class="text-none"
              elevate="2"
            >
              No
            </v-btn>
          </v-col>
          <v-col cols="6" class="d-flex justify-start">
            <v-btn
              :color="dialogPropiedades.color"
              size="large"
              variant="elevated"
              @click="cerrarDialogPropiedades"
              class="text-none"
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
