<template>
    <main>
        <div class="title">Личный кабинет</div>
        <div class="hrefs">
            <a class="nav-link" :class="{ active: accountSection === 'InfoView' }"
                @click="updateAccountSection('InfoView')">Ваши данные</a>
            <a v-if="!userStore.isEmployer" class="nav-link" :class="{ active: accountSection === 'ResumeView' }"
                @click="updateAccountSection('ResumeView')">Ваше резюме</a>
        </div>
        <div class="message__container">
            <div v-if="isSuccess" class="message">
                Данные успешно сохранены!
            </div>
        </div>
        <div class="account-info">
            <loader v-if="isLoading"></loader>
            <KeepAlive v-if="!isLoading">
                <component :is="section" :user="user" />
            </KeepAlive>
        </div>
        <div class="account-buttons">
            <button id="save-button" class="account-button fbtn" @click="handleSave">Сохранить</button>
            <button id="logout-button" class="account-button fbtn" @click="Logout()">Выйти из аккаунта</button>
        </div>
    </main>
</template>

<script setup>
import User from '@/models/User.js';
import { ref, computed, watch } from 'vue';
import InfoView from './InfoView.vue';
import ResumeView from './ResumeView.vue';
import paths from '@/router/paths.js';
import router from '@/router/router';
import { useUserStore } from '@/store/userStore';
import { logout } from '@/service/accessingService';
import { getCandidateSelf, saveCandidate } from '../../service/candidateService';
import { getEmployerSelf, saveEmployer } from '../../service/employerService';

const userStore = useUserStore();
const user = ref();
const isLoading = ref(false);
const isSuccess = ref(false);
const accountSection = ref("InfoView")

watch(accountSection, () => {
    isSuccess.value = false;
})

GetUserInfo()

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
        console.log(`Ошибка при получении данных личного кабинета${result.error}`);
    }
    isLoading.value = false;
}



function Logout() {
    logout();
    router.push({ path: paths.Home });
}

const section = computed(() => {
    return {
        "InfoView": InfoView,
        "ResumeView": ResumeView
    }[accountSection.value];
})

function updateAccountSection(section) {
    accountSection.value = section;
    localStorage.setItem("accountSection", section);
}

async function handleSave() {
    let result = {};
    if (accountSection.value == 'InfoView') {
        result = await (userStore.isEmployer ? saveEmployer(user.value) : saveCandidate(user.value));
    } else if (accountSection.value == 'ResumeView') {

    }
    if (result.success) {
        isSuccess.value = true;
        setTimeout(() => {
            isSuccess.value = false;
        }, 5000);
    } else {
        console.log("Ошибка при сохранении данных " + result.error);
    }
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss';
@use '@/assets/styles/components.scss';

.title {
    font-size: components.$fs-xxlarge;
}

.hrefs {
    margin: 40px auto;
    display: flex;
    justify-content: center;
}

.nav-link {
    text-decoration: none;
    margin: 0px 50px;
    font-size: components.$fs-large;
    color: colors.$main;
    cursor: pointer;
    user-select: none;
}

.active {
    display: inline;
    border-bottom: 2px solid colors.$main;
}

.account-buttons {
    display: flex;
    flex-direction: column;
}

.account-button {
    border-radius: 5px;
    width: 250px;
    height: 40px;
    font-size: components.$fs-regular;
    margin: 10px auto;
    cursor: pointer;
    border: 1px solid colors.$main;
    background-color: colors.$background;
    color: colors.$main;
    transition: background-color 0.3s ease;
}

#save-button {
    &:hover {
        background-color: colors.$second;
    }
}

#logout-button {
    background-color: colors.$red;
    border: none;

    &:hover {
        opacity: 0.9;
    }
}
</style>