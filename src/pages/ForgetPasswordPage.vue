<template>
    <div class="login__container">
        <form class="form">
            <label>Воставновление пароля</label>
            <input type="text" name="email" placeholder="Введите пароль">
            <input type="button" name="confirm" value="Подтвердить">
            <RouterLink :to="paths.Auth" class="router__link">Уже есть аккаунт? Войдите!</RouterLink>
        </form>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import paths from '@/router/paths'

// TODO: Вся страница
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components.scss";


label {
    font-size: components.$fs-medium;
    font-weight: bold;
}
</style>

<style lang="scss">
@use "@/assets/styles/form.scss"
</style>