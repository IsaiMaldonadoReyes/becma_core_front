<template>
  <v-select
    v-model="modelValue"
    :items="items"
    :label="etiqueta"
    :placeholder="placeholder"
    :prepend-inner-icon="icono"
    :rules="rules"
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
      <v-chip v-bind="props" :text="item.raw.title ?? item.raw" color="primary" variant="flat" />
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

<script setup>
import { computed } from 'vue'
import { mergeProps } from 'vuetify/lib/util/helpers'
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
// Props
const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null],
    required: true,
  },
  items: {
    type: Array,
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
    default: 'mdi-information-slab-circle-outline',
  },
  ayuda: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Rules (valida si required = true)
const rules = computed(() => {
  return props.required
    ? [(v) => (v != null && String(v).length > 0) || 'Este campo es obligatorio']
    : []
})
</script>
