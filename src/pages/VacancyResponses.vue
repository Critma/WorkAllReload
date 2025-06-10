<template>
    <div class="title">
        Все отклики
        <div class="title__line"></div>
    </div>
    <Loader v-if="isLoading" />
    <div class="container">
        <VacancyResponseCard v-for="response in responses" :key="response.id" :vacancyResponse="response"
            :statusList="statuses" />
    </div>
    <div class="spacer"></div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getResponsesOnVacancy } from '@/service/responseService.js'
import { getVacansiesFromSelfEmployer } from "../service/vacancyService";
import useApi from '../composibles/useApi';
import VacancyResponseCard from '../components/VacancyResponseCard.vue';
import { getStatuses } from '../service/adminService';


const vacancies = ref([]);
const responses = ref([]);
const statuses = ref([]);
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();

onMounted(async () => {
    await getStatusList();
    await LoadVacancies();
    await LoadResponses();
    statuses.value = statuses.value.filter((val, index) => {
        const name = val.name.toLowerCase();
        if (name == 'на рассмотрении' || name == 'приглашение' || name == 'отказ') {
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