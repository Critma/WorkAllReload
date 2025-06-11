<template>
    <div class="container resume-container">
        <form class="form-card" @submit.prevent="handleSave()">
            <label for="resume" class="form-title mb-2">Резюме</label>
            <Loader v-if="isLoading" />
            <section class="resume-card">
                <div class="resume-title">Расскажите о себе:</div>
                <div class="info-block">
                    <h3 class="info-label" id="education-label">Образование</h3>
                </div>
                <div class="info-block">
                    <h3 class="info-label" id="work-experience-label">Опыт работы</h3>
                </div>
                <div class="info-block">
                    <h3 class="info-label" id="skills-label">Умения / достижениях</h3>
                </div>
                <div class="info-block">
                    <h3 class="info-label" id="languages-label">Языки</h3>
                </div>
                <div class="info-block">
                    <h3 class="info-label" id="additional-info-label">О ваших личностных достоинствах</h3>
                </div>
                <div class="info-block">
                    <h3 class="info-label" id="additional-info-label">Дополнительные контакты</h3>
                </div>
            </section>
            <textarea id="resume" class="form-control" rows="8" v-model="resume.description"
                placeholder="Ваше резюме"></textarea>
            <label for="experience" class="form-label">Опыт <span style="color: red;">*</span></label>
            <select id="experience" class="form-control" v-model="resume.experience_id" required>
                <option v-for="exp in experiences" :value="exp.id">{{ exp.name }}</option>
            </select>
            <button id="save-button" class="account-button fbtn">Сохранить</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, toRef } from 'vue';
import useApi from '../../composibles/useApi';
import { GetExperiences } from '../../service/experienceService.js';
import { GetResume, AddOrUpdateResume } from '../../service/resumeService';
import Resume from '../../models/Resume.js';
import { useUserStore } from '../../store/userStore.js';

const { isLoading, errorMessage, successMesage, ExecuteApiCommand } = useApi();
const resume = ref(new Resume())
const experiences = ref([]);
const userStore = useUserStore();

onMounted(async () => {
    Getexps();
    await GetRes();
});

async function GetRes() {
    await ExecuteApiCommand(() => GetResume(userStore.ID), (result) => { resume.value = result.data; }, (_) => { console.log('resume loading error'); });
}

async function Getexps() {
    ExecuteApiCommand(GetExperiences,
        (result) => {
            experiences.value = result.data;
            resume.value.experience_id = 5;
        },
        (result) => {
            errorMessage.value = result.error;
        }
    );
}

async function handleSave() {
    await ExecuteApiCommand(() => AddOrUpdateResume(resume.value),
        (_) => { successMesage.value = 'Резюме сохранено' },
        (result) => { errorMessage.value = 'Ошибка при сохранении Резюме$ {result.error}' });
}

</script>

<style lang="scss" scoped>
@use 'account-styles.scss';

.resume-container {
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
    flex-direction: column;
}

.resume-card {
    border: 10px solid blue;
    max-width: 600px;
    margin: 10px auto;
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 2rem 2.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.05);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #6b7280;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.resume-title {
    font-size: 30px;
    font-weight: 700;
    color: #111827;
}

.info-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.info-label {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin: 0;
}

.info-content {
    font-size: 16px;
    line-height: 1.5;
    color: #4b5563;
    white-space: pre-line;
    /* preserve line breaks if multiline */
}
</style>