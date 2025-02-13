<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px" persistent>
    <div class="icon-animated">
      <vue3-lottie
        :animation-link="animationLink"
        :loop="false"
        :speed="dialogPropiedades.velocidad"
      />
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
        <v-btn
          :color="dialogPropiedades.color"
          block
          size="large"
          variant="flat"
          @click="onClose"
          class="text-none"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import CorrectAnimation from '../../assets/images/correct.json'

export default defineComponent({
  name: 'DialogInformation',
  components: {
    Vue3Lottie,
  },
  props: {
    dialogColor: String,
    dialogContent: String,
    dialogEvent: String,
    dialogIcon: String,
    dialogSpeed: Number,
    dialogTitle: String,
    dialogView: Boolean,
  },
  setup(props, { emit }) {
    const dialogPropiedades = ref({
      color: ref(props.dialogColor),
      dialog: ref(props.dialogView),
      evento: ref(props.dialogEvent),
      mensajeCuerpo: ref(props.dialogContent),
      mensajeTitulo: ref(props.dialogTitle),
      ruta: ref(props.dialogIcon),
      velocidad: ref(props.dialogSpeed),
    })

    const onClose = () => {
      emit('close')
    }

    const animationLink = ref('')
    const nombreEvento = ref<string>('')

    watch(
      [() => props.dialogView, () => props.dialogIcon, () => props.dialogEvent],
      async ([newDialogView, newDialogRoute, newDialogEvent]) => {
        dialogPropiedades.value = {
          color: props.dialogColor,
          dialog: props.dialogView,
          evento: props.dialogEvent,
          mensajeCuerpo: props.dialogContent,
          mensajeTitulo: props.dialogTitle,
          ruta: props.dialogIcon,
          velocidad: props.dialogSpeed,
        }
        if (newDialogView && newDialogRoute != '') {
          animationLink.value = `/src/assets/images/${props.dialogIcon}.json`
        }
        if (newDialogEvent != '') {
          nombreEvento.value = props.dialogEvent ?? ''
        }
      },
    )

    return {
      CorrectAnimation,
      animationLink,
      dialogPropiedades,
      nombreEvento,
      onClose,
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
