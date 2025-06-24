<template>
  <v-select
    v-model="selected"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :prepend-inner-icon="icon"
    item-title="etiqueta"
    item-value="id"
    return-object
    clearable
    clear-icon="mdi-close"
    color="primary"
    density="compact"
    variant="outlined"
    hide-details="auto"
    persistent-hint
  >
    <template v-slot:prepend>
      <v-tooltip v-if="tooltip" interactive>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon :icon="icon" v-bind="mergeProps(tooltipProps)" size="20" />
        </template>
        <span v-html="tooltip" />
      </v-tooltip>
    </template>

    <template #selection="{ item, index }">
      <v-chip :key="index" color="primary" variant="flat">
        {{ item.title }}
      </v-chip>
    </template>
  </v-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { mergeProps } from 'vuetify/lib/util/helpers'

export interface SelectItem {
  id: number
  etiqueta: string
  [key: string]: any
}

export default defineComponent({
  name: 'BecSelect',
  props: {
    modelValue: {
      type: Object as () => SelectItem | null,
      default: null,
    },
    items: {
      type: Array as () => SelectItem[],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'mdi-apps',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref<SelectItem | null>(props.modelValue)

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
