<template>
  <v-app>
    <v-app-bar app clipped-left height="60" color="#E6E9F5">
      <v-app-bar-nav-icon
        class="ml-md-1 ml-lg-1 ml-xl-1"
        @click.stop="onClickDrawer"
        :icon="icon"
      />
      <v-toolbar-title>
        <v-img class="my-3" contain height="40" />
      </v-toolbar-title>
      <v-spacer />

      <v-menu bottom :close-on-content-click="false" min-width="350px" offset-y right></v-menu>
      <template v-slot:append>
        <v-btn class="text-none" stacked>
          <v-checkbox-btn
            false-icon="mdi-white-balance-sunny"
            true-icon="mdi-moon-waning-crescent"
            base-color="black"
            @click="toggleTheme"
          >
          </v-checkbox-btn>
        </v-btn>

        <v-btn class="text-none" icon>
          <v-badge color="primary" content="2">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      theme="dark"
      permanent
      :rail="railParent"
      v-model="drawerParent"
      rail-width="130"
      elevation="10"
    >
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" value="dashboard">
          <template v-slot:prepend>
            <v-btn prepend-icon="mdi-cloud" stacked>Becloud</v-btn>
          </template>
        </v-list-item>

        <v-list-item prepend-icon="mdi-forum" value="messages">
          <template v-slot:prepend>
            <v-btn prepend-icon="mdi-forum" stacked> Becnom </v-btn>
          </template>
        </v-list-item>

        <v-list-item prepend-icon="mdi-forum" value="messages">
          <template v-slot:prepend>
            <v-btn prepend-icon="mdi-forum" stacked> Becom </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer permanent v-model="drawerChildren" elevation="10">
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>

        <v-list-item title="Contacts" value="contacts"></v-list-item>

        <v-list-item title="Settings" value="settings"></v-list-item>
      </v-list>
    </v-navigation-drawer>
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

    const railParent = ref(true)
    const drawerParent = ref(true)

    const railChildren = ref(true)
    const drawerChildren = ref(true)
    const icon = ref('mdi-format-list-bulleted-square')

    // Contador para manejar el estado cíclico
    const clickCount = ref(0)

    // Función para manejar el clic en el botón
    const onClickDrawer = () => {
      clickCount.value = (clickCount.value + 1) % 4 // Ciclo entre 0, 1 y 2

      switch (clickCount.value) {
        case 0:
          console.log('0')
          // Primer clic: drawerChildren se desactiva
          drawerChildren.value = false
          drawerParent.value = true
          icon.value = 'mdi-format-list-bulleted-square'
          break
        case 1:
          console.log('1')
          // Segundo clic: drawerParent se desactiva
          drawerChildren.value = false
          drawerParent.value = false
          icon.value = 'mdi-menu'
          break
        case 2:
          console.log('2')
          // Tercer clic: ambos drawers se activan
          drawerChildren.value = false
          drawerParent.value = true
          icon.value = 'mdi-menu'
          break
        case 3:
          console.log('4')
          // Tercer clic: ambos drawers se activan
          drawerChildren.value = true
          drawerParent.value = true
          icon.value = 'mdi-format-list-bulleted-square'
          break
      }
    }
    onMounted(() => {
      console.log(drawerChildren.value)
    })

    return {
      toggleTheme,
      drawerParent,
      railParent,
      drawerChildren,
      railChildren,
      icon,
      onClickDrawer,
    }
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
