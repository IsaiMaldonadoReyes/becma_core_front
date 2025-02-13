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
    const items = ref([])

    return {
      drawer,
      items,
    }
  },

  methods: {
    cerrar() {
      this.$emit('cerrar', false)
    },
  },
  watch: {
    drawerp(newVal) {
      this.drawer = !newVal
    },
  },
  mounted() {
    if (this.$store.state.sessionStore.session.ruta == '/administrador') {
      this.items = [
        {
          title: 'Empresas',
          icon: 'mdi-home-city',
          route: '/administrador/empresas',
        },
        {
          title: 'Usuarios',
          icon: 'mdi-account',
          route: '/administrador/listaUsers',
        },
        {
          title: 'Roles',
          icon: 'mdi-shield-account',
          route: '/administrador/listaRoles',
        },
        {
          title: 'Contratos',
          icon: 'mdi-file-sign',
          route: '/administrador/asignacionContrato',
        },
        {
          title: 'Incidencias',
          icon: 'mdi-calendar-multiselect-outline',
          route: '/administrador/asignacionIncidenciaEmpresa',
        },
        {
          title: 'Fechas feriadas',
          icon: 'mdi-calendar-today-outline',
          route: '/administrador/asignacionEmpresaFechaFeriada',
        },
        {
          title: 'Dashboard',
          icon: 'mdi-finance',
          route: '/administrador/dashboardChart',
        },
        {
          title: 'Panel de resultados',
          icon: 'mdi-chart-arc',
          route: '/administrador/panelDeResultados',
        },
        {
          title: 'Perfiles',
          icon: 'mdi-account-edit',
          route: '/administrador/panelDeResultados',
        },
      ]
    } else if (this.$store.state.sessionStore.session.ruta == '/jefe') {
      this.items = [
        {
          title: 'Petición de incidencias',
          icon: 'mdi-calendar-multiselect-outline',
          route: '/jefe/listaIncidencias',
        },
      ]
    } else if (this.$store.state.sessionStore.session.ruta == '/empleado') {
      this.items = [
        {
          title: 'Recibos de nómina',
          icon: 'mdi-clipboard-text-clock-outline',
          route: '/empleado/listaRecibos',
        },
        {
          title: 'Incidencias',
          icon: 'mdi-calendar-multiselect-outline',
          route: '/empleado/solicitudIncidencia',
        },
        {
          title: 'Contratos asignados',
          icon: 'mdi-file-sign',
          route: '/empleado/contratoFirmado',
        },
      ]
    }
  },
})
</script>

<style>
@import '../sass/variables.scss';
@import '../styles/navigation-drawer.css';
</style>
