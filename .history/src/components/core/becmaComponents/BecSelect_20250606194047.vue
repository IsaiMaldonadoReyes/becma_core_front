<template>
  <v-select
    v-if="tipo === 'select'"
    v-model="selected"
    :items="items"
    :label="etiqueta"
    :placeholder="placeholder"
    :prepend-inner-icon="icono"
    chips
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    item-color="primary"
    item-title="title"
    item-value="value"
    variant="outlined"
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" :text="item.raw.title" color="primary" variant="flat" />
    </template>

    <template v-slot:prepend>
      <v-tooltip interactive>
        <template v-slot:activator="{ props: tooltip }">
          <v-icon
            icon="mdi-information-slab-circle-outline"
            v-bind="mergeProps(tooltip)"
            size="20"
          />
        </template>
        <span v-html="ayuda" />
      </v-tooltip>
    </template>
  </v-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { mergeProps } from 'vuetify/lib/util/helpers'

export interface SelectItem {
  title: string
  value: any
  [key: string]: any
}

export default defineComponent({
  name: 'CampoSelect',
  props: {
    modelValue: {
      type: [String, Number, Object, null],
      default: null,
    },
    items: {
      type: Array as () => SelectItem[],
      required: true,
    },
    etiqueta: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    icono: {
      type: String,
      default: 'mdi-apps',
    },
    ayuda: {
      type: String,
      default: '',
    },
    tipo: {
      type: String,
      default: 'select',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (val) => {
        selected.value = val
      },
    )

    watch(selected, (val) => {
      emit('update:modelValue', val)
    })

    return {
      selected,
      mergeProps,
    }
  },
})
</script>
