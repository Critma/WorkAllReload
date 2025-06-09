<template>
    <div class="card">
        <div :class="{ 'card-header': true, 'bg-secondary': !vacancy.visible }">
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
                    Обновлено: <span id="vacancy-updated_at">{{ formatDate(vacancy.updated_at) }}</span></small>
            </p>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button type="button" class="btn btn-primary" id="btn-details" @click="GoToVacancy">Подробнее</button>
            <button type="button" class="btn btn-warning" id="btn-details" @click="edVacancy">Редактировать</button>
            <button type="button" class="btn btn-delete" id="btn-delete" @click="delVacancy">Удалить</button>
            <button type="button" class="btn btn-outline-dark" id="btn-delete" @click="hideVacancy">{{ vacancy.visible ?
                'Скрыть' : 'Показать'}}</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { deleteVacancy, toggleVisibilityVacancy } from "../service/vacancyService";
import names from "@/router/names";
import { formatDate } from "@/helpers/componentHelper";
import useApi from "../composibles/useApi";

const router = useRouter();
const props = defineProps(['vacancy', 'reload']);
const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();


async function delVacancy() {
    if (confirm("Вы действительно хотите удалить вакансию?") == false) {
        return;
    }
    await ExecuteApiCommand(() => deleteVacancy(props.vacancy.id), (result) => {
        alert("Вакансия успешно удалена");
        props.reload();
    }, (result) => { console.log(result.error) });
}

async function hideVacancy() {
    await ExecuteApiCommand(() => toggleVisibilityVacancy(props.vacancy),
        () => {
            props.vacancy.visible = !props.vacancy.visible;
            // props.reload();
        },
        (result) => {
            console.log(result.error)
        });
}

function edVacancy() {
    router.push({ name: names.EditVacancy, params: { id: props.vacancy.id } });
}

function GoToVacancy() {
    router.push({
        name: names.Vacancy, params: { id: props.vacancy.id }
    })
}
</script>

<style lang="scss" scoped>
.card {
    max-width: 600px;
    min-width: 200px;
    width: 100%;
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