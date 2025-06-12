<template>
    <main>
        <div class="title">
            Список вакансий
        </div>
        <div class="line"></div>
        <form class="options" @submit.prevent="handleOptions">
            <template v-if="isSearch">
                <label for="search" class="form-label mb-1">Поиск:</label>
                <input id="search" class="form-control" v-model="options.searchText" type="search"
                    placeholder="Поиск по названию вакансии" :disabled="isLoading">
            </template>
            <template v-else>
                <div class="options__filter">
                    <div class="exp" style="gap: 10px;">
                        <label for="exp" class="form-label">Опыт:</label>
                        <select id="exp" class="form-control" aria-label="Exp select" v-model="options.experienceId">
                            <option v-for="exp in experiences" :value="exp.id" :key="exp.id">{{ exp.name }}</option>
                        </select>
                    </div>
                    <div class="salary">
                        <div class="d-flex" style="gap: 10px;">
                            <label for="minSalary" class="form-label">Мин:</label>
                            <input id="minSalary" class="form-control" type="number" v-model="options.minSalary"
                                maxlength="15" min="0" />
                        </div>
                        <div class="d-flex" style="gap: 10px;">
                            <label for="maxSalary" class="form-label">Макс:</label>
                            <input id="maxSalary" class="form-control" type="number" v-model="options.maxSalary" />
                        </div>
                    </div>
                </div>
            </template>
            <div class="options__buttons">
                <button type="submit" class="btn btn-success submit__button" :disabled="isLoading">Найти</button>
                <button type="button" class="btn btn-danger" @click="handleReset"
                    :disabled="isLoading">Сбросить</button>
                <button type="button" class="btn btn-warning" @click="isSearch = !isSearch" :disabled="isLoading">
                    {{ isSearch ? 'К фильтру' : 'К поиску'
                    }}</button>
            </div>
        </form>
        <div class="vacancies__container">
            <div v-if="isLoading" class="loader">
                <Loader />
            </div>
            <div class="vacancies-list">
                <template v-if="vacancies.length > 0" v-for="vacancy in vacancies" :key="vacancy.id">
                    <VacancyCard :vacancy="vacancy" />
                </template>
                <template v-else>
                    <h2 class="text-center mt-5">Вакансии не найдены</h2>
                </template>
            </div>
            <div v-show="!isLoading && !disableTabs" class="vacancies__tabs">
                <span class="vacancies__tab" @click="goBack" :disabled="isLoading">&lt;</span>
                <div class="pages">
                    <div v-for="i in pages" :key="i" :class="{ 'page': true, 'page__active': page == i }"
                        @click="goToPage(i)" :disabled="isLoading">
                        {{ i
                        }}</div>
                </div>
                <span class="vacancies__tab" @click="goNext" :disabled="isLoading">&gt;</span>
            </div>
        </div>
    </main>
</template>

<script setup>
import VacancyCard from '../components/VacancyCard.vue';
import { ref, onMounted, watch } from 'vue';
import { getVacansies, getVacansiesCount } from '../service/vacancyService';
import useApi from '../composibles/useApi';
import { searchVacancies, filterVacancies } from '../service/vacancyService';
import { GetExperiences } from '../service/experienceService';
import Experience from '../models/Experience';

const vacancies = ref([])
const vacCount = 5; // количество вакансий на странице
const vacAllCount = ref(0);
const page = ref(1);
const pages = ref([]);
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
const isSearch = ref(true);
const disableTabs = ref(false);
const experiences = ref([]);
const options = ref({
    searchText: '',
    experienceId: 0,
    minSalary: '',
    maxSalary: '',
});

onMounted(async () => {
    await FetchData(page.value, vacCount);
    await FetchVacanciesCount();
    pages.value = Array.from({ length: Math.ceil(vacAllCount.value / vacCount) }, (_, index) => index + 1);
    await ExecuteApiCommand(() => GetExperiences(), (result) => { experiences.value = result.data; experiences.value.push(new Experience(0, '', null)) }, () => { console.log('error from fetch vac count') });
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

async function handleReset() {
    options.value.searchText = '';
    options.value.experienceId = 0;
    options.value.minSalary = '';
    options.value.maxSalary = '';
    await FetchVacanciesCount();
    await FetchData(page.value, vacCount);
    disableTabs.value = false;
}

async function handleOptions() {
    disableTabs.value = true;
    if (isSearch.value) {
        await ExecuteApiCommand(() => searchVacancies(options.value.searchText), (result) => { vacancies.value = result.data; }, () => { vacancies.value = [] });
    } else {
        if ((options.value.maxSalary != '') && options.value.minSalary > options.value.maxSalary) {
            options.value.maxSalary = '';
        }
        await ExecuteApiCommand(() => filterVacancies(options.value), (result) => { vacancies.value = result.data }, () => { vacancies.value = [] })
    }
}

async function goNext() {
    if (page.value >= pages.value.length) {
        return;
    }
    page.value++;
}

async function goBack() {
    if (page.value <= 1) {
        return;
    }
    page.value--;
}

async function goToPage(p) {
    page.value = p;
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/components.scss";
@use "@/assets/styles/colors.scss";

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

.options {
    display: flex;
    flex-direction: column;
    margin: 0px 20px;
    margin-bottom: 15px;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.options__filter {
    max-width: 1000px;
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: colors.$form-background;
    border: 2px solid colors.$blue;
}

.options__buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
}

.salary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px
}

.salary label {
    width: 100px;
}

#search {
    max-width: 1000px;
    border: 2px solid colors.$blue;
}

#exp {
    max-width: 400px;
    text-align: center;
}

input {
    border: 1px solid black;
}

@media (max-width: 760px) {
    .options__buttons {
        flex-direction: column;
    }

    .exp {
        flex-direction: column;
        width: 140px;
    }

    .form-control {
        height: 35px;
    }

    .salary label {
        width: 70px;
    }

    select {
        padding: 0px 5px;
        font-size: components.$fs-xsmall * 0.9;
    }
}
</style>