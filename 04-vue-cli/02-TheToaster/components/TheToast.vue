<template>
  <div class="toast" :class="typeClass">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{message}}</span>
    <span v-if="closeBtn" @click="close" class="toast__close-button">
      &times;
    </span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const icons = {
  success: 'check-circle',
  info: 'check-circle',
  warning: 'alert-circle',
  error: 'alert-circle'
}

export default {
  name: 'TheToast',

  components: { UiIcon },
  
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    closeBtn: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    typeClass() {
      return `toast_${this.type}`
    },
    icon() {
      return icons[this.type];
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.toast {
  position: relative;
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

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_info {
  color: var(--blue);
}

.toast.toast_warning {
  color: var(--yellow);
}

.toast.toast_error {
  color: var(--red);
}

.toast__close-button {
  position: absolute;
  top: 0;
  right: -24px;
  color: rgb(14, 13, 13);
  cursor: pointer;
}
</style>
