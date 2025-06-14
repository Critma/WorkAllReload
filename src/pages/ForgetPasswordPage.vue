<template>
    <div>
        <div class="title">Востановление пароля</div>
        <div class="title__line"></div>
        <div class="container fpassword__page">
            <section class="form-card" style="max-width: 700px;">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label class="form-label" for="email">Введите email<br> на который зарегистрирован
                            аккаунт</label>
                        <input class="form-control" id="email" type="email" name="email" v-model="email" maxlength="320"
                            required placeholder="email@x.xx">
                    </div>
                    <button class="btn btn__contrast__primary" type="submit"
                        :disabled="isLoading || isSucess">Восстановить
                        пароль</button>
                    <div class="alerts mt-3 d-flex justify-content-center">
                        <Loader v-if="isLoading" />
                        <Success v-if="successMesage" :success="successMesage" />
                        <Error v-if="errorMessage" />
                    </div>
                </form>
            </section>
        </div>
        <RouterLink :to="paths.Auth" class="router__link">Есть аккаунт? Зайдите!</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import paths from '@/router/paths'
import { ref } from 'vue';
import { recover } from '../service/accessingService';
import useApi from '../composibles/useApi';

const email = ref('');
const isSucess = ref(false);
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
async function handleSubmit() {
    await ExecuteApiCommand(() => recover(email.value), (_) => { successMesage.value = 'Вам на почту придёт письмо с инструкцией'; isSucess.value = true; }, (_) => { errorMessage.value = 'Ошибка операции' });
    setTimeout(() => {
        errorMessage.value = '';
    }, 2000);
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/components.scss";
@use "@/assets/styles/form.scss";

.fpassword__page {
    display: flex;
    justify-content: center;
    align-items: center;
}

.router__link {
    font-size: components.$fs-regular;
}
</style>