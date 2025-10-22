<template>
  <v-select
    v-model="model"
    :chips="multiple || showChips"
    :clearable="clearable"
    :closable-chips="multiple"
    :color="color"
    :disabled="disabled"
    :hide-selected="hideSelected"
    :item-color="color"
    :item-title="itemTitle"
    :item-value="returnObject ? undefined : itemValue"
    :items="items"
    :label="label"
    :multiple="multiple"
    :placeholder="placeholder"
    :prepend-inner-icon="prependIcon"
    :return-object="returnObject"
    :rules="rules"
    :variant="variant"
    clear-icon="mdi-close"
    density="compact"
    hide-details="auto"
    no-data-text="No hay información disponible"
  >
    <!-- SELECCIÓN DINÁMICA -->
    <template v-slot:selection="{ item }">
      {{
        itemTitleDinamic
          ? typeof itemTitleDinamic === 'function'
            ? itemTitleDinamic(item.raw)
            : typeof item.raw === 'object'
              ? item.raw[itemTitleDinamic]
              : item.raw
          : typeof item.raw === 'object'
            ? item.raw[itemTitle]
            : item.raw
      }}
    </template>

    <!-- CHIP DINÁMICO -->
    <template v-if="multiple || showChips" v-slot:chip="{ props, item }">
      <v-chip
        v-bind="props"
        :text="typeof item.raw === 'object' ? item.raw[itemTitle] : item.raw"
        :color="color"
        label
        variant="flat"
      />
    </template>

    <!-- ITEM DINÁMICO -->
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="
          itemTitleDinamic
            ? typeof itemTitleDinamic === 'function'
              ? itemTitleDinamic(item.raw)
              : typeof item.raw === 'object'
                ? item.raw[itemTitleDinamic]
                : item.raw
            : typeof item.raw === 'object'
              ? item.raw[itemTitle]
              : item.raw
        "
      >
        <v-list-item-subtitle v-if="itemSubtitle">
          {{
            typeof itemSubtitle === 'function'
              ? itemSubtitle(item.raw)
              : typeof item.raw === 'object'
                ? item.raw[itemSubtitle]
                : item.raw
          }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>

    <!-- TOOLTIP SIMPLE -->
    <template v-if="tooltip && !$slots.tooltip" v-slot:prepend>
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

    <!-- TOOLTIP SLOT -->
    <template v-if="$slots.tooltip" v-slot:prepend>
      <v-tooltip interactive>
        <template #activator="{ props: tooltipProps }">
          <v-icon
            v-bind="mergeProps(tooltipProps)"
            icon="mdi-information-slab-circle-outline"
            size="20"
          />
        </template>
        <slot name="tooltip" />
      </v-tooltip>
    </template>
  </v-select>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'BecSelect',
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    modelValue: {
      type: [String, Number, Object, Array, null] as PropType<any>,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideSelected: {
      type: Boolean,
      default: false,
    },
    itemSubtitle: {
      type: [String, Function] as PropType<string | ((item: any) => string)>,
      default: null,
    },
    itemTitle: {
      type: String,
      default: 'label',
    },
    /**
     * Permite un título dinámico (función o propiedad).
     * Ejemplo implementación:
     * :item-title-dinamic="(item) => `${item.ejercicio} | Mes: ${item.mes} | Periodo: ${item.numeroperiodo}`"
     */
    itemTitleDinamic: {
      type: [String, Function] as PropType<string | ((item: any) => string)>,
      default: null,
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    label: String,
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    prependIcon: String,
    showChips: {
      type: Boolean,
      default: false,
    },
    tooltip: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    returnObject: {
      type: Boolean,
      default: false,
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
      clearable: computed(() => props.clearable),
      color: computed(() => props.color),
      disabled: computed(() => props.disabled),
      hideSelected: computed(() => props.hideSelected),
      itemSubtitle: computed(() => props.itemSubtitle),
      itemTitle: computed(() => props.itemTitle),
      itemTitleDinamic: computed(() => props.itemTitleDinamic),
      itemValue: computed(() => props.itemValue),
      items: computed(() => props.items),
      label: computed(() => props.label),
      mergeProps,
      model,
      multiple: computed(() => props.multiple),
      placeholder: computed(() => props.placeholder),
      prependIcon: computed(() => props.prependIcon),
      rules: computed(() => props.rules),
      showChips: computed(() => props.showChips),
      tooltip: computed(() => props.tooltip),
      variant: computed(() => props.variant),
    }
  },
})
</script>
