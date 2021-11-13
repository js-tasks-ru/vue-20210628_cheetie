<template>
  <div class="toasts">
    <the-toast v-for="toast in toasts" 
      :type="toast.type" 
      :message="toast.message" 
      :key="toast.id"
    />
  </div>
</template>

<script>
import TheToast from './TheToast';

export default {
  name: 'TheToastList',

  components: { TheToast },
  
  props: {
    toasts: {
      type: Array,
      required: true
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}
</style>
