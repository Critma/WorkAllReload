<template>

    <div>
        <div class="title">
            Ваши вакансии
        </div>
        <hr class="title__line" />
        <div class="container">
            <button type="button" class="btn btn-success btn-lg" @click="GoToCreateVacancy">Создать вакансию</button>
        </div>
        <div class="container vacancy__list">
            <div class="card" v-for="vacancy in vacancies" :key="vacancy.id">
                <div class="card-header">
                    Вакансия: <span id="vacancy-name">{{ vacancy.name }}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-3">Зарплата: <span id="vacancy-salary">{{ vacancy.salary }}</span></h5>
                    <p><strong>Email:</strong> <a href="mailto:example@company.com" id="vacancy-email">{{ vacancy.email
                    }}</a></p>
                    <p><strong>Телефон:</strong> <a href="tel:+79991234567" id="vacancy-phone">{{ vacancy.phoneNumber }}</a>
                    </p>
                    <p><strong>Локация:</strong> <span id="vacancy-location">{{ vacancy.location }}</span></p>
                    <!-- <p><strong>Опыт (ID):</strong> <span id="vacancy-experience_id">{{ vacancy.experience_id }}</span></p> -->
                    <p><strong>Описание работы:</strong> <br /><span id="vacancy-aboutWork">{{ vacancy.aboutWork
                    }}</span></p>
                    <p><small>Создано: <span id="vacancy-created_at">{{ vacancy.created_at }}</span> | Обновлено: <span
                                id="vacancy-updated_at">{{ vacancy.updated_at }}</span></small></p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-primary" id="btn-details"
                        @click="GoToVacancy(vacancy.id)">Подробнее</button>
                    <button type="button" class="btn btn-delete" id="btn-delete"
                        @click="deleteVacancy(vacancy.id)">Удалить</button>
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
const vacancies = ref([]);

const router = useRouter();

onMounted(() => {
    LoadVacancies();
})

async function LoadVacancies() {
    const result = await getVacansiesFromSelfEmployer();
    if (result.success) {
        vacancies.value = result.data;
    } else {
        console.log(result.error);
    }
}

function deleteVacancy(id) {
    //TODO: delete
}

function GoToVacancy(id) {
    // TODO: не работает
    router.push({
        name: paths.Vacancy,
    })
}

function GoToCreateVacancy() {
    router.push(paths.CreateVacancy)
}

</script>

<style lang="scss" scoped>
@use "../assets/styles/components.scss";

.vacancy__list{
    display: grid;
    grid-template-columns: 1f;
}

@media (min-width: 780px) {
    .vacancy__list{
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