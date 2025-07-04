<template>
  <v-text-area
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    :prefix="prefix"
    :prepend-inner-icon="prependIcon"
    :rules="rules"
    :variant="variant"
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    rows="1"
    auto-grow
    row-height="15"
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
  </v-text-area>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'BecTextArea',
  props: {
    modelValue: {
      type: [String, Number, Object, Array, null] as PropType<any>,
      default: null,
    },
    label: String,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    tooltip: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    onModelUpdate: Function as PropType<(val: any) => void>,
    variant: {
      type: String as PropType<
        'outlined' | 'filled' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
      >,
      default: 'outlined',
    },
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

    return {
      label: computed(() => props.label),
      mergeProps,
      model,
      placeholder: computed(() => props.placeholder),
      prefix: computed(() => props.prefix),
      prependIcon: computed(() => props.prependIcon),
      rules: computed(() => props.rules),
      tooltip: computed(() => props.tooltip),
      variant: computed(() => props.variant),
    }
  },
})
</script>
