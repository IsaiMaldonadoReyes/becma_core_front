<template>
  <v-text-field
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :rules="rules"
    clear-icon="mdi-close"
    clearable
    color="primary"
    density="compact"
    hide-details="auto"
    variant="outlined"
  >
    <template v-slot:prepend>
      <v-tooltip interactive>
        <template v-slot:activator="{ props: tooltip }">
          <v-icon icon="mdi-information-outline" v-bind="mergeProps(tooltip)" />
        </template>
        <span>Código asignado al empleado</span>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps, PropType } from 'vue'

export default defineComponent({
  name: 'BecTextField',
  props: {
    modelValue: {
      type: [String, Number, Object, Array] as PropType<any>,
      required: true,
    },
    label: String,
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
