<template>
  <v-menu min-width="200px" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class="text-none pa-3 ml-3"
        density="compact"
        stacked
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
          @click="marcarComoVisto(item.id)"
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
</template>
<script lang="ts">
import { ref, computed, defineComponent, mergeProps, watch } from 'vue'
import { useDisplay } from 'vuetify'

export default defineComponent({
  name: 'Notificacion',
  props: {
    borderChildren: Boolean,
    drawerChildren: Boolean,
    drawerParent: Boolean,
    railChildren: Boolean,
  },
  setup(props, { emit }) {
    const drawerPropiedades = ref({
      borderHijo: ref(props.borderChildren),
      drawerHijo: ref(props.drawerChildren),
      drawerPadre: ref(props.drawerParent),
      railHijo: ref(props.railChildren),
    })

    watch(
      [
        () => props.borderChildren,
        () => props.drawerChildren,
        () => props.drawerParent,
        () => props.railChildren,
      ],
      (newDrawer) => {
        drawerPropiedades.value = {
          borderHijo: props.borderChildren,
          drawerHijo: props.drawerChildren,
          drawerPadre: props.drawerParent,
          railHijo: props.railChildren,
        }
      },
    )
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

    const marcarComoVisto = (id: number) => {
      const notificacion = items.value.find((n) => n.id === id)
      if (notificacion) {
        notificacion.isActive = false
      }
    }

    return {
      drawerPropiedades,
      smAndDown,
      selectParentItem,
      parentItems,
      childItems,
      mergeProps,
    }
  },
})
</script>
