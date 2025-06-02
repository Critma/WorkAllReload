<template>
    <main>
        <div class="title">Личный кабинет</div>
        <div class="hrefs">
            <a class="nav-link" :class="{ active: accountSection === 'InfoView' }"
                @click="updateAccountSection('InfoView')">Ваши данные</a>
            <a class="nav-link" :class="{ active: accountSection === 'ResumeView' }"
                @click="updateAccountSection('ResumeView')">Ваше резюме</a>
        </div>
        <div class="account-info">
            <KeepAlive>
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
import { ref, computed } from 'vue';
import InfoView from './InfoView.vue';
import ResumeView from './ResumeView.vue';
import paths from '@/router/paths.js';
import router from '@/router/router';
import { useUserStore } from '@/store/userStore';
import { logout } from '@/service/accessingService';

const userStore = useUserStore();
let user = ref(new User(1, "Артём Салимов", "+7982312321", "artur.kilogram@umail.ru", 1, 1))
let accountSection = ref("InfoView")

CheckSection();

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

function CheckSection() {
    let savedSection = localStorage.getItem("accountSection");
    if (savedSection != null) {
        updateAccountSection(savedSection);
    }
}

function handleSave() {
    if (accountSection.value == 'InfoView') {
        //TODO: сохранить
    } else if (accountSection.value == 'ResumeView') {
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