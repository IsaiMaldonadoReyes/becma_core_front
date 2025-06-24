<template>
  <v-select
    v-model="model"
    :items="items"
    :label="label"
    :multiple="multiple"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :rules="rules"
    chips
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    item-color="primary"
    variant="outlined"
  >
    <template v-if="tooltip" v-slot:prepend>
      <v-tooltip interactive>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon
            v-bind="mergeProps(tooltipProps)"
            icon="mdi-information-slab-circle-outline"
            size="20"
          />
        </template>
        <span v-html="tooltip"></span>
      </v-tooltip>
    </template>
  </v-select>
  <v-autocomplete
    v-model="model"
    :disabled="disabled"
    :item-title="itemTitle"
    :item-value="itemValue"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :return-object="returnObject"
    :rules="rules"
    auto-select-first
    chips
    clear-icon="mdi-close"
    clear-on-select
    clearable
    closable-chips
    color="primary"
    density="compact"
    filter-mode="every"
    item-color="primary"
    item-props
    no-data-text="No hay información disponible"
    variant="outlined"
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" :text="item.raw.descripcion" color="primary" variant="flat" />
    </template>

    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :subtitle="item.raw.idturno" :title="item.raw.descripcion" />
    </template>

    <template v-slot:prepend>
      <v-tooltip>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltipProps)" />
        </template>
        <span> Seleccione para poder ver las opciones </span>
      </v-tooltip>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps, PropType } from 'vue'

export default defineComponent({
  name: 'BecAutocomplete',
  props: {
    modelValue: {
      type: [String, Number, Object, Array] as PropType<any>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    label: String,
    itemTitle: String,
    itemValue: String,
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    prependIcon: String,
    tooltip: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    onModelUpdate: Function as PropType<(val: any) => void>,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val) // 🔧 actualiza el v-model en el padre
        if (props.onModelUpdate) {
          props.onModelUpdate(val) // 🔧 llama  función personalizada desde el Padre
        }
      },
    })

    const items = computed(() => props.items)
    const label = computed(() => props.label)
    const multiple = computed(() => props.multiple)
    const placeholder = computed(() => props.placeholder)
    const prependIcon = computed(() => props.prependIcon)
    const rules = computed(() => props.rules)
    const tooltip = computed(() => props.tooltip)

    return {
      items,
      label,
      mergeProps,
      model,
      multiple,
      placeholder,
      prependIcon,
      rules,
      tooltip,
    }
  },
})
</script>
