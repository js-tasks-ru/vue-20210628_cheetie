<template>
  <div class="image-uploader">
    <label 
      class="image-uploader__preview" 
      :class="{ 'image-uploader__preview-loading': loading }" 
      style="--bg-url: url('/link.jpeg')"
    >
      <span class="image-uploader__text">{{ state.text }}</span>
      <input type="file" 
        accept="image/*" 
        v-bind="$attrs"
        @click="handleClick"
        @change="handleChange"
        class="image-uploader__input" 
        ref="input"   
      />
    </label>
  </div>
</template>

<script>
const states = {
  initial: {
    name: 'initial',
    text: 'Загрузить изображение', 
  },
  pending: {
    name: 'pending',
    text: 'Загрузка...', 
  },
  completed: {
    name: 'completed',
    text: 'Удалить изображение'
  },
}

export default {
  name: 'UiImageUploader',
  
  inheritAttrs: false,
  
  props: {
    preview: String,
    uploader: Function
  }, 
  
  emits: ['select', 'upload', 'error', 'remove'],
  
  data() {
    return {
      image: null,
      loading: false
    }
  },
  
  computed: {
    state() {
      return states[this.loading ? 'pending' : this.image ? 'completed' : 'initial'];
    },
    backgroundImage() {
      return this.image ? `url('${this.image}')` : 'var(--default-cover)';
    },
  },
  
  methods: {
    handleClick(e) {
      if (this.state.name !== 'initial') {
        e.preventDefault();
      }
      if (this.state.name === 'completed') {
        this.remove();
      }
    },
    handleChange(e) {
      const file = e.target.files[0];

      if (file) {
        this.uploadFile(file);
        this.select(file);
      }
    },
    uploadFile(file) {
      if (this.uploader) {
        this.loading = true;
        this.uploader(file)
          .then(this.upload, this.error)
          .finally(() => this.loading = false);
      }
    },
    select(file) {
      this.image = URL.createObjectURL(file);
      this.$emit('select', file);
    },
    reset() {
      this.image = null;
      this.$refs.input.value = '';
      // URL.revokeObjectURL(this.image);
    },
    upload(payload) {
      this.$emit('upload', payload);
    },
    error(payload) {
      this.reset();
      this.$emit('error', payload);
    },
    remove() {
      this.reset();
      this.$emit('remove');
    },
  },

  created() {
    this.image = this.preview;
  },

  beforeUnmount() {
    this.reset();
  }
  
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: 
    linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
    v-bind(backgroundImage);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
