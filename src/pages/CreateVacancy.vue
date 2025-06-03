<template>
    <div>
        <div class="title">
            Создать вакансию
        </div>
        <hr class="title__line" />
        <div class="container vacancy__list">
            форма
        </div>
        <div class="container">
            <button type="button" class="btn btn-warning btn-lg" @click="GoBack">Назад</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import paths from '../router/paths';
const router = useRouter();

function GoBack() {
    router.push(paths.CompanyVacancies);
}

</script>
@use "../assets/styles/components.scss";

<style lang="scss" scoped></style>