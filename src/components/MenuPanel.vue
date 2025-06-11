<template>
    <div class="container menu">
        <div class="menu__container">
            <div class="logo">
                <div class="logo__text">
                    <RouterLink :to="paths.Home" id="logo-title">
                        <h1>WorkAll</h1>
                    </RouterLink>
                    <h3>Челябинск</h3>
                </div>
            </div>
            <div class="router__navbar">
                <template v-if="!userStore.isAuthenticated">
                    <RouterLink :to="paths.Vacancies">Вакансии</RouterLink>
                    <RouterLink :to="paths.Auth">Авторизация</RouterLink>
                    <RouterLink :to="paths.Reg">Регистрация</RouterLink>
                </template>
                <template v-else>
                    <template v-if="userStore.isEmployer">
                        <RouterLink :to="paths.Vacancies">Все Вакансии</RouterLink>
                        <RouterLink :to="paths.CompanyVacancies">Ваши Вакансии</RouterLink>
                        <RouterLink :to="paths.Account">
                            <div class="col">
                                <span class="role">Работодатель</span>
                            </div>
                            <div class="col">
                                {{ userStore.name }}
                            </div>
                        </RouterLink>
                    </template>
                    <template v-else>
                        <RouterLink :to="paths.Vacancies">Вакансии</RouterLink>
                        <RouterLink :to="paths.Responses">Отклики</RouterLink>
                        <RouterLink :to="{ name: names.Account }">
                            <div class="col">
                                <span class="role">Соискатель</span>
                            </div>
                            <div class="col">
                                {{ userStore.name }}
                            </div>
                        </RouterLink>
                    </template>
                </template>
            </div>
            <div hidden class="toggle__holder">
                <img :src="imgComp" @click="SwitchShowStyle" alt="Изменить стиль сайта" id="eye"
                    style="font-size: small;">
            </div>
        </div>
        <hr class="menu__line">
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from "vue";
import paths from '@/router/paths.js';
import openEye from "@/assets/images/Eye.png"
import closedEye from "@/assets/images/EyeOff.png"
import { useUserStore } from "@/store/userStore.js";
import names from '@/router/names';

const userStore = useUserStore();
const showStyleChange = ref(false);
const imgComp = computed(() => {
    let imgSource = showStyleChange.value ? closedEye : openEye
    return imgSource;
});

function SwitchShowStyle() {
    showStyleChange.value = !showStyleChange.value;
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/colors.scss";
@use "@/assets/styles/components.scss";
// @use 'bootstrap/dist/css/bootstrap.css';

.menu {
    color: colors.$main;
    background-color: colors.$background;
    position: fixed;
    max-width: 100%;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    z-index: 1000;
    height: 100px;
    // width: 100%;
    font-size: components.$fs-large;
    margin: 0px;
    padding: 0px;
    // margin-bottom: 50px;
}

.menu__container {
    // padding: 0px;
    // margin: 0px;
    display: flex;
    align-items: center;
}

.logo__text {
    margin-left: 20px;
}

h3,
h1 {
    margin: 0px;
    padding: 0px;
    text-align: left;
    user-select: none;
    transition: background-color 0.3s ease;

    &:hover {
        color: colors.$second;
    }
}

#logo-title {
    user-select: none;
    text-decoration: none;
    color: colors.$main;
}

h3 {
    font-size: components.$fs-large;
}

.router__navbar {
    font-size: components.$fs-medium;
    font-weight: bold;
    margin-left: auto;
    margin-right: 1%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.router__navbar a {
    text-decoration: none;
    margin-left: 30px;
    color: colors.$main;
    padding: 5px 0;
    display: inline-block;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
        color: rgb(68, 0, 255);
        transform: scale(1.01);
    }
}

#eye {
    margin: 0px 15px;
    transition: transform 0.3s ease;
    width: 50px;
    height: 50px;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
}

.menu__line {
    border: none;
    height: 2px;
    opacity: 1;
    margin: 0 1%;
    background-color: colors.$main;
}

.role {
    color: colors.$second;
    font-weight: bolder;
}
</style>