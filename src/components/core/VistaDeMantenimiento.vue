<template>
  <vue3-lottie
    width="100%"
    :animation-link="'/src/assets/images/animacion_mantenimiento_light.json'"
  />
</template>

<script lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "VistaDeMantenimiento",
  components: { Vue3Lottie },
  setup() {
    return {};
  },
});
</script>
