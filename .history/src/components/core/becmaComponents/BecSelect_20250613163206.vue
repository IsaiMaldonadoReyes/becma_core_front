<template>
  <v-select
    v-model="model"
    :items="items"
    :label="label"
    :multiple="multiple"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :rules="rules"
    :variant="variant || 'outlined'"
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    item-color="primary"
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
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps, PropType } from 'vue'

export default defineComponent({
  name: 'BecSelect',
  props: {
    modelValue: {
      type: [String, Number, Object, Array] as PropType<any>,
      required: true,
    },
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
    tooltip: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    onModelUpdate: Function as PropType<(val: any) => void>,
    variant: String,
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
    const variant = computed(() => props.variant)

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
      variant,
    }
  },
})
</script>
