<template>
  <vue3-lottie
    width="100%"
    :animation-link="'/src/assets/images/login_gape_animacion_1.json'"
  />
</template>

<script lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Login",
  components: { Vue3Lottie },
  setup() {
    return {};
  },
});
</script>
