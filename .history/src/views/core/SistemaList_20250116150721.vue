<template>
  <div class="about">
    <v-data-table v-model="selected" :items="items" item-value="name" show-select></v-data-table>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'
import { VDataTable } from 'vuetify/components'

export default defineComponent({
  name: 'SistemaList',
  components: {
    VDataTable,
  },

  setup() {},
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
