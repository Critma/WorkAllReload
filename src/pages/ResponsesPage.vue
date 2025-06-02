<template>
    <div class="page__container">
        <div class="title">
            Ваши отклики
        </div>
        <div class="line"></div>
        <div class="responses__container" v-if="vacancies.length > 0">
            <template v-for="vacancy in vacancies" :key="vacancy.id">
                <ResponseCard :vacancy="vacancy" />
            </template>
        </div>
        <div v-else class="no-responses__container">
            <h2>Вы пока что не откликнулись ни на одну вакансию</h2>
        </div>
    </div>
</template>

<script setup>
import Response from '@/models/Response';
import Vacancy from '@/models/Vacancy';
import ResponseCard from '../components/ResponseCard.vue';
import { ref } from 'vue';

const responses = ref([new Response(1, 1, 1, 1)], new Response(2, 1, 2, 1));
const vacancies = ref([
    new Vacancy(1, "Программист", "40000", "artem@mail.ru", "+79823412342", "Москва", 1, "Описание вакансии", false, 1),
    new Vacancy(2, "Програмер", "70000", "artem@mail.ru", "+79823412342", "Москва", 1, "Описание вакансии", false, 1)
]);

</script>

<style lang="scss" scoped>
@use '@/assets/styles/components.scss';

.responses__container{
    margin: 0 components.$pd-medium;
}

.no-responses__container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
}

.no-responses__container h2 {
    max-width: 90%;
    font-weight: normal;
    font-size: components.$fs-large;
    line-height: 1.3;
    color: #444;
}
</style>