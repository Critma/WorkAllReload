<template>
    <div class="container">
        <form class="form-card" method="post" @submit.prevent="handleSave()">
            <Loader v-if="isLoading" />
            <label class="form-label" for="name">Имя <span class="red-text">*</span></label>
            <input id="name" class="input form-control" type="text" name="name" v-model="user.name" required
                maxlength="150">
            <label class="form-label" for="phone">Номер телефона <span class="red-text">*</span></label>
            <input id="phone" class="input form-control" type="tel" name="phone" v-model="user.phone" required
                pattern="^\+?\d{6,15}$" maxlength="16">
            <label class="form-label" for="email">Почта</label>
            <input id="email" class="input form-control" type="email" name="email" v-model="user.email" required
                readonly style="cursor: default;">
            <template v-if="userStore.isEmployer">
                <label class="form-label" for="inn">INN</label>
                <input id="inn" class="input form-control" style="cursor: default;" type="inn" name="inn" v-model="user.INN" required readonly>
            </template>
            <button id="save-button" class="account-button fbtn" type="submit">Сохранить</button>
            <div class="messages">
                <Error v-if="errorMessage" :errorMessage="errorMessage"></Error>
                <Success v-if="successMesage" :successMessage="successMesage"></Success>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useApi from '../../composibles/useApi';
import { useUserStore } from '../../store/userStore';
import { saveCandidate } from '../../service/candidateService';
import { saveEmployer } from '../../service/employerService';
import { getCandidateSelf } from '../../service/candidateService';
import { getEmployerSelf } from '../../service/employerService';
import User from '../../models/User';

const user = ref(new User());
const userStore = useUserStore();
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();

onMounted(async () => {
    await GetUserInfo();
})

async function GetUserInfo() {
    if (isLoading.value) {
        return;
    }
    isLoading.value = true;
    let result = {};
    if (userStore.isEmployer) {
        result = await getEmployerSelf();
    } else {
        result = await getCandidateSelf();
    }
    if (result.success) {
        user.value = result.data;
    }
    else {
        errorMessage.value = "Произошла ошибка при получении данных пользователя";
        console.log(`Ошибка при получении данных личного кабинета${result.error}`);
    }
    isLoading.value = false;
}

async function handleSave() {
    const result = await (userStore.isEmployer ? saveEmployer(user.value) : saveCandidate(user.value));
    if (result.success) {
        successMesage.value = "Данные успешно сохранены";
        setTimeout(() => {
            successMesage.value = '';
        }, 5000);
    } else {
        console.log("Ошибка при сохранении данных " + result.error);
        errorMessage.value = "Произошла ошибка при сохранении, попробуйте повторить операцию позже";
        setTimeout(() => {
            errorMessage.value = '';
        }, 5000);
    }
}

</script>

<style lang="scss" scoped>
@use 'account-styles.scss';
</style>