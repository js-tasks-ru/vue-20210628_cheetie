<template>
  <ui-input v-bind="$attrs" :type="type" :model-value="date" @input="updateValue">
    <template v-for="slotName in Object.keys($slots)" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  inheritAttrs: false,

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => [ 'date', 'time', 'datetime-local' ].includes(value),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },
  
  emits: ['update:modelValue'],
  
  computed: {
    date() {
      return this.modelValue && new Date(this.modelValue)
        .toISOString()
        .substring(...this.snippet);
    },
    snippet() {
      const withStep = this.$attrs.step && this.$attrs.step % 60;

      return [
        this.type === 'time' ? 11 : 0, 
        this.type === 'date' ? 10 : withStep ? 19 : 16
      ];
    }
  },
  
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.valueAsNumber || null);
    },
    // calcLocalDate(date) {
    //   return date + new Date().getTimezoneOffset() * 60e3;
    // },
  },

};
</script>
