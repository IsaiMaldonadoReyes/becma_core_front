<template>
  <v-app>
    <v-app-bar app clipped-left height="60">
      <!--v-app-bar-nav-icon class="ml-md-1 ml-lg-1 ml-xl-1" @click.stop="onClickDrawer" :icon="icon">
      </v-app-bar-nav-icon-->
      <v-btn-group variant="outlined" divided class="ml-md-3 ml-lg-3 ml-xl-3">
        <v-btn @click.stop="onClickDrawerParent" :icon="icon"></v-btn>
        <v-btn @click.stop="onClickDrawerChildren" :icon="iconChildren"></v-btn>
      </v-btn-group>
      <v-toolbar-title>
        <v-img class="my-3" contain height="40" />
      </v-toolbar-title>
      <v-spacer />

      <v-menu bottom :close-on-content-click="false" min-width="350px" offset-y right></v-menu>
      <template v-slot:append>
        <v-btn class="text-none" stacked density="compact">
          <v-checkbox-btn
            class="ma-0 pa-0"
            color="primary"
            false-icon="mdi-white-balance-sunny"
            true-icon="mdi-weather-night"
            @click="toggleTheme"
          >
          </v-checkbox-btn>
        </v-btn>

        <v-btn class="text-none" stacked density="compact" size="sm">
          <v-badge color="primary" content="2">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
        <v-divider class="mx-2" vertical></v-divider>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <!-- Drawer padre -->
    <v-navigation-drawer
      :rail="railParent"
      v-model="drawerParent"
      rail-width="130"
      :mobile="smAndDown"
    >
      <v-list nav color="primary">
        <!-- Iterar sobre los elementos padres -->
        <v-list-item
          v-for="parent in parentItems"
          :key="parent.id"
          :value="parent.nombre"
          @click="selectParentItem(parent.id)"
          lines="three"
          border
          color="primary"
          class="d-flex align-center justify-center"
        >
          <v-tooltip>
            <template v-slot:activator="{ props: tooltip }">
              <v-btn
                variant="flat"
                :prepend-icon="parent.icono"
                stacked
                v-bind="mergeProps(tooltip)"
              >
                {{ parent.etiqueta }}
              </v-btn>
            </template>
            <span> {{ parent.descripcion }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Drawer hijo -->
    <v-navigation-drawer
      :mobile="smAndDown"
      v-model="drawerChildren"
      elevation="10"
      :rail="railChildren"
    >
      <v-list>
        <!-- Iterar sobre los elementos hijos del padre seleccionado -->
        <v-list-item
          v-for="child in childItems"
          :key="child.id"
          :title="child.etiqueta"
          :value="child.id"
          :prepend-icon="child.icono"
          :border="borderChildren"
          color="primary"
        ></v-list-item>
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
import { ref, defineComponent, onMounted, onUnmounted, computed, mergeProps } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
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

    const railParent = ref(true)
    const drawerParent = ref(true)

    const railChildren = ref(true)
    const drawerChildren = ref(true)
    const icon = ref('mdi-format-list-bulleted')
    const iconChildren = ref('mdi-format-list-bulleted')
    const borderChildren = ref(true)

    // Contador para manejar el estado cíclico
    const clickCount = ref(0)

    const onClickDrawerParent = () => {
      if (drawerParent.value) {
        drawerParent.value = false
        icon.value = 'mdi-menu'
      } else {
        drawerParent.value = true
        icon.value = 'mdi-format-list-bulleted'
      }
    }

    const onClickDrawerChildren = () => {
      clickCount.value = (clickCount.value + 1) % 3
      switch (clickCount.value) {
        case 0:
          console.log('0')
          drawerChildren.value = true
          railChildren.value = true
          iconChildren.value = 'mdi-format-list-bulleted'
          borderChildren.value = true
          break
        case 1:
          console.log('1')
          drawerChildren.value = true
          railChildren.value = false
          iconChildren.value = 'mdi-menu-open'
          borderChildren.value = false
          break
        case 2:
          console.log('2')
          drawerChildren.value = false
          railChildren.value = true
          iconChildren.value = 'mdi-menu'
          borderChildren.value = false
          break
      }

      /*
      if (drawerChildren.value) {
        drawerChildren.value = false
        iconChildren.value = 'mdi-format-list-bulleted'
      } else {
        drawerChildren.value = true
        iconChildren.value = 'mdi-menu-close'
      }*/
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
          icon.value = 'mdi-menu-open'
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

    // Drawers

    // Limpio
    type CoreDirectorio = {
      id: number
      idSistema: number
      idPadre: number
      isActive: boolean
      nombre: string
      descripcion: string
      etiqueta: string
      ruta: string
      icono: string
      orden: number
    }

    const drawerItems = ref<CoreDirectorio[]>([])

    drawerItems.value = [
      {
        id: 1,
        idSistema: 1,
        idPadre: 0,
        isActive: true,
        nombre: 'becore',
        descripcion: 'Core principal del sistema',
        etiqueta: 'BECORE',
        ruta: '',
        icono: 'mdi-robot',
        orden: 1,
      },
      {
        id: 2,
        idSistema: 2,
        idPadre: 0,
        isActive: true,
        nombre: 'becloud',
        descripcion: 'Sistema de respaldos',
        etiqueta: 'BECLOUD',
        ruta: '',
        icono: 'mdi-cloud',
        orden: 2,
      },
      {
        id: 3,
        idSistema: 3,
        idPadre: 0,
        isActive: true,
        nombre: 'becnom',
        descripcion: 'Sistema de recursos humanos',
        etiqueta: 'BECNOM',
        ruta: '',
        icono: 'mdi-account-group',
        orden: 3,
      },
      {
        id: 4,
        idSistema: 4,
        idPadre: 0,
        isActive: true,
        nombre: 'becom',
        descripcion: 'Sistema comercial',
        etiqueta: 'BECOM',
        ruta: '',
        icono: 'mdi-chart-bar',
        orden: 4,
      },
      {
        id: 5,
        idSistema: 2,
        idPadre: 2,
        isActive: true,
        nombre: 'respaldos',
        descripcion: 'Consulta de respaldos BECMA',
        etiqueta: 'Respaldos',
        ruta: '',
        icono: 'mdi-cloud',
        orden: 1,
      },
      {
        id: 6,
        idSistema: 4,
        idPadre: 4,
        isActive: true,
        nombre: 'panel_de_resultados',
        descripcion: 'Panel de resultados',
        etiqueta: 'Panel de resultados',
        ruta: '',
        icono: 'mdi-chart-bar',
        orden: 1,
      },
      {
        id: 7,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'sistemas',
        descripcion: 'Sistemas de Becma',
        etiqueta: 'Sistema',
        ruta: '',
        icono: 'mdi-laptop',
        orden: 2,
      },
      {
        id: 8,
        idSistema: 3,
        idPadre: 3,
        isActive: true,
        nombre: 'contratos',
        descripcion: 'Contratos de empleados',
        etiqueta: 'Contratos',
        ruta: '',
        icono: 'mdi-file-sign',
        orden: 2,
      },
      {
        id: 9,
        idSistema: 3,
        idPadre: 3,
        isActive: true,
        nombre: 'insidencias',
        descripcion: 'Insidencias de empleados',
        etiqueta: 'Insidencias',
        ruta: '',
        icono: 'mdi-calendar-cursor',
        orden: 2,
      },
      {
        id: 10,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'roles',
        descripcion: 'Roles del sistema',
        etiqueta: 'Roles',
        ruta: '',
        icono: 'mdi-folder-account',
        orden: 2,
      },
      {
        id: 11,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'empresas',
        descripcion: 'Empresas del sistema',
        etiqueta: 'Empresas',
        ruta: '',
        icono: 'mdi-home-city',
        orden: 2,
      },
      {
        id: 12,
        idSistema: 1,
        idPadre: 1,
        isActive: true,
        nombre: 'usuarios',
        descripcion: 'Usuarios del sistema',
        etiqueta: 'Usuarios',
        ruta: '',
        icono: 'mdi-account',
        orden: 2,
      },
    ]
    // Obtener elementos padres (idPadre === 0)
    const parentItems = computed(() => drawerItems.value.filter((item) => item.idPadre === 0))

    // Estado para controlar el elemento padre seleccionado
    const selectedParentId = ref<number | null>(null)

    // Obtener elementos hijos del padre seleccionado
    const childItems = computed(() => {
      if (selectedParentId.value === null) return []
      return drawerItems.value.filter((item) => item.idPadre === selectedParentId.value)
    })

    // Método para seleccionar un elemento padre
    const selectParentItem = (id: number) => {
      if (!drawerChildren.value) {
        drawerChildren.value = true
      }
      selectedParentId.value = id
    }

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    return {
      toggleTheme,
      drawerParent,
      railParent,
      drawerChildren,
      railChildren,
      icon,
      onClickDrawer,
      selectParentItem,
      childItems,
      parentItems,
      mergeProps,
      onClickDrawerParent,
      onClickDrawerChildren,
      iconChildren,
      borderChildren,
      smAndDown,
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
