<template>
  <div v-if="state" :class="suit()">
    <slot
      :items="state.items"
      :refine="state.refine"
      :has-no-results="state.hasNoResults"
      :can-refine="state.canRefine"
    >
      <select :class="suit('select')" v-model="selected" @change="handleChange">
        <option
          v-for="item in state.items"
          :key="item.value"
          :class="suit('option')"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
    </slot>
  </div>
</template>

<script>
import { connectHitsPerPage } from 'instantsearch.js/es/connectors';
import { createPanelConsumerMixin } from '../mixins/panel';
import { createWidgetMixin } from '../mixins/widget';
import { createSuitMixin } from '../mixins/suit';

export default {
  name: 'AisHitsPerPage',
  mixins: [
    createSuitMixin({ name: 'HitsPerPage' }),
    createWidgetMixin(
      {
        connector: connectHitsPerPage,
      },
      {
        $$widgetType: 'ais.hitsPerPage',
      }
    ),
    createPanelConsumerMixin(),
  ],
  props: {
    items: {
      type: Array,
      required: true,
    },
    transformItems: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      selected: this.items.find((item) => item.default === true).value,
    };
  },
  computed: {
    widgetParams() {
      return {
        items: this.items,
        transformItems: this.transformItems,
      };
    },
  },
  methods: {
    handleChange() {
      this.state.refine(this.selected);
    },
  },
};
</script>
