<template>
    <div class="container">
        <div class="title">Регистрация <span>{{ isUserRegister ? 'соискателя' : 'работодателя' }}</span></div>
        <div class="title__line"></div>
        <main class="registration-page">
            <section class="form-card">
                <form @submit.prevent="onSubmit">
                    <div class="row">
                        <div class="col">
                            <div class="mb-4">
                                <label for="name" class="form-label">{{ isUserRegister ? 'Имя' : 'Название организация'
                                    }} <span style="color: red;">*</span></label>
                                <input id="name" type="text" v-model="form.Name" required class="form-control"
                                    placeholder="Введите имя" autocomplete="name" maxlength="150" />
                            </div>
                            <div class="mb-4">
                                <label for="email" class="form-label">Email <span style="color: red;">*</span></label>
                                <input id="email" type="email" v-model="form.Email" required class="form-control"
                                    placeholder="Введите email" autocomplete="email" maxlength="320" />
                            </div>
                            <div v-if="!isUserRegister" class="mb-4">
                                <label for="inn" class="form-label">INN <span style="color: red;">*</span></label>
                                <input id="inn" type="inn" v-model="form.INN" required class="form-control"
                                    placeholder="Введите INN (10 символов)" autocomplete="inn" maxlength="10"
                                    pattern="\d{10}" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-4">
                                <label for="phone" class="form-label">Телефон <span style="color: red;">*</span></label>
                                <input id="phone" type="tel" v-model="form.PhoneNumber"
                                    placeholder="+79000000000" class="form-control" autocomplete="tel"
                                    pattern="^\+?\d{6,15}$" maxlength="15" />
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="password" class="form-label">Пароль <span
                                        style="color: red;">*</span></label>
                                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.Password"
                                    required class="form-control pe-5" placeholder="Введите пароль"
                                    autocomplete="new-password" minlength="6" maxlength="120" />
                                <button type="button" class="password-toggle" @click="togglePasswordVisibility"
                                    :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'">
                                    <img :src="showPassword ? Eye : EyeOff" alt="" />
                                </button>
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="passwordConfirm" class="form-label">Подтверждение пароля <span
                                        style="color: red;">*</span></label>
                                <input :type="showConfirmPassword ? 'text' : 'password'" id="passwordConfirm"
                                    v-model="form.PasswordConfirm" required class="form-control pe-5"
                                    placeholder="Подтвердите пароль" autocomplete="new-password" minlength="6"
                                    maxlength="120" />
                                <button type="button" class="password-toggle" @click="toggleConfirmPasswordVisibility"
                                    :aria-label="showConfirmPassword ? 'Скрыть подтверждение пароля' : 'Показать подтверждение пароля'">
                                    <img :src="showConfirmPassword ? Eye : EyeOff" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="reg__alert" role="alert">
                        <Error v-if="errorMessage != ''" :errorMessage="errorMessage" />
                        <Success v-if="success != ''" :success="success" />
                    </div>
                    <button v-if="isUserRegister" type="submit"
                        class="btn btn__contrast__primary w-100 py-3 fw-semibold" :disabled="isLoading">
                        {{ isLoading ? 'Регистрируем...' : 'Зарегистрироваться' }}
                    </button>
                    <button v-else type="submit" class="btn btn__contrast__success w-100 py-3 fw-semibold"
                        :disabled="isLoading">
                        {{ isLoading ? 'Загрузка...' : 'Зарегистрироваться' }}
                    </button>
                </form>
            </section>
            <div class="register__links">
                <RouterLink :to="paths.Auth" class="router__link">Уже есть аккаунт? Войдите!</RouterLink>
                <RouterLink v-if="isUserRegister" :to="paths.RegOrg" class="router__link">Создать аккаунт организации
                </RouterLink>
                <RouterLink v-if="!isUserRegister" :to="paths.Reg" class="router__link">Создать аккаунт соискателя
                </RouterLink>
            </div>
        </main>
    </div>
</template>


<script setup>
import { RouterLink } from 'vue-router';
import paths from '@/router/paths'
import { computed, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Eye from '@/assets/images/Eye.png';
import EyeOff from '@/assets/images/EyeOff.png';
import { isFormValid } from '@/helpers/formHelper';
import Error from '@/components/global/Error.vue';
import Success from '@/components/global/Success.vue';
import router from '@/router/router';
import { registerCandidate } from '@/service/candidateService';
import { registerEmployer } from '@/service/employerService';

const route = useRoute();
const isUserRegister = computed(() => route.path === paths.Reg);
const errorMessage = ref("");
const success = ref("");
const isLoading = ref(false);

const form = reactive({
    Email: '',
    Name: '',
    Password: '',
    PasswordConfirm: '',
    PhoneNumber: '',
    INN: ''
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}
function toggleConfirmPasswordVisibility() {
    showConfirmPassword.value = !showConfirmPassword.value;
}

function isCorrect() {
    if (!isFormValid(form).success) {
        errorMessage.value = isFormValid(form).error;
        return false
    }
    if (!form.Name.trim()) {
        errorMessage.value = 'Поле Имя не должно быть пустым.';
        return false;
    }
    if (form.Password !== form.PasswordConfirm) {
        errorMessage.value = 'Пароли не совпадают.';
        return false;
    }
    return true;
}

async function onSubmit() {
    isLoading.value = true;
    errorMessage.value = '';
    success.value = '';

    if (!isCorrect()) {
        isLoading.value = false;
        return;
    }
    let result = {};
    if (isUserRegister.value) {
        result = await registerCandidate(form);
    } else {
        result = await registerEmployer(form);
    }
    console.log(result)
    if (result.success) {
        success.value = "Вы успешно зарегестрировались! Теперь войдите в аккаунт! Автоматический переход через 5 секунд...";
        setTimeout(() => {
            router.push(paths.Auth);
        }, 5000);
    } else {
        errorMessage.value = 'Ошибка регистрации. Пожалуйста, проверьте данные и попробуйте еще раз.';
        isLoading.value = false;
    }
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/form.scss';
@use "@/assets/styles/components.scss";
@use "@/assets/styles/colors.scss";

.registration-page {
    // min-height: 100vh;
    background-color: colors.$background;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

.register__links {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.router__link {
    font-size: components.$fs-regular;
}

@media (max-width: 768px) {

}
</style>