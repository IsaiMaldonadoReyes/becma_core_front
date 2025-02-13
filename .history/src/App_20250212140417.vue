<template>
  <v-app>
    <v-app-bar app clipped-left height="60">
      <v-btn-group divided class="ml-md-4 ml-lg-4 ml-xl-4">
        <v-btn @click.stop="onClickDrawerParent" :icon="iconMenuParent" />
        <v-btn @click.stop="onClickDrawerChildren" :icon="iconChildren" />
      </v-btn-group>
      <v-toolbar-title>
        <v-img class="my-3" contain height="40" />
      </v-toolbar-title>
      <v-spacer />
      <template v-slot:append>
        <v-switch
          color="primary"
          false-icon="mdi-weather-night"
          hide-details
          inset
          true-icon="mdi-white-balance-sunny"
          @click="toggleTheme"
        >
        </v-switch>
        <v-menu min-width="200px" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="text-none pa-3"
              stacked
              density="compact"
              style="min-width: auto"
            >
              <v-badge color="primary" content="3">
                <v-icon icon="mdi-bell" />
              </v-badge>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="500">
            <v-toolbar color="primary">
              <v-toolbar-title>Notificaciones</v-toolbar-title>
            </v-toolbar>

            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item.id"
                :to="
                  item.id_registro && item.id_registro !== 0
                    ? item.ruta_directorio + item.id_registro
                    : item.ruta_directorio
                "
                :value="item.id"
                active-class="text-primary"
                class="py-3 border-b"
              >
                <v-list-item-title>{{ item.nombre_usuario_origen }}</v-list-item-title>

                <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
                  {{ item.etiqueta_directorio }}
                </v-list-item-subtitle>

                <v-list-item-subtitle class="text-high-emphasis">
                  {{ item.descripcion }}
                </v-list-item-subtitle>

                <template v-slot:append="{ isSelected }">
                  <v-list-item-action class="flex-column align-end">
                    <small class="mb-4 text-high-emphasis opacity-60">{{ item.fechaHora }}</small>
                    <v-spacer />
                    <v-icon v-if="item.isActive" color="primary" icon="mdi-bell" />
                    <v-icon v-else class="opacity-30" icon="mdi-bell-outline" />
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <v-divider class="mx-2" vertical></v-divider>
        <v-menu v-model="menu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-avatar class="mx-2" v-bind="props">
              <v-img alt="DD" src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-avatar>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                subtitle="Desarrollador"
                title="Dulce Díaz"
              >
              </v-list-item>
            </v-list>

            <v-divider />

            <v-list>
              <v-list-item>
                <v-switch v-model="message" color="purple" label="Enable messages" hide-details />
              </v-list-item>

              <v-list-item>
                <v-switch v-model="hints" color="purple" label="Enable hints" hide-details />
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer />

              <v-btn variant="text" @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" variant="text" @click="menu = false"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>

    <navigation-drawer
      :border-children="navigationDrawerProps.borderHijo"
      :drawer-children="navigationDrawerProps.drawerHijo"
      :drawer-parent="navigationDrawerProps.drawerPadre"
      :rail-children="navigationDrawerProps.railHijo"
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
      switch (clickCount.value) {
        case 0:
          navigationDrawerProps.value.borderHijo = true
          navigationDrawerProps.value.drawerHijo = true
          navigationDrawerProps.value.railHijo = true
          iconChildren.value = 'mdi-format-list-bulleted'
          break
        case 1:
          navigationDrawerProps.value.borderHijo = false
          navigationDrawerProps.value.drawerHijo = true
          navigationDrawerProps.value.railHijo = false
          iconChildren.value = 'mdi-menu-open'
          break
        case 2:
          navigationDrawerProps.value.borderHijo = false
          navigationDrawerProps.value.drawerHijo = false
          navigationDrawerProps.value.railHijo = true
          iconChildren.value = 'mdi-menu'
          break
      }
    }

    type Item = {
      id: number
      id_directorio: number
      etiqueta_directorio: string
      ruta_directorio: string
      id_usuario_origen: number
      nombre_usuario_origen: string
      id_usuario_destino: number
      nombre_usuario_destino: string
      descripcion: string
      fechaHora: string
      id_registro: number
      isActive: boolean
    }

    const items = ref<Item[]>([])

    items.value = [
      {
        id: 1,
        id_directorio: 2,
        etiqueta_directorio: 'Insidencias',
        ruta_directorio: '/core/sistemaList/',
        id_usuario_origen: 2,
        nombre_usuario_origen: 'Dulce Díaz',
        id_usuario_destino: 1,
        nombre_usuario_destino: 'Jefe',
        descripcion: 'Ha solicitado una nueva insidencia',
        fechaHora: '11/02/2025 12:45',
        id_registro: 1,
        isActive: true,
      },
      {
        id: 2,
        id_directorio: 2,
        etiqueta_directorio: 'Insidencias',
        ruta_directorio: '/core/sistemaList/',
        id_usuario_origen: 2,
        nombre_usuario_origen: 'Isai Maldonado',
        id_usuario_destino: 1,
        nombre_usuario_destino: 'Jefe de departamento',
        descripcion: 'Ha solicitado una nueva insidencia',
        fechaHora: '12/02/2025 12:45',
        id_registro: 2,
        isActive: true,
      },
      {
        id: 3,
        id_directorio: 2,
        etiqueta_directorio: 'Contratos',
        ruta_directorio: '/core/sistemaList/',
        id_usuario_origen: 2,
        nombre_usuario_origen: 'Jonathan Atlitec',
        id_usuario_destino: 1,
        nombre_usuario_destino: 'Jefa de RH',
        descripcion: 'Ha actualizado su contrato',
        fechaHora: '13/02/2025 12:45',
        id_registro: 1,
        isActive: true,
      },
    ]

    // Avatar
    const fav = ref(true)
    const menu = ref(false)
    const message = ref(false)
    const hints = ref(true)

    return {
      iconChildren,
      iconMenuParent,
      mergeProps,
      navigationDrawerProps,
      onClickDrawerChildren,
      onClickDrawerParent,
      toggleTheme,
      fav,
      menu,
      message,
      hints,
      items,
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
