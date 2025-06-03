<template>
    <div class="login__container">
        <form class="login__form">
            <text>Войдите в свой аккаунт</text>
            <div style="height: 100px;" class="message__container">
                <div v-if="errorMessage != ''" class="text-danger message">
                    {{ errorMessage }}
                </div>
            </div>
            <input type="text" name="username" placeholder="Введите логин" v-model="localAuth.login">
            <div class="password__container">
                <input id="password" :type="type" name="password" placeholder="Введите пароль"
                    v-model="localAuth.password">
                <img :src="eye" class="img__button" @click="showPassword">
            </div>
            <input :disabled="userStore.isLoading" class="fbtn" id="confirm" type="button" @click="navToAccount"
                name="confirm" value="Подтвердить">
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
import Eye from '@/assets/images/Eye.png'
import EyeOff from '@/assets/images/EyeOff.png'

const userStore = useUserStore();
const localAuth = reactive({ login: 'nickolay@bk.ru', password: 'Hard123Password!)' });
const type = ref('password');
const eye = ref(EyeOff);
const errorMessage = ref("");

function showPassword() {
    if (type.value === 'password') {
        type.value = 'text';
        eye.value = Eye;
    } else {
        type.value = 'password';
        eye.value = EyeOff;
    }
}

async function navToAccount() {
    if (userStore.isLoading) return;
    const result = await login(localAuth.login, localAuth.password)
    if (result.success === true) {
        console.log(`Пользователь ${userStore.name} как ${userStore.isEmployer ? 'Работодатель' : 'Соискатель'} авторизован`)
        router.push({ name: names.Account, params: { id: userStore.ID } });
    }
    else {
        errorMessage.value = `Ошибка авторизации - ${result.error}`;
        setTimeout(() => {
            errorMessage.value = "";
        }, 4000);
    }
}


</script>

<style lang="scss" scoped>
@use "@/assets/styles/form.scss";
@use "@/assets/styles/components.scss";
@use "@/assets/styles/colors.scss";

.router__link {
    font-size: components.$fs-regular;
}

.password__container {
    display: flex;
    // align-items: center;
    // justify-content: center;
}

.img__button {
    border: 1px solid colors.$second;
    border-radius: 5px;
    height: 40px;
    cursor: pointer;
}

#password {
    width: 474px;
}
</style>