<template>
  <v-autocomplete
    v-model="model"
    :disabled="disabled"
    :item-title="itemTitle"
    :item-value="returnObject ? undefined : itemValue"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :return-object="returnObject"
    :rules="rules"
    :multiple="multiple"
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
    <!-- CHIP DINÁMICO -->
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" :text="item.raw[itemTitle]" color="primary" variant="flat" />
    </template>

    <!-- ITEM DINÁMICO -->
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="item.raw[itemTitle]" :subtitle="item.raw[itemValue]" />
    </template>

    <!-- TOOLTIP -->
    <template v-if="tooltip" v-slot:prepend>
      <v-tooltip>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltipProps)" />
        </template>
        <span v-html="tooltip"></span>
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
    disabled: {
      type: Boolean,
      default: false,
    },
    itemTitle: String,
    itemValue: String,
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    label: String,
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    prependIcon: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    tooltip: String,
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

    const disabled = computed(() => props.disabled)
    const itemTitle = computed(() => props.itemTitle)
    const itemValue = computed(() => props.itemValue)
    const items = computed(() => props.items)
    const label = computed(() => props.label)
    const multiple = computed(() => props.multiple)
    const placeholder = computed(() => props.placeholder)
    const prependIcon = computed(() => props.prependIcon)
    const rules = computed(() => props.rules)
    const returnObject = computed(() => props.returnObject)
    const tooltip = computed(() => props.tooltip)

    return {
      disabled,
      itemTitle,
      itemValue,
      items,
      label,
      mergeProps,
      model,
      multiple,
      placeholder,
      prependIcon,
      returnObject,
      rules,
      tooltip,
    }
  },
})
</script>
