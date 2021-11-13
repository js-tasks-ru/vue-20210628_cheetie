<template>
  <div class="toasts">
    <the-toast-list :toasts="toasts" />
  </div>
</template>

<script>
import TheToastList from './TheToastList';

// По названиям типов будут созданы одноименные методы
const DEFAULT_TYPES = ['success', 'error'];
const DEFAULT_LIFETIME = 5000;

const createToast = (type, message) => ({
  type,
  message,
  id: Date.now()
});

export default {
  name: 'TheToaster',

  components: { TheToastList },
  
  data() {
    return {
      toasts: [],
      timers: [],
      types: DEFAULT_TYPES,
      lifetime: DEFAULT_LIFETIME
    }
  },

  methods: {
    addToast(type, message) {
      const toast = createToast(type, message);
      this.toasts.push(toast);

      if (this.lifetime) {
        const timer = setTimeout(this.removeToast, this.lifetime, toast);
        this.timers.push(timer);
      }
    },
    removeToast(toast) {
      this.toasts.splice(this.toasts.findIndex(({ id }) => id === toast.id), 1);
    }
  },
  
  created() {
    this.types.forEach((type) => {
      this[type] = this.addToast.bind(this, type);
    });
  },
  
  beforeUnmount() {
    this.timers.forEach(clearTimeout);
  },
};
</script>
