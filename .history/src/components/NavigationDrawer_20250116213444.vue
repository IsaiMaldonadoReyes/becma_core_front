<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :rail="railp"
      class="bec-navigation-drawer"
      color="#E6E9F5"
      flat
    >
      <v-list density="compact" nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
          <template v-slot:prepend>
            <v-icon color="#285697">{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  name: 'NavigationDrawer',

  props: {
    railp: Boolean,
    drawerp: Boolean,
  },
  setup() {
    const drawer = ref(true)
    const items = ref([
      {
        title: 'Sistema listado',
        icon: 'mdi-calendar-multiselect-outline',
        route: '/core/sistemaForm',
      },
      {
        title: 'Sistema Form',
        icon: 'mdi-calendar-multiselect-outline',
        route: '/core/sistemaList',
      },
    ])
    return {
      drawer,
      items,
    }
  },
})
</script>
