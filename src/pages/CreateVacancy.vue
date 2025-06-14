<template>
    <div class="container create__page">
        <div class="title">
            Создать вакансию
        </div>
        <section class="form-card">
            <Loader v-if="isLoading" />
            <form @submit.prevent="onSubmit">
                <div class="row">
                    <div class="col">
                        <div class="mb-4">
                            <label for="name" class="form-label">Название вакансии <span
                                    style="color: red;">*</span></label>
                            <input id="name" type="text" v-model="vacancy.name" required class="form-control"
                                placeholder="Введите имя вакансии" autocomplete="companyName" maxlength="100" />
                        </div>
                        <div class="mb-4">
                            <label for="email" class="form-label">Email <span style="color: red;"> *</span></label>
                            <input id="email" type="email" v-model="vacancy.email" required class="form-control"
                                placeholder="Введите email" autocomplete="email" maxlength="320" />
                        </div>
                        <div class="mb-4">
                            <label for="location" class="form-label">Город <span style="color: red;"> *</span></label>
                            <input id="location" type="text" v-model="vacancy.location" required class="form-control"
                                placeholder="Введите город" autocomplete="location" maxlength="100" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-4">
                            <label for="phone" class="form-label">Номер телефона <span
                                    style="color: red;">*</span></label>
                            <input id="phone" type="tel" v-model="vacancy.phoneNumber" placeholder="+7 (999) 999-99-99"
                                class="form-control" autocomplete="tel" pattern="^\+?\d{6,15}$" maxlength="16" />
                        </div>
                        <div class="mb-4">
                            <label for="salary" class="form-label">Зарплата<span style="color: red;"> *</span></label>
                            <input id="salary" type="number" v-model.number="vacancy.salary" placeholder="90000"
                                class="form-control" autocomplete="salary" min="0" max="99900000" />
                        </div>
                        <div class="mb-4">
                            <label for="experience" class="form-label">Опыт <span style="color: red;">*</span></label>
                            <select id="experience" class="form-control" v-model="vacancy.experience_id" required>
                                <option v-for="exp in experiences" :value="exp.id">{{ exp.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <label for="about" class="form-label">О работе <span style="color: red;">*</span></label>
                        <textarea id="about" class="form-control" v-model="vacancy.aboutWork" rows="2"
                            maxlength="3000"></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn__contrast__primary w-100 py-3 fw-semibold"
                    :disabled="isLoading || !isActive">
                    {{ isLoading ? 'Загрузка...' : 'Сохранить' }}
                </button>
                <div class="reg__alert mt-3" role="alert">
                    <Error v-if="errorMessage != ''" :errorMessage="errorMessage" />
                    <Success v-if="successMesage != ''" :success="successMesage" />
                </div>
            </form>
        </section>
        <button id="back" class="btn btn-warning btn-lg w-50" @click="GoBack()">Назад</button>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import paths from '../router/paths';
import { ref, onMounted } from 'vue';
import Vacancy from '@/models/Vacancy';
import { isEmailValid } from '@/helpers/formHelper';
import { GetExperiences } from '@/service/experienceService';
import { getVacancyInfo, addVacancy, updateVacancy } from '../service/vacancyService';
import useApi from '@/composibles/useApi';
import names from '../router/names';

const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
let vacancy = ref(new Vacancy(null, "", "0", "", "", "", 1, "", true, null, null, null));
const router = useRouter();
const experiences = ref([]);
const route = useRoute();
const isEdit = ref(false);
const isActive = ref(true);

function GoBack() {
    router.push(paths.CompanyVacancies);
}

onMounted(async () => {
    Getexps();
    if (route.path.toLowerCase().includes(names.EditVacancy.toLowerCase().trim())) {
        isEdit.value = true;
        await ExecuteApiCommand(() => getVacancyInfo(route.params.id), (result) => { vacancy.value = result.data; }, () => { router.push(paths.NotFound); })
    }
})

async function Getexps() {
    ExecuteApiCommand(GetExperiences,
        (result) => {
            experiences.value = result.data;
        },
        (result) => {
            errorMessage.value = result.error;
        }
    );
}

async function onSubmit() {
    if (!isCorrect(vacancy.value)) {
        setTimeout(() => {
            errorMessage.value = "";
        }, 3000);
        return;
    }
    isLoading.value = true;
    if (isEdit.value) {
        await ExecuteApiCommand(() => updateVacancy(vacancy.value),
            () => {
                successMesage.value = "Вакансия успешно обновлена! Переход обратно через 2 секунды...";
                isActive.value = false;
                setTimeout(() => {
                    router.push(paths.CompanyVacancies);
                }, 1500);
            },
            (result) => {
                errorMessage.value = result.error;
            });
    } else {
        await ExecuteApiCommand(() => addVacancy(vacancy.value),
            () => {
                successMesage.value = "Вакансия успешно создана! Переход обратно через 2 секунды...";
                isActive.value = false;
                setTimeout(() => {
                    router.push(paths.CompanyVacancies);
                }, 1500);
            }, (result) => {
                errorMessage.value = result.error;
            })
    }
    setTimeout(() => {
        errorMessage.value = "";
    }, 3000);
}

function isCorrect(vacancy) {
    if (vacancy.email == "" || vacancy.email == null) {
        errorMessage.value = "Поле email не может быть пустым!";
        return false;
    }

    if (vacancy.name == "" || vacancy.name == null) {
        errorMessage.value = "Поле имя не может быть пустым!";
        return false;
    }
    if (vacancy.salary == "" || vacancy.salary == null) {
        errorMessage.value = "Поле зарплата не может быть пустым!";
        return false;
    }
    if (vacancy.phoneNumber == "" || vacancy.phoneNumber == null) {
        errorMessage.value = "Поле номер телефона не может быть пустым!";
        return false;
    }
    if (vacancy.aboutWork == "" || vacancy.aboutWork == null) {
        errorMessage.value = "Поле описание не может быть пустым!";
        return false;
    }
    if (isEmailValid(vacancy.email).success == false) {
        errorMessage.value = "Введите корректный email!";
        return false;
    }

    return true;
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/components.scss";
@use "@/assets/styles/form.scss";
@use "@/assets/styles/colors.scss";

.create__page {
    background-color: colors.$background;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

#back {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 200px;
}
</style>