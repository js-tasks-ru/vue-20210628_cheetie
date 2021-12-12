<template>
  <button @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  
  emits: [ 'update:count' ],
  
  data() {
    return {
      localCount: null
    }
  },
  
  watch: {
    count: {
      immediate: true,
      handler(value) {
        this.localCount = value;
      }
    },
    localCount(value) {
      this.$emit('update:count', value);
    }
  },
  
  methods: {
    increment() {
      this.localCount++;
    }
  },
};
</script>
