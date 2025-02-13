<template>
  <v-app>
    <v-app-bar app clipped-left height="60">
      <!--v-app-bar-nav-icon class="ml-md-1 ml-lg-1 ml-xl-1" @click.stop="onClickDrawer" :icon="icon">
      </v-app-bar-nav-icon-->
      <v-btn-group variant="outlined" divided class="ml-md-3 ml-lg-3 ml-xl-3">
        <v-btn @click.stop="onClickDrawerParent" :icon="iconMenuParent" />
        <v-btn @click.stop="onClickDrawerChildren" :icon="iconChildren" />
      </v-btn-group>
      <v-toolbar-title>
        <v-img class="my-3" contain height="40" />
      </v-toolbar-title>
      <v-spacer />

      <v-menu :close-on-content-click="false" bottom min-width="350px" offset-y right />
      <template v-slot:append>
        <v-btn-group rounded="0">
          <v-btn class="text-none pa-2" stacked density="compact" style="min-width: auto">
            <v-checkbox-btn
              class="ma-0 pa-0"
              color="primary"
              false-icon="mdi-white-balance-sunny"
              true-icon="mdi-weather-night"
              @click="toggleTheme"
            >
            </v-checkbox-btn>
          </v-btn>

          <v-menu min-width="200px" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-none pa-3"
                stacked
                density="compact"
                style="min-width: auto"
              >
                <v-badge color="primary" content="2">
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-card class="mx-auto" max-width="500">
              <v-toolbar color="primary">
                <v-toolbar-title>Notificaciones</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon="mdi-magnify"></v-btn>

                <v-btn icon="mdi-checkbox-marked-circle"></v-btn>
              </v-toolbar>

              <v-list>
                <v-list-item
                  v-for="item in items"
                  :key="item.id"
                  :value="item.id"
                  active-class="text-primary"
                  class="py-3 border-b"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">{{
                    item.headline
                  }}</v-list-item-subtitle>

                  <v-list-item-subtitle class="text-high-emphasis">{{
                    item.subtitle
                  }}</v-list-item-subtitle>

                  <template v-slot:append="{ isSelected }">
                    <v-list-item-action class="flex-column align-end">
                      <small class="mb-4 text-high-emphasis opacity-60">{{ item.action }}</small>

                      <v-spacer></v-spacer>

                      <v-icon v-if="isSelected" color="primary">mdi-bell</v-icon>

                      <v-icon v-else class="opacity-30">mdi-bell-outline</v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-btn-group>
        <v-divider class="mx-2" vertical></v-divider>
        <v-avatar class="mx-2">
          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>
      </template>
    </v-app-bar>

    <navigation-drawer
      :drawer-children="navigationDrawerProps.drawerHijo"
      :drawer-parent="navigationDrawerProps.drawerPadre"
      :rail-children="navigationDrawerProps.railHijo"
      :border-children="navigationDrawerProps.borderHijo"
    />

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
import { ref, defineComponent, computed, mergeProps } from 'vue'
import { useTheme } from 'vuetify'
import NavigationDrawer from './components/NavigationDrawer.vue'

export interface Drawer {
  title: string
  value: string
}

export default defineComponent({
  components: { NavigationDrawer },

  setup() {
    const theme = useTheme()

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    const navigationDrawerProps = ref({
      drawerHijo: true,
      drawerPadre: true,
      railHijo: true,
      borderHijo: true,
    })

    const iconMenuParent = ref('mdi-format-list-bulleted')
    const iconChildren = ref('mdi-format-list-bulleted')
    const borderChildren = ref(true)

    // Contador para manejar el estado cíclico
    const clickCount = ref(0)

    const onClickDrawerParent = () => {
      if (navigationDrawerProps.value.drawerPadre) {
        navigationDrawerProps.value.drawerPadre = false
        iconMenuParent.value = 'mdi-menu'
      } else {
        navigationDrawerProps.value.drawerPadre = true
        iconMenuParent.value = 'mdi-format-list-bulleted'
      }
    }

    const onClickDrawerChildren = () => {
      clickCount.value = (clickCount.value + 1) % 3
      console.log('onClickDrawerChildren' + clickCount.value)
      switch (clickCount.value) {
        case 0:
          navigationDrawerProps.value.drawerHijo = true
          navigationDrawerProps.value.railHijo = true
          iconChildren.value = 'mdi-format-list-bulleted'
          navigationDrawerProps.value.borderHijo = true
          break
        case 1:
          navigationDrawerProps.value.drawerHijo = true
          navigationDrawerProps.value.railHijo = false
          iconChildren.value = 'mdi-menu-open'
          navigationDrawerProps.value.borderHijo = false
          break
        case 2:
          navigationDrawerProps.value.drawerHijo = false
          navigationDrawerProps.value.railHijo = true
          iconChildren.value = 'mdi-menu'
          navigationDrawerProps.value.borderHijoe = false
          break
      }
    }

    // Función para manejar el clic en el botón
    const onClickDrawer = () => {
      clickCount.value = (clickCount.value + 1) % 4 // Ciclo entre 0, 1 y 2

      switch (clickCount.value) {
        case 0:
          console.log('0')
          // Primer clic: drawerChildren se desactiva
          drawerChildren.value = false
          drawerParent.value = true
          iconMenuParent.value = 'mdi-menu-open'
          break
        case 1:
          console.log('1')
          // Segundo clic: drawerParent se desactiva
          drawerChildren.value = false
          drawerParent.value = false
          iconMenuParent.value = 'mdi-menu'
          break
        case 2:
          console.log('2')
          // Tercer clic: ambos drawers se activan
          drawerChildren.value = false
          drawerParent.value = true
          iconMenuParent.value = 'mdi-menu'
          break
        case 3:
          console.log('4')
          // Tercer clic: ambos drawers se activan
          drawerChildren.value = true
          drawerParent.value = true
          iconMenuParent.value = 'mdi-format-list-bulleted-square'
          break
      }
    }

    type Notificacion = {
      id: number
      action: string
      headline: string
      subtitle: string
      title: string
    }
    const items = ref<Notificacion[]>([])

    // Notificaciones
    items.value = [
      {
        id: 1,
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: 'Ali Connors',
      },
      {
        id: 2,
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: 'me, Scrott, Jennifer',
      },
      {
        id: 3,
        action: '6 hr',
        headline: 'Oui oui',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        title: 'Sandra Adams',
      },
      {
        id: 4,
        action: '12 hr',
        headline: 'Birthday gift',
        subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        title: 'Trevor Hansen',
      },
      {
        id: 5,
        action: '18hr',
        headline: 'Recipe to try',
        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Britta Holt',
      },
    ]

    return {
      borderChildren,
      iconChildren,
      iconMenuParent,
      items,
      mergeProps,
      navigationDrawerProps,
      onClickDrawer,
      onClickDrawerChildren,
      onClickDrawerParent,
      toggleTheme,
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
