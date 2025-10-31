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
    :items="formattedItems"
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
      {{ getDisplayText(item.raw) }}
    </template>

    <!-- CHIP DINÁMICO -->
    <template v-if="multiple || showChips" v-slot:chip="{ props, item }">
      <v-chip v-bind="props" :text="getDisplayText(item.raw)" :color="color" label variant="flat" />
    </template>

    <!-- ITEM DINÁMICO -->
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="getDisplayText(item.raw)">
        <v-list-item-subtitle v-if="itemSubtitle">
          {{ getSubtitleText(item.raw) }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>

    <!-- TOOLTIP SIMPLE -->
    <template v-if="tooltip && !$slots.tooltip" v-slot:prepend>
      <div style="pointer-events: auto; cursor: help">
        <v-tooltip location="bottom">
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
      </div>
    </template>

    <!-- TOOLTIP SLOT -->
    <template v-if="$slots.tooltip" v-slot:prepend>
      <div style="pointer-events: auto; cursor: help">
        <v-tooltip location="bottom">
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
      </div>
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
      type: [String, Number, Object, Array, Boolean, null] as PropType<any>,
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
    // 🔹 v-model bidireccional
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val)
        if (props.onModelUpdate) props.onModelUpdate(val)
      },
    })

    // 🧩 Normaliza los items para aceptar booleans, strings, numbers u objetos
    const formattedItems = computed(() => {
      return props.items.map((item) => {
        if (typeof item === 'boolean') {
          return {
            [props.itemTitle]: item ? 'Sí' : 'No',
            [props.itemValue]: item,
          }
        }

        if (typeof item === 'string' || typeof item === 'number') {
          return {
            [props.itemTitle]: item.toString(),
            [props.itemValue]: item,
          }
        }

        return item // ya es objeto
      })
    })

    // 🔹 Texto mostrado en selección y lista
    const getDisplayText = (raw: any) => {
      if (typeof raw === 'boolean') return raw ? 'Sí' : 'No'

      if (props.itemTitleDinamic) {
        if (typeof props.itemTitleDinamic === 'function') return props.itemTitleDinamic(raw)
        if (typeof raw === 'object') return raw[props.itemTitleDinamic]
      }

      if (typeof raw === 'object') return raw[props.itemTitle] ?? ''
      return String(raw)
    }

    // 🔹 Subtítulo opcional
    const getSubtitleText = (raw: any) => {
      if (props.itemSubtitle) {
        if (typeof props.itemSubtitle === 'function') return props.itemSubtitle(raw)
        if (typeof raw === 'object') return raw[props.itemSubtitle]
      }
      return ''
    }

    // ✅ Retorno estructurado con tus computed originales + nuevos helpers
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
      formattedItems,
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
      getDisplayText,
      getSubtitleText,
    }
  },
})
</script>
