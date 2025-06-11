<template>
    <main>
        <div class="title">Личный кабинет</div>
        <div class="hrefs">
            <a class="nav-link" :class="{ active: accountSection === 'InfoView' }"
                @click="updateAccountSection('InfoView')">Ваши данные</a>
            <a v-if="!userStore.isEmployer" class="nav-link" :class="{ active: accountSection === 'ResumeView' }"
                @click="updateAccountSection('ResumeView')">Ваше резюме</a>
        </div>
        <div class="account-info">
            <KeepAlive v-if="!isLoading || user != null">
                <component :is="section" :user="user" />
            </KeepAlive>
            <loader v-if="isLoading"></loader>
        </div>
        <!-- <div class="message__container">
            <div v-if="isSuccess" class="message">
                <Success success="Данные успешно сохранены" />
            </div>
            <div v-if="errorMessage != ''" class="message__container">
                <Error :errorMessage="errorMessage" />
            </div>
        </div> -->
        <div class="account-buttons">
            <button id="logout-button" class="account-button fbtn" @click="Logout()">Выйти из аккаунта</button>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import InfoView from './InfoView.vue';
import ResumeView from './ResumeView.vue';
import paths from '@/router/paths.js';
import { useUserStore } from '@/store/userStore';
import { logout } from '@/service/accessingService';
import { getCandidateSelf, saveCandidate } from '../../service/candidateService';
import { getEmployerSelf, saveEmployer } from '../../service/employerService';
import useApi from '../../composibles/useApi';
import Resume from '../../models/Resume';

const userStore = useUserStore();
const user = ref(null);
const isSuccess = ref(false);
const accountSection = ref("InfoView")
const resume = ref(new Resume());
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();

watch(accountSection, () => {
    isSuccess.value = false;
})

function Logout() {
    logout();
}

const section = computed(() => {
    return {
        "InfoView": InfoView,
        "ResumeView": ResumeView
    }[accountSection.value];
})

function updateAccountSection(section) {
    accountSection.value = section;
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss';
@use '@/assets/styles/components.scss';
@use '@/assets/styles/form.scss';
@use 'account-styles.scss';


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

@media(max-width: 760px) {
    .nav-link {
        font-size: components.$fs-regular;
    }
}
</style>