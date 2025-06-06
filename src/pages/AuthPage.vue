<template>
    <main class="auth-page">
        <h1 class="form-title">Войти в аккаунт</h1>
        <section class="form-card">
            <form @submit.prevent="onSubmit" novalidate>
                <div class="mb-4">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" type="email" v-model="form.Email" required class="form-control"
                        placeholder="Введите email" autocomplete="email" />
                </div>
                <div class="mb-4 position-relative">
                    <label for="password" class="form-label">Пароль</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.Password" required
                        class="form-control pe-5" placeholder="Введите пароль" autocomplete="new-password"
                        minlength="6" />
                    <button type="button" class="password-toggle" @click="togglePasswordVisibility"
                        :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'">
                        <img :src="showPassword ? Eye : EyeOff" alt="" />
                    </button>
                </div>
                <!-- <Loader v-if="isLoading" /> -->
                <div v-if="errorMessage" class="reg__alert" role="alert">
                    <Error :errorMessage="errorMessage" />
                </div>
                <button type="submit" class="btn btn btn-outline-primary w-100 py-3 fw-semibold" :disabled="isLoading">
                    {{ isLoading ? 'Заходим...' : 'Вход' }}
                </button>
            </form>
        </section>
        <div class="register__links">
            <RouterLink :to="paths.Reg" class="router__link">Нету аккаунта? Создайте!</RouterLink>
            <RouterLink :to="paths.ForgetPassword" class="router__link">Забыли пароль?</RouterLink>
        </div>
    </main>

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
import Loader from '@/components/global/Loader.vue';

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
        errorMessage.value = `Ошибка авторизации - ${result.error}`;
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
    width: 100%;
    max-width: 700px;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 8px 20px rgb(0 0 0 / 0.07);
    padding: 3rem 2.5rem;
    box-sizing: border-box;
}

.form-title {
    font-weight: bold;
    font-size: components.$fs-xxlarge;
    line-height: 1.1;
    color: colors.$main;
    margin-bottom: 2.5rem;
    text-align: center;
}

.form-control {
    font-size: components.$fs-regular;
    border-radius: 0.5rem;
    border-color: #d1d5db;
    padding: 0.75rem 1rem;
    transition: border-color 0.3s ease;
    box-shadow: none;
}

.form-control:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgb(37 99 235 / 0.4);
}

.form-label {
    font-weight: 600;
    font-size: components.$fs-regular;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
}

.password-toggle {
    position: absolute;
    right: 1rem;
    transform: translateY(-180%);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.password-toggle img {
    width: 22px;
    height: 22px;
    user-select: none;
    pointer-events: none;
}

/* Submit button */
.btn-outline-success,
.btn-outline-primary {
    font-weight: 700;
    font-size: components.$button-fs;
    border-radius: 0.625rem;
    transition: background-color 0.3s ease;
}

.btn-outline-success:disabled,
.btn-outline-success[disabled],
.btn-outline-primary:disabled,
.btn-outline-primary[disabled] {
    background-color: #6b7280;
    border-color: #6b7280;
    cursor: not-allowed;
    opacity: 0.8;
}

/* Responsive for smaller screens */
@media (max-width: 480px) {
    .form-card {
        padding: 2rem 1.5rem;
    }

    .form-title {
        font-size: components.$fs-large;
    }
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