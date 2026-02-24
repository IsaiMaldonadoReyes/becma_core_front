<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <div class="icon-animated">
      <vue3-lottie :animation-data="animationData" :loop="false" :speed="dialogSpeedIcon" />
    </div>

    <v-card class="pa-8">
      <v-card-text class="text-h6 pt-15 text-center" :color="dialogColor">
        <span>{{ dialogTitle }}</span>
      </v-card-text>

      <v-divider class="border-opacity-25" />

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1" v-html="dialogContent"></span>
      </v-card-text>

      <v-card-actions color="primary">
        <v-btn
          :color="dialogColor"
          block
          size="large"
          variant="flat"
          @click="onClose"
          class="text-none"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import { dialogAnimations } from '@/utils/dialogAnimations'

export default defineComponent({
  name: 'DialogInformation',
  components: {
    Vue3Lottie,
  },
  props: {
    dialogColor: { type: String, default: 'info' },
    dialogContent: { type: String, default: '' },
    dialogIcon: { type: String, default: 'info' },
    dialogSpeedIcon: { type: Number, default: 0 },
    dialogTitle: { type: String, default: '' },
    dialogView: { type: Boolean, required: true },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const dialogVisible = ref(props.dialogView)
    const animationData = computed(() => {
      return dialogAnimations[props.dialogIcon] ?? dialogAnimations['alert']
    })

    watch(
      () => props.dialogView,
      (newVal) => {
        dialogVisible.value = newVal
      },
      { immediate: true },
    )

    const onClose = () => {
      emit('close')
    }

    return {
      dialogVisible,
      animationData,
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
