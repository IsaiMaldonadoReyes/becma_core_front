<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px" persistent>
    <div class="icon-animated">
      <vue3-lottie :animation-link="animationLink" :loop="false" :speed="0.8" />
    </div>
    <v-card class="pa-6">
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
              @click="onCloseDialog"
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
              @click="onClickYes"
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
import CorrectAnimation from '../../assets/images/correct.json'

export default defineComponent({
  name: 'DialogConfirmation',
  components: {
    Vue3Lottie,
  },
  props: {
    dialogContent: String,
    dialogEvent: String,
    dialogIcon: String,
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      evento: ref(props.dialogEvent),
      icono: ref(props.dialogIcon),
      mensajeCuerpo: ref(props.dialogContent),
      mensajeTitulo: ref(props.dialogTitle),
    })

    const onCloseDialog = () => {
      emit('closeDialog')
    }

    const onClickYes = () => {
      emit('clickYes', nombreEvento.value)
    }

    const onClickNo = () => {
      emit('clickNo')
    }
    const nombreEvento = ref<string>('')
    const animationLink = ref('')

    watch([() => props.dialogView], async ([newDialogView]) => {
      dialogPropiedades.value = {
        dialog: props.dialogView,
        evento: props.dialogEvent,
        icono: props.dialogIcon,
        mensajeCuerpo: props.dialogContent,
        mensajeTitulo: props.dialogTitle,
      }
      nombreEvento.value = props.dialogEvent ?? ''
    })

    return {
      dialogPropiedades,
      CorrectAnimation,
      onCloseDialog,
      onClickYes,
      onClickNo,
      animationLink,
    }
  },
})
</script>
<style scoped>
.lottie-container {
  height: 100px;
}

.icon-box {
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
