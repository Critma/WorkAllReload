<template>
    <div class="cv__page">
        <div class="title">
            Ваши вакансии
        </div>
        <hr class="title__line" />
        <Loader v-if="isLoading" />
        <Error v-if="errorMessage" :errorMessage="errorMessage" />
        <Success v-if="successMesage" :success="successMesage" />
        <div class="container cv__buttons">
            <button type="button" class="btn btn-success btn-lg nav_btn" @click="GoToCreateVacancy">Создать
                вакансию</button>
            <button type="button" class="btn btn-warning btn-lg nav_btn" @click="GoToAllResponses">Все отклики</button>
        </div>
        <div class="container vacancy__list">
            <EmployerVacancyCard v-for="vacancy in vacancies" :key="vacancy.id" :vacancy="vacancy"
                :reload="LoadVacancies" />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import paths from "@/router/paths";
import { getVacansiesFromSelfEmployer } from "../service/vacancyService";
import Loader from "@/components/global/Loader.vue";
import useApi from "../composibles/useApi";
import Success from "../components/global/Success.vue";
import EmployerVacancyCard from "../components/EmployerVacancyCard.vue";

const router = useRouter();
const vacancies = ref([]);
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();

onMounted(async () => {
    LoadVacancies();
})

async function LoadVacancies() {
    await ExecuteApiCommand(getVacansiesFromSelfEmployer, (result) => { vacancies.value = result.data }, (result) => { errorMessage.value = error }, isLoading);
}

function GoToCreateVacancy() {
    router.push(paths.CreateVacancy)
}

function GoToAllResponses() {
    router.push(paths.VacancyResponses)
}

</script>

<style lang="scss" scoped>
@use "../assets/styles/components.scss";

.cv__page {
    font-size: components.$fs-regular;
}

.vacancy__list {
    display: grid;
    grid-template-columns: 1f;
}

.cv__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav_btn {
    max-width: 400px;
    min-width: 100px;
    width: 300px;
}

@media (min-width: 1200px) {
    .vacancy__list {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>