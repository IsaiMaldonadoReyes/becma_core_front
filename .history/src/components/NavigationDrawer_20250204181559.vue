<template>
  <div>
    <!-- Drawer padre -->
    <v-navigation-drawer
      v-model="drawerPropiedades.drawerPadre"
      :mobile="smAndDown"
      :rail="drawerPropiedades.railPadre"
      rail-width="130"
    >
      <v-list color="primary" nav>
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
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, mergeProps, onMounted, onUnmounted, watch } from 'vue'
import { useDisplay } from 'vuetify'
export default defineComponent({
  name: 'NavigationDrawer',

  props: {
    railParent: Boolean,
    railChildren: Boolean,
    drawerParent: Boolean,
    drawerChildren: Boolean,
  },
  setup(props, { emit }) {
    const drawerPropiedades = ref({
      railPadre: ref(props.railParent),
      railHijo: ref(props.railChildren),
      drawerPadre: ref(props.drawerParent),
      drawerHijo: ref(props.drawerChildren),
    })

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

    // Funcionalidad vuetify
    const { smAndDown } = useDisplay()

    return {
      drawer,
      items,
      drawerPropiedades,
      smAndDown,
    }
  },
})
</script>
