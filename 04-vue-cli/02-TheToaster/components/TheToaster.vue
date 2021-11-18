<template>
  <div class="toasts">
    <the-toast-list :toasts="toasts" />
  </div>
</template>

<script>
import TheToastList from './TheToastList';

let counter = 0;

const createToast = (type, message) => ({
  type,
  message,
  id: counter++
});

export default {
  name: 'TheToaster',

  components: { TheToastList },
  
  data() {
    return {
      toasts: [],
      timers: [],
      lifetime: 5000
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
    },
    success(message) {
      this.addToast('success', message);
    },
    error(message) {
      this.addToast('error', message);
    }
  },
  
  beforeUnmount() {
    this.timers.forEach(clearTimeout);
  },
};
</script>
