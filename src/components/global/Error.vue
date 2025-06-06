<template>
    <div class="error-message" role="alert" aria-live="assertive">
      <div class="error-text">
        {{displayMessage}}
        <slot>
        </slot>
      </div>
    </div>
</template>

<script setup>
  import { computed, useSlots } from 'vue'
    const props = defineProps(['errorMessage'])
    const displayMessage = computed(() => props.errorMessage || 'Произошла ошибка. Пожалуйста, попробуйте обновить страницу или обратитесь в поддержку.');
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as colors;

.error-message {
  background-color: colors.$error-bg;
  border: 1.5px solid colors.$error-border;
  box-shadow: 0 8px 24px colors.$error-shadow;
  color: colors.$error-color;
  padding: 1.1rem 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideIn 0.5s ease forwards;
  margin: 10px 0px;
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

.error-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  fill: colors.$error-color;
}

.error-text {
  flex-grow: 1;
  font-size: 1.1rem;
  line-height: 1.4;
}
</style>
