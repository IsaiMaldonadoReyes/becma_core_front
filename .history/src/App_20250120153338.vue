<template>
  <v-app>
    <v-app-bar app clipped-left height="60" color="#E6E9F5">
      <v-app-bar-nav-icon class="ml-md-1 ml-lg-1 ml-xl-1" />
      <v-toolbar-title>
        <v-img class="my-3" contain height="40" />
      </v-toolbar-title>
      <v-spacer />

      <v-menu bottom :close-on-content-click="false" min-width="350px" offset-y right></v-menu>
      <template v-slot:append>
        <v-checkbox-btn
          false-icon="mdi-white-balance-sunny"
          true-icon="mdi-moon-waning-crescent"
          base-color="black"
          @click="toggleTheme"
        >
        </v-checkbox-btn>
        <v-badge color="primary" content="2">
          <v-btn icon="mdi-bell"> </v-btn>
        </v-badge>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <NavigationDrawer></NavigationDrawer>
    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <v-card flat tile width="100%" color="#E6E9F5">
        <v-card-text class="grey--text text--darken-3 d-flex align-end justify-center">
          <v-tooltip bottom color="primary">
            <span> Soluciones Administrativas BECMA, S.A. de C.V </span>
          </v-tooltip>
          © {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card></v-footer
    >
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import { ref, defineComponent, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import NavigationDrawer from './components/NavigationDrawer.vue'

export default defineComponent({
  components: { NavigationDrawer },

  setup() {
    const theme = useTheme()

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    return { toggleTheme }
  },
})
</script>
<style>
/*html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100vw;
}*/
</style>
