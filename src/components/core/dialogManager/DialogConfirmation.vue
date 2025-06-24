<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <div class="icon-animated">
      <vue3-lottie :animation-link="animationLink" :loop="false" :speed="0.8" />
    </div>

    <v-card class="pa-8">
      <v-card-text class="text-h6 pt-15 text-center" color="#285697">
        <span>{{ dialogTitle }}</span>
      </v-card-text>

      <v-divider class="border-opacity-25" />

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1" v-html="dialogContent"></span>
      </v-card-text>

      <v-card-actions color="primary">
        <v-row>
          <v-col cols="6" class="d-flex justify-end">
            <v-btn
              class="text-none"
              color="#285697"
              elevation="2"
              size="large"
              variant="tonal"
              @click="onClickNo"
            >
              No
            </v-btn>
          </v-col>
          <v-col cols="6" class="d-flex justify-start">
            <v-btn
              class="text-none"
              color="#285697"
              size="large"
              variant="elevated"
              @click="onClickYes"
            >
              Sí
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

export default defineComponent({
  name: 'DialogConfirmation',
  components: {
    Vue3Lottie,
  },
  props: {
    dialogView: { type: Boolean, required: true },
    dialogTitle: { type: String, default: '' },
    dialogContent: { type: String, default: '' },
    dialogIcon: { type: String, default: 'question' },
  },
  emits: ['clickYes', 'clickNo'],
  setup(props, { emit }) {
    const dialogVisible = ref(props.dialogView)
    const animationLink = ref(`/src/assets/images/${props.dialogIcon}.json`)

    watch(
      () => props.dialogView,
      (newVal) => {
        dialogVisible.value = newVal
        if (newVal) {
          animationLink.value = `/src/assets/images/${props.dialogIcon}.json`
        }
      },
      { immediate: true },
    )

    const onClickYes = () => {
      emit('clickYes') // ya no se emiten eventos personalizados
    }

    const onClickNo = () => {
      emit('clickNo')
    }

    return {
      dialogVisible,
      animationLink,
      onClickYes,
      onClickNo,
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
