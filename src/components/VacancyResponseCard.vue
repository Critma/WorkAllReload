<template>
    <div class="container">
        <div class="card">
            <div class="card-header bg-primary">
                <h4 class="card-title mt-2">Отклик #{{ vacancyResponse.id }}</h4>
            </div>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="col-3 status">
                        <div class="messages">
                            <Error v-if="errorMessage" :errorMessage="errorMessage" />
                            <Success v-if="successMesage" :successMessage="successMesage" />
                        </div>
                        <p class="card-text"><strong>Статус отклика:</strong></p>
                        <select class="status form-control" @change="onChange()" v-model="vacancyResponse.status.id"
                            required :disabled="isLoading">
                            <option v-for="status in statusList" :value="status.id" :key="status.id">{{ status.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col vac">
                        <p class="card-text"><span class="vac__title">Вакансия:</span></p>
                        <p class="card-text"><strong>Название: </strong>{{ vacancyResponse.vacancy.name }}</p>
                        <p class="card-text"><strong>Зарплата: </strong>{{ vacancyResponse.vacancy.salary }} ₽</p>
                        <p class="card-text"><strong>Опыт: </strong>{{ vacancyResponse.vacancy.experience.name }}</p>
                        <button class="btn btn-outline-primary mt-2 mb-2" @click="goToDesk">Подробнее</button>
                    </div>
                    <div class="col candidate ms-2">
                        <p class="card-text"><span style="color: blue;">Кандидат:</span></p>
                        <p class="card-text"><strong>Имя: </strong>{{ vacancyResponse.candidate.name }}</p>
                        <p class="card-text"><strong>Номер телефона: </strong>{{ vacancyResponse.candidate.phone }}</p>
                        <p class="card-text"><strong>Email: </strong>{{ vacancyResponse.candidate.email }}</p>
                    </div>
                </div>
                <div class="row">
                    <button :class="['btn mb-2', resume ? 'btn-danger' : 'btn-warning']" @click="checkResume"> {{ resume
                        ?
                        'Закрыть резюме' : 'Рассмотреть резюме' }} </button>
                    <template v-if="resume">
                        <p class="card-text"><strong>Опыт: </strong>{{ resume.experience.name ?? 'Не указано' }}</p>
                        <strong class="card-text">Резюме:</strong>
                        <textarea class="resume form-control" v-model="resume.description" readonly></textarea>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { GetResume } from '../service/resumeService';
import useApi from '../composibles/useApi';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import names from '../router/names';
import { changeResponseStatus } from '../service/responseService';

const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
const props = defineProps(['vacancyResponse', 'statusList']);
const router = useRouter();
const resume = ref(null);

onMounted(async () => {
});

async function goToDesk() {
    router.push({ name: names.Vacancy, params: { id: props.vacancyResponse.vacancy.id } });
}

async function checkResume() {
    if (!resume.value) {
        return ExecuteApiCommand(() => GetResume(props.vacancyResponse.candidate.id), (result) => {
            resume.value = result.data
        }, () => { });
    } else {
        {
            resume.value = null
        }
    }
}


async function onChange() {
    errorMessage.value = '';
    successMesage.value = '';
    return ExecuteApiCommand(() =>
        changeResponseStatus(props.vacancyResponse.id, props.vacancyResponse.status.id),
        () => {
            successMesage.value = 'Статус успешно обновлен';
            setTimeout(() => {
                successMesage.value = '';
            }, 3000);
        },
        () => {
            errorMessage.value = 'Ошибка при обновлении статуса отклика';
            setTimeout(() => {
                errorMessage.value = '';
            }, 3000);
        });
}



</script>

<style lang="scss" scoped>
@use "@/assets/styles/colors.scss";
@use "@/assets/styles/components.scss";
@use "@/assets/styles/form.scss";

.card {
    max-width: 1400px;
    width: 100%;
    margin: 0px;
}

.card-body {
    // padding: 10px;
    margin: 0px;
}

.messages {
    height: 70px;
}

.card-title {
    font-size: components.$fs-medium;
}

.row {
    align-items: center;
}

.card-text {
    margin: 0px;
    margin-bottom: 5px;
    font-size: components.$fs-regular;
}

.card-header {
    margin: 0px;
    padding: 0px;
    color: colors.$main;
}

.vac {
    border: 2px solid colors.$blue;
}

.vac__title {
    color: colors.$blue;
}

.col {
    max-height: 250px;
}

.status {}

.candidate {
    border: 2px solid colors.$green;
    align-self: flex-start;
}

.btn {
    font-size: components.$button-fs;
}

@media (max-width: 760px) {
    .card-text {
        margin: 0px;
        margin-bottom: 5px;
        font-size: components.$fs-small;
    }

    .status {
        width: 100%;
        margin-bottom: 10px;
    }
    .messages{
        height: 0px;
    }
}
</style>