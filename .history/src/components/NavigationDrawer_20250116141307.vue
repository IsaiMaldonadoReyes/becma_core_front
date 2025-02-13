<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mini-variant="railp"
      class="bec-navigation-drawer"
      color="#E6E9F5"
      flat
      v-click-outside="cerrar"
    >
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
          <v-list-item-icon>
            <v-icon color="#285697">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title color="#285697">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'NavigationDrawer',

  components: {},
  props: {
    railp: Boolean,
    drawerp: Boolean,
  },
  setup() {
    const drawer = ref(null)
    const items = ref([
      {
        title: 'Sistema listado',
        icon: 'mdi-calendar-multiselect-outline',
        route: '/core/sistemaForm',
      },
      {
        title: 'Sistema Form',
        icon: 'mdi-calendar-multiselect-outline',
        route: '/core/sistemaListado',
      },
    ])
    return {
      drawer,
      items,
    }
  },
})
</script>

<style>
@import '../sass/variables.scss';
@import '../styles/navigation-drawer.css';
</style>
