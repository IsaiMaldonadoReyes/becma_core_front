<template>
  <v-select
    v-model="model"
    :items="items"
    :label="label"
    :multiple="multiple"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon || 'mdi-cash-clock'"
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
        <span>{{ tooltip }}</span>
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
    placeholder: String,
    prependIcon: String,
    tooltip: String,
    multiple: {
      type: Boolean,
      default: false,
    },
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
        emit('update:modelValue', val)
        if (props.onModelUpdate) {
          props.onModelUpdate(val)
        }
      },
    })

    return {
      model,
      label: props.label,
      placeholder: props.placeholder,
      prependIcon: props.prependIcon,
      tooltip: props.tooltip,
      multiple: props.multiple,
      rules: props.rules,
      items: props.items,
      mergeProps,
    }
  },
})
</script>
