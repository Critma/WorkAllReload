<template>
    <div class="title">
        Вакансии
    </div>
        <div class="line"></div>
    <div class="vacancies-list">
        <template v-for="vacancy in vacancies" :key="vacancy.id">
            <VacancyCard :vacancy="vacancy" />
        </template>
    </div>
</template>

<script setup>
import VacancyCard from '../components/VacancyCard.vue';
import Vacancy from '../models/Vacancy';
import { ref } from 'vue';

let vacancy = ref(new Vacancy(1, "Программист", "40000", "artem@mail.ru", "+79823412342", "Москва", 1, "Описание вакансии", false, 1));
let vacancy1 = ref(new Vacancy(2, "Програмер", "70000", "artem@mail.ru", "+79823412342", "Москва", 1, "Описание вакансии", false, 1));
let vacancy2 = ref(new Vacancy(3, "Программистер", "80000", "artem@mail.ru", "+79823412342", "Москва", 1, "Описание вакансии", false, 1));

const vacancies = ref([vacancy, vacancy1, vacancy2])
// fetch(`server-gin.onrender.com/vac?${params.toString()}`).then(data => console.log(data))

</script>

<style lang="scss" scoped>
@use "@/assets/styles/components.scss";

.vacancies-list{
    margin: 0 components.$pd-medium;
}
</style>