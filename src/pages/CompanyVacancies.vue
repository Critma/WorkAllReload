<template>

    <div class="cv__page">
        <div class="title">
            Ваши вакансии
        </div>
        <hr class="title__line" />
        <Loader v-if="isLoading" />
        <div class="container cv__buttons">
            <button type="button" class="btn btn-success btn-lg nav_btn" @click="GoToCreateVacancy">Создать
                вакансию</button>
            <button type="button" class="btn btn-warning btn-lg nav_btn" @click="GoToAllResponses">Все отклики</button>
        </div>
        <div class="container vacancy__list">
            <div class="card" v-for="vacancy in vacancies" :key="vacancy.id">
                <div class="card-header">
                    <span id="vacancy-name">{{ vacancy.name }}</span>
                </div>
                <div class="card-body">
                    <p class="card-title mb-3"><strong>Зарплата:</strong> <span id="vacancy-salary">{{ vacancy.salary
                            }} ₽</span></p>
                    <p><strong>Email:</strong> <a href="mailto:example@company.com" id="vacancy-email">{{ vacancy.email
                            }}</a></p>
                    <p><strong>Телефон:</strong> <a href="tel:+79991234567" id="vacancy-phone">{{ vacancy.phoneNumber
                            }}</a>
                    </p>
                    <p><strong>Локация:</strong> <span id="vacancy-location">{{ vacancy.location }}</span></p>
                    <!-- <p><strong>Опыт (ID):</strong> <span id="vacancy-experience_id">{{ vacancy.experience_id }}</span></p> -->
                    <p><strong>Описание работы:</strong> <br /><span id="vacancy-aboutWork">{{ vacancy.aboutWork
                            }}</span></p>
                    <p><small>Создано: <span id="vacancy-created_at">{{ formatDate(vacancy.created_at) }}</span> |
                            Обновлено: <span id="vacancy-updated_at">{{ formatDate(vacancy.updated_at) }}</span></small></p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-primary" id="btn-details"
                        @click="GoToVacancy(vacancy.id)">Подробнее</button>
                    <button type="button" class="btn btn-warning" id="btn-details"
                        @click="EditVacancy(vacancy.id)">Редактировать</button>
                    <button type="button" class="btn btn-delete" id="btn-delete"
                        @click="deleteVacancy(vacancy.id)">Удалить</button>
                    <button type="button" class="btn btn-outline-dark" id="btn-delete"
                        @click="hideVacancy(vacancy.id)">Скрыть</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import paths from "../router/paths";
import { getVacansiesFromSelfEmployer } from "../service/vacancyService";
import names from "@/router/names";
import Loader from "@/components/global/Loader.vue";
const vacancies = ref([]);
const isLoading = ref(false);
const router = useRouter();
import { formatDate } from "@/helpers/componentHelper";

onMounted(() => {
    LoadVacancies();
})

async function LoadVacancies() {
    isLoading.value = true;
    const result = await getVacansiesFromSelfEmployer();
    if (result.success) {
        vacancies.value = result.data;
    } else {
        console.log(result.error);
    }
    isLoading.value = false;
}

function deleteVacancy(id) {
    alert("Данный фукнционал в разработке");
    //TODO: delete
}

function hideVacancy(id) {
    alert("Данный фукнционал в разработке");
    //TODO: hide vacancy и чтобы это както  в этом окне отображалось
}

function EditVacancy(id) {
    //TODO: edit
    alert("Данный фукнционал в разработке");
}

function GoToVacancy(id) {
    router.push({
        name: names.Vacancy, params: { id: id }
    })
}

function GoToCreateVacancy() {
    router.push(paths.CreateVacancy)
}

function GoToAllResponses() {
    alert("Данный фукнционал в разработке");
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

@media (min-width: 1400px) {
    .vacancy__list {
        grid-template-columns: repeat(2, 1fr);
    }
}

.card {
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
}

.card-header {
    background-color: #0d6efd;
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.btn-delete {
    background-color: #dc3545;
    color: white;
}

.btn-delete:hover {
    background-color: #b02a37;
    color: white;
}
</style>