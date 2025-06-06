<template>
  <div class="success-message" role="alert" aria-live="assertive">
    <div class="success-text">
      {{ displayMessage }}
      <slot>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';

// const slots = useSlots();
const props = defineProps(['success']);
const displayMessage = computed(() =>
  props.success || 'Операция выполнена успешно!'
);
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as colors;

.success-message {
  background-color: colors.$success-bg;
  border: 1.5px solid colors.$success-border;
  box-shadow: 0 8px 24px colors.$success-shadow;
  color: colors.$success-color;
  padding: 1.1rem 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideIn 0.5s ease forwards;
  margin-bottom: 10px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  fill: colors.$success-color;
}

.success-text {
  flex-grow: 1;
  font-size: 1.1rem;
  line-height: 1.4;
}
</style>