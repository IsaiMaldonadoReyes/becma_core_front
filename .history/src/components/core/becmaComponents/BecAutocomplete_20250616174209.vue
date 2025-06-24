<template>
  <v-autocomplete
    v-model="model"
    :disabled="disabled"
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
    :chips="="multiple ? true : false""
    clear-icon="mdi-close"
    clear-on-select
    clearable
    :closable-chips="multiple ? true : false"
    color="primary"
    density="compact"
    filter-mode="every"
    hide-details="auto"
    item-color="primary"
    item-props
    no-data-text="No hay información disponible"
  >
    <!-- CHIP DINÁMICO -->
    <template v-slot:chip="{ props, item }">
      <v-chip
        v-bind="props"
        :text="typeof item.raw === 'object' ? item.raw[itemTitle] : item.raw"
        color="primary"
        variant="flat"
      />
    </template>

    <!-- ITEM DINÁMICO -->
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="typeof item.raw === 'object' ? item.raw[itemTitle] : item.raw"
        :subtitle="typeof item.raw === 'object' ? item.raw[itemValue] : ''"
      />
    </template>

    <!-- TOOLTIP -->
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
  </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, computed, mergeProps } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "BecAutocomplete",
  props: {
    modelValue: {
      type: [String, Number, Object, Array] as PropType<any>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    itemTitle: {
      type: String,
      default: "label",
    },
    itemValue: {
      type: String,
      default: "value",
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
    variant: {
      type: String as PropType<
        | "outlined"
        | "filled"
        | "plain"
        | "underlined"
        | "solo"
        | "solo-inverted"
        | "solo-filled"
      >,
      default: "outlined",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit("update:modelValue", val); // 🔧 actualiza el v-model en el padre
        if (props.onModelUpdate) {
          props.onModelUpdate(val); // 🔧 llama  función personalizada desde el Padre
        }
      },
    });

    const disabled = computed(() => props.disabled);
    const itemTitle = computed(() => props.itemTitle);
    const itemValue = computed(() => props.itemValue);
    const items = computed(() => props.items);
    const label = computed(() => props.label);
    const multiple = computed(() => props.multiple);
    const placeholder = computed(() => props.placeholder);
    const prependIcon = computed(() => props.prependIcon);
    const returnObject = computed(() => props.returnObject);
    const rules = computed(() => props.rules);
    const tooltip = computed(() => props.tooltip);
    const variant = computed(() => props.variant);

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
      variant,
    };
  },
});
</script>
