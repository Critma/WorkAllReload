<template>
    <div class="title">
        Все отклики
    </div>
    <div class="container">
        <div class="title__line"></div>
        <button @click="router.push(paths.CompanyVacancies)" class="btn btn-success px-4">Назад</button>
        <Loader v-if="isLoading" />
        <div v-if="responses.length > 0" class="container">
            <VacancyResponseCard v-for="response in responses" :key="response.id" :vacancyResponse="response"
                :statusList="statuses" />
        </div>
        <div v-if="responses.length === 0 && !isLoading">
            <div class="info-block">
                <h3>Ваши вакансии пока не имеют откликов</h3>
            </div>
        </div>
        <div class="spacer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getResponsesOnVacancy } from '@/service/responseService.js'
import { getVacansiesFromSelfEmployer } from "../service/vacancyService";
import useApi from '../composibles/useApi';
import VacancyResponseCard from '../components/VacancyResponseCard.vue';
import { getStatuses } from '../service/adminService';
import paths from '../router/paths';
import statusNames from '@/helpers/statuses';


const vacancies = ref([]);
const responses = ref([]);
const statuses = ref([]);
const router = useRouter();
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();

onMounted(async () => {
    await getStatusList();
    await LoadVacancies();
    await LoadResponses();
    statuses.value = statuses.value.filter((val, index) => {
        const name = val.name.toLowerCase();
        if (name == statusNames.toSee || name == statusNames.invitation || name == statusNames.deny) {
            return true;
        }
        return false;
    })
})

async function getStatusList() {
    return ExecuteApiCommand(() => getStatuses(), (result) => statuses.value = result.data, () => { });
}

async function LoadVacancies() {
    await ExecuteApiCommand(getVacansiesFromSelfEmployer, (result) => { vacancies.value = result.data }, (result) => { errorMessage.value = error }, isLoading);
}

async function LoadResponses() {
    vacancies.value.forEach(async (vacancy) => {
        await ExecuteApiCommand(() => getResponsesOnVacancy(vacancy.id), (result) => {
            if (result.data.length !== 0) {
                result.data.forEach(response => {
                    responses.value.push(response);
                });
            }
        });
    })
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/components.scss";
@use '../assets/styles/form.scss';


.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.spacer {
    height: 30px;
}
</style>