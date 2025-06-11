<template>
    <div>
        <div class="title">
            Вакансия
        </div>
        <hr class="title__line" />
        <div class="container py-5" v-if="vacancy" style="max-width: 1200px;">
            <div class="card shadow-sm rounded-3 border-0">
                <div class="card-body px-5 py-4">
                    <h1 class="fw-bold display-4 mb-3 text-primary">{{ vacancy.name }}</h1>
                    <h5 id="company" class="text fw-bold display-6 mb-4"><span class="text-muted">Компания:</span> {{
                        vacancy.employerName }}</h5>
                    <div class="mb-4 bages">
                        <span class="badge bg-secondary fs-4">{{ vacancy.experience.Name }}</span>
                        <span class="badge bg-success ms-2 fs-4">{{ vacancy.location }}</span>
                    </div>
                    <p class="text-dark fs-4 mb-4" style="white-space: pre-line;"><span class="text-muted">Информация о
                            вакансии:</span> <br> {{
                                vacancy.aboutWork }}</p>
                    <div class="row mb-4">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <h6 class="text-uppercase fw-semibold  fs-4 mb-1">Заработная плата</h6>
                            <p class="fs-3 fw-bold text-dark">{{ vacancy.salary ? vacancy.salary : 'Договорная' }} ₽</p>
                        </div>
                        <div class="col-md-6 d-flex flex-column justify-content-center">
                            <h6 class="text-uppercase text-muted fs-5 fw-semibold mb-2">Контактная информация</h6>
                            <p class="mb-1 fs-4"><strong>Email:</strong><br>
                                <a :href="`mailto:${vacancy.email}`"
                                    class="text-decoration-none text-primary hover-underline">
                                    {{ vacancy.email }}
                                </a>
                            </p>
                            <p class="mb-0 fs-4"><strong>Телефонный номер:</strong><br>
                                <a :href="`tel:${vacancy.phoneNumber}`"
                                    class="text-decoration-none text-primary hover-underline">
                                    {{ vacancy.phoneNumber }}
                                </a>
                            </p>
                        </div>
                    </div>
                    <hr>
                    <div class="dates text-muted">
                        <div>Создана: {{ formatDate(vacancy.created_at) }}</div>
                        <div>Последний раз обновлена: {{ formatDate(vacancy.updated_at) }}</div>
                    </div>
                    <div class="d-flex align-items-center mb-4 mt-4 buttons"
                        :class="{ 'single-button': !(userStore.isAuthenticated && !userStore.isEmployer && !isError) }">
                        <template v-if="userStore.isAuthenticated && !userStore.isEmployer && !isError">
                            <button v-if="!isSetResponse" @click="sendRes" class="btn btn-success btn-lg px-4"
                                :disabled="isLoading">Откликнуться</button>
                            <button v-else @click="delRes" class="btn btn-danger btn-lg px-4"
                                :disabled="isLoading">Удалить отклик</button>
                        </template>
                        <button @click="goBack" class="btn btn-success btn-lg px-4">Назад</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container py-5 my-5 text-center" v-else>
            <Loader />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatDate } from '@/helpers/componentHelper';
import { useRoute, useRouter } from 'vue-router';
import Vacancy from '../models/Vacancy';
import paths from '../router/paths'
import { useUserStore } from '@/store/userStore';
import useApi from '../composibles/useApi';
import Loader from '@/components/global/Loader.vue';
import { getVacancyInfo } from '@/service/vacancyService';
import { sendResponse, deleteResponse, isResponseOnVacancy } from '../service/responseService';

const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const vacancy = ref(null);
const isSetResponse = ref(false);
const isError = ref(false);

onMounted(async () => {
    await getVacInfo();
    if (userStore.isAuthenticated && !userStore.isEmployer) {
        await checkResponseOnVacancy();
    }
})

async function getVacInfo() {
    ExecuteApiCommand(
        () => getVacancyInfo(route.params.id),
        (result) => { vacancy.value = result.data; },
        () => { router.push(paths.NotFound); }
    )
}

async function checkResponseOnVacancy() {
    return ExecuteApiCommand(
        () => isResponseOnVacancy(route.params.id),
        (result) => { isSetResponse.value = result.data; },
        () => { isError.value = true }
    )
}

async function sendRes() {
    ExecuteApiCommand(
        () => sendResponse(route.params.id),
        () => {
            isSetResponse.value = true;
        },
        () => { alert('Не удалось оставить отклик') })
}

async function delRes() {
    if (confirm('Вы действительно хотите удалить отклик?') == false) { return }
    ExecuteApiCommand(
        () => deleteResponse(route.params.id),
        () => {
            isSetResponse.value = false;
        },
        () => { alert('Не удалось удалить отклик') })
}

function goBack() {
    if (window.history.length > 1) {
        router.go(-1)
    } else {
        router.push('/')
    }
}




</script>

<style lang="scss" scoped>
@use '@/assets/styles/components.scss';
@use '@/assets/styles/colors.scss';


.line-big {
    width: 91%;
    height: 2px;
    background-color: colors.$main;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

main {
    display: flex;
    margin-left: 15px;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
}

.info__container {
    margin-bottom: 10px;
}

.work-info__container {
    width: 90%;
    background-color: #D9D9D9;
    margin: 0 auto;
    height: 400px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.bages {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;
}

#contacts-title {
    margin-bottom: 10px;
}

.buttons__container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 15px;
    align-items: center;
    width: 100%;
}

.btn {
    font-size: components.$button-fs;
}

.buttons {
    justify-content: space-between;

    &.single-button {
        justify-content: center;
    }
}

#company {
    color: colors.$black;
}

.dates {
    display: flex;
    justify-content: space-between;
}

@media (max-width: 600px) {
    .btn {
        font-size: components.$fs-small * 1.1;
    }

    .dates {
        flex-direction: column;
    }

    .bages {
        flex-direction: column;
        gap: 20px;
    }
}

@media (max-width: 400px) {
    .buttons {
        flex-direction: column;
        gap: 10px;
    }
}
</style>