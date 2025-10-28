<template>
  <v-autocomplete
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
    auto-select-first
    clear-icon="mdi-close"
    clear-on-select
    density="compact"
    filter-mode="every"
    hide-details="auto"
    item-props
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
        :color="color"
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
      <v-tooltip interactive location="bottom">
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon
            v-bind="mergeProps(tooltipProps)"
            icon="mdi-information-slab-circle-outline"
            size="20"
          />
        </template>
        <template #default>
          <span v-html="tooltip"></span>
        </template>
      </v-tooltip>
    </template>

    <!-- TOOLTIP SLOT -->
    <template v-if="$slots.tooltip" v-slot:prepend>
      <v-tooltip interactive location="end">
        <template #activator="{ props: tooltipProps }">
          <v-icon
            v-bind="mergeProps(tooltipProps)"
            icon="mdi-information-slab-circle-outline"
            size="20"
          />
        </template>
        <template #default>
          <slot name="tooltip" />
        </template>
      </v-tooltip>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'BecAutocomplete',
  props: {
    modelValue: {
      type: [String, Number, Object, Array, null] as PropType<any>,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'primary',
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
      default: 'title',
    },
    itemTitleDinamic: {
      type: [String, Function] as PropType<string | ((item: any) => string)>,
      default: null,
    },
    itemValue: {
      type: String,
      default: 'id',
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
    placeholder: {
      type: String,
      default: 'Seleccione',
    },
    prependIcon: String,
    rules: {
      type: Array as PropType<((v: any) => true | string)[]>,
      default: () => [],
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    showChips: {
      type: Boolean,
      default: false,
    },
    tooltip: String,
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
        emit('update:modelValue', val)
        if (props.onModelUpdate) {
          props.onModelUpdate(val)
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
      returnObject: computed(() => props.returnObject),
      rules: computed(() => props.rules),
      showChips: computed(() => props.showChips),
      tooltip: computed(() => props.tooltip),
      variant: computed(() => props.variant),
    }
  },
})
</script>
