<template>
    <div class="register__container">
        <form class="login__form" @submit.prevent="RegisterHandler">
            <text v-if="isUserRegister">Создайте свой аккаунт</text>
            <text v-else>Регистрация организации</text>
            <div style="height: 100px;" class="message__container">
                <div v-if="errorMessage != ''" class="text-danger message">
                    {{ errorMessage }}
                </div>
            </div>
            <input v-model="email" type="text" name="email" placeholder="Введите почту">
            <input v-model="password" type="password" name="password" placeholder="Введите пароль">
            <input v-if="isUserRegister" class="fbtn" type="submit" name="confirm" value="Подтвердить">
            <input v-else type="submit" class="fbtn" id="org-reg" name="confirm" value="Зарегистрироваться">
            <RouterLink :to="paths.Auth" class="router__link">Уже есть аккаунт? Войдите!</RouterLink>
            <RouterLink v-if="isUserRegister" :to="paths.RegOrg" class="router__link">Создать аккаунт организации
            </RouterLink>
        </form>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import paths from '@/router/paths'
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isUserRegister = computed(() => route.path === paths.Reg);

const email = ref("");
const password = ref("");

function RegisterHandler() {
    // TODO: Реализовать регистрацию пользователя
    console.log(`Register - ${isUserRegister.value} Email: ${email.value}, Password: ${password.value}`);
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/form.scss';
@use "@/assets/styles/components.scss";
@use "@/assets/styles/colors.scss";

#org-reg {
    background-color: colors.$second;
    color: colors.$main;

    &:hover {
        opacity: 0.9;
    }
}
</style>