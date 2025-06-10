<template>
    <div class="title">
        Список вакансий
    </div>
    <div class="line"></div>
    <div class="vacancies__container">
        <div v-if="isLoading" class="loader">
            <Loader />
        </div>
        <div class="vacancies-list">
            <template v-for="vacancy in vacancies" :key="vacancy.id">
                <VacancyCard :vacancy="vacancy" />
            </template>
        </div>
        <div v-show="!isLoading" class="vacancies__tabs">
            <span class="vacancies__tab" @click="goBack">&lt;</span>
            <!-- <p class="page" v-show="!isLoading">{{ page + 1 }}</p> -->
            <div class="pages">
                <div v-for="i in pages" :key="i" :class="{ 'page': true, 'page__active': page == i }"
                    @click="goToPage(i)">{{ i
                    }}</div>
            </div>
            <span class="vacancies__tab" @click="goNext">&gt;</span>
        </div>
    </div>
</template>

<script setup>
import VacancyCard from '../components/VacancyCard.vue';
import { ref, onMounted, watch } from 'vue';
import { getVacansies, getVacansiesCount } from '../service/vacancyService';
import useApi from '../composibles/useApi';

const vacancies = ref([])
const vacCount = 5; // количество вакансий на странице
const page = ref(1);
const pages = ref([]);
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
const vacAllCount = ref(0);

onMounted(async () => {
    await FetchData(page.value, vacCount);
    await FetchVacanciesCount();
    pages.value = Array.from({ length: Math.ceil(vacAllCount.value / vacCount) }, (_, index) => index + 1);
})

watch(page, async () => {
    await FetchData(page.value, vacCount);
})

async function FetchVacanciesCount() {
    return ExecuteApiCommand(() => getVacansiesCount(), (result) => { vacAllCount.value = result.data }, () => { console.log('error from fetch vac count') });
}

async function FetchData(page, amount) {
    return ExecuteApiCommand(() => getVacansies(page, amount), (result) => { vacancies.value = result.data; }, () => { console.log(result); })
}

async function goNext() {
    if (isLoading.value) {
        return;
    }
    if (page.value >= pages.value.length) {
        return;
    }
    page.value++;
}

async function goBack() {
    if (page.value <= 1) {
        return;
    }
    if (isLoading.value) {
        return;
    }
    page.value--;
}

async function goToPage(p) {
    if (isLoading.value) {
        return;
    }
    page.value = p;
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/components.scss";
@use "@/assets/styles/colors.scss";
// @use 'bootstrap/dist/css/bootstrap.css';

.vacancies-list {
    margin: 0 components.$pd-medium;
}

.vacancies__container {
    padding-bottom: 5px;
    min-height: 400px;
}

.vacancies__tabs {
    display: flex;
    width: 98%;
    border: 2px solid colors.$main;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.vacancies__tab {
    font-size: 60px;
    margin: 0 20px;
    cursor: pointer;
    user-select: none;
}

.pages {
    display: flex;
    gap: 1rem;
}

.page {
    font-size: 25px;
    cursor: pointer;
}

.page__active {
    text-decoration: underline;
}
</style>