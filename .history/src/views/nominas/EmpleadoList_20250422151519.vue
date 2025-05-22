<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, mergeProps, computed, onMounted } from 'vue'

import { useDisplay } from 'vuetify'

export default defineComponent({
  name: 'SistemaListado',
  components: { DialogInformation, DialogSistema, DialogConfirmation },

  setup() {
    return {}
  },
})
</script>
