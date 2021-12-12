import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      operation: 'sum',
      n1: null,
      n2: null
    }
  },
  computed: {
    result() {
      switch (this.operation) {
        case 'sum': return this.n1 + this.n2; 
        case 'subtract': return this.n1 - this.n2; 
        case 'multiply': return this.n1 * this.n2; 
        case 'divide': return this.n1 / this.n2; 
        default: return 0;
      }
    }
  }
}).mount('#app');
