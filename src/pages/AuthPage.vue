<template>
    <div class="container">
        <div class="title">Войти в аккаунт</div>
        <div class="title__line"></div>
        <main class="auth-page">
            <section class="form-card">
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <label for="email" class="form-label">Email</label>
                        <input id="email" type="email" v-model="form.Email" required class="form-control"
                            placeholder="Введите email" autocomplete="email" />
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="password" class="form-label">Пароль</label>
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.Password" required
                            class="form-control pe-5" placeholder="Введите пароль" autocomplete="new-password"
                            minlength="3" />
                        <button type="button" class="password-toggle" @click="togglePasswordVisibility"
                            :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'">
                            <img :src="showPassword ? Eye : EyeOff" alt="" />
                        </button>
                    </div>
                    <div v-if="errorMessage" class="reg__alert" role="alert">
                        <Error :errorMessage="errorMessage" />
                    </div>
                    <button type="submit" class="btn btn__contrast__primary w-100 py-3 fw-semibold"
                        :disabled="isLoading">
                        {{ isLoading ? 'Загрузка...' : 'Вход' }}
                    </button>
                </form>
            </section>
            <div class="register__links">
                <RouterLink :to="paths.Reg" class="router__link">Нету аккаунта? Создайте!</RouterLink>
                <RouterLink :to="paths.ForgetPassword" class="router__link">Забыли пароль?</RouterLink>
            </div>
        </main>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import paths from '@/router/paths'
import router from '@/router/router';
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import names from '@/router/names';
import { login } from '@/service/accessingService.js';
import { isFormValid } from '@/helpers/formHelper.js';
import Eye from '@/assets/images/Eye.png'
import EyeOff from '@/assets/images/EyeOff.png'

const userStore = useUserStore();
const form = reactive({ Email: '', Password: '' });
const showPassword = ref(false);
const errorMessage = ref("");

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

const isLoading = computed(() => userStore.isLoading);

async function onSubmit() {
    if (userStore.isLoading) return;
    const { success, error } = isFormValid(form);
    if (!success) {
        errorMessage.value = error;
        return;
    }
    const result = await login(form.Email, form.Password)
    if (result.success === true) {
        console.log(`Пользователь ${userStore.name} как ${userStore.isEmployer ? 'Работодатель' : 'Соискатель'} авторизован`)
        router.push({ name: names.Account, });
    }
    else {
        errorMessage.value = `Ошибка авторизации - Неправильные данные для входа`;
    }
}


</script>

<style lang="scss" scoped>
@use "@/assets/styles/form.scss";
@use "@/assets/styles/components.scss";
@use "@/assets/styles/colors.scss";


.auth-page {
    // min-height: 100vh;
    background-color: colors.$background;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

.form-card {
    max-width: 700px;
}

.register__links {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.router__link {
    font-size: components.$fs-regular;
}

.reg__alert {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>