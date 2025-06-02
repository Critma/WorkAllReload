<template>
    <div class="login__container">
        <form class="login__form">
            <text>Войдите в свой аккаунт</text>
            <input type="text" name="username" placeholder="Введите логин" v-model="localAuth.login">
            <input type="password" name="password" placeholder="Введите пароль" v-model="localAuth.password">
            <input :disabled="userStore.isLoading" class="fbtn" id="confirm" type="button" @click="navToAccount" name="confirm"
                value="Подтвердить">
            <RouterLink :to="paths.Reg" class="router__link">Нету аккаунта? Создайте!</RouterLink>
            <RouterLink :to="paths.ForgetPassword" class="router__link">Забыли пароль?</RouterLink>
        </form>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import paths from '@/router/paths'
import router from '@/router/router';
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import names from '@/router/names';
import { login } from '@/service/accessingService';

const userStore = useUserStore();
const localAuth = reactive({ login: 'nickolay@bk.ru', password: 'Hard123Password!)' });

async function navToAccount() {
    if (userStore.isLoading) return;
    const result = await login(localAuth.login, localAuth.password)
    if (result.success === true) {
        console.log(`Пользователь ${userStore.name} как ${userStore.isEmployer? 'Работодатель': 'Соискатель'} авторизован`)
        router.push({ name: names.Account, params: { id: userStore.ID } });
    }
    else {
        alert(`Ошибка авторизации - ${result.error}`)
    }
}


</script>

<style lang="scss" scoped>
@use "@/assets/styles/form.scss";
@use "@/assets/styles/components.scss";

.router__link {
    font-size: components.$fs-regular;
}
</style>