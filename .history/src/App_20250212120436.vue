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
              <v-badge color="primary" content="2">
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
                :value="item.id"
                active-class="text-primary"
                class="py-3 border-b"
                border
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

                    <v-icon v-if="isSelected" color="primary" icon="mdi-bell" />
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
      console.log('onClickDrawerChildren' + clickCount.value)
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

    type Notificacion = {
      id: number
      action: string
      headline: string
      subtitle: string
      title: string
    }
    const notificacionItems = ref<Notificacion[]>([])

    /** usuario origen,
     * id_directorio nombre del módulo(directorio) desde dónde se hizo,
     * descripción,
     * fecha y hora cuando se hizo,
     * id registro
     * id usuario destino
     *
     */
    type Item = {
      id: number
      id_directorio: number
      etiqueta_directorio: string
      id_usuario_origen: number
      nombre_usuario_origen: string
      id_usuario_destino: number
      nombre_usuario_destino: string
      descripcion: string
      fechaHora: string
      id_registro: number
    }

    const items = ref<Item[]>([])

    items.value = [
      {
        id: 1,
        id_directorio: 2,
        etiqueta_directorio: 'Insidencias',
        id_usuario_origen: 2,
        nombre_usuario_origen: 'Dulce Díaz',
        id_usuario_destino: 1,
        nombre_usuario_destino: 'Jefe',
        descripcion: 'Ha solicitado una nueva insidencia',
        fechaHora: '11/02/2025 12:45',
        id_registro: 1,
      },
      {
        id: 2,
        id_directorio: 2,
        etiqueta_directorio: 'Insidencias',
        id_usuario_origen: 2,
        nombre_usuario_origen: 'Isai Maldonado',
        id_usuario_destino: 1,
        nombre_usuario_destino: 'Jefe de departamento',
        descripcion: 'Ha solicitado una nueva insidencia',
        fechaHora: '12/02/2025 12:45',
        id_registro: 1,
      },
      {
        id: 3,
        id_directorio: 2,
        etiqueta_directorio: 'Contratos',
        id_usuario_origen: 2,
        nombre_usuario_origen: 'Jonathan Atlitec',
        id_usuario_destino: 1,
        nombre_usuario_destino: 'Jefa de RH',
        descripcion: 'Ha actualizado su contrato',
        fechaHora: '13/02/2025 12:45',
        id_registro: 1,
      },
    ]

    // Notificaciones
    notificacionItems.value = [
      {
        id: 1,
        action: '15 min',
        headline: 'Directorio',
        subtitle: `Descripción de la notificación`,
        title: 'Dulce Díaz',
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
      notificacionItems,
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
