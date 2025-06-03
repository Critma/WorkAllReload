<template>
    <div class="title">
        Вакансии
    </div>
    <div class="line"></div>
    <div class="vacancies__container">
        <div class="vacancies-list">
            <template v-for="vacancy in vacancies" :key="vacancy.id">
                <VacancyCard :vacancy="vacancy" />
            </template>
        </div>
        <div class="vacancies__tabs">
            <span class="vacancies__tab" @click="goBack">&lt;</span>
            <p class="page" v-show="!isLoading">{{ page + 1 }}</p>
            <span class="vacancies__tab" @click="goNext">&gt;</span>
        </div>
    </div>
</template>

<script setup>
import VacancyCard from '../components/VacancyCard.vue';
import { ref, onMounted, watch } from 'vue';
import { getVacansies } from '../service/vacancyService';

const vacancies = ref([])
const vacCount = 5;
const page = ref(0);
const isLoading = ref(false);

onMounted(async () => {
    FetchData(vacCount, 0);
})

watch(page, async () => {
    await FetchData(vacCount, page.value * vacCount);
})

async function FetchData(limit, last_id) {
    if (isLoading.value) {
        return;
    }
    isLoading.value = true;
    var result = await getVacansies(limit, last_id);
    if (result.success) {
        vacancies.value = result.data;
    } else {
        console.log(result);
    }
    isLoading.value = false
}

async function goNext() {
    if (isLoading.value) {
        return;
    }
    page.value++;
}

async function goBack() {
    if (page.value <= 0) {
        return;
    }
    if (isLoading.value) {
        return;
    }
    page.value--;
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
}

.vacancies__tabs {
    display: flex;
    width: 100%;
    border: 2px solid colors.$main;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 40px;
}

.vacancies__tab {
    font-size: 60px;
    margin: 0 20px;
    cursor: pointer;
}

.page {
    font-size: 25px;
}
</style>