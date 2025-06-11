<template>
    <div class="card mb-3" style="max-width: 400px;">
        <div class="card-header text-white" :class="[response.vacancy.visible ? 'bg-primary' : 'bg-secondary']">
            <h3 class="card-title mb-1"><span style="background-color: grey;"
                    v-if="!response.vacancy.visible">[Скрыто]</span> {{ response.vacancy.name
                    }}</h3>
            <div :class="background">
                <text class="card-text"><span>{{ response.status.name }}</span></text>
            </div>
        </div>
        <div class="card-body">
            <p class="card-text"><strong>Вакансия:</strong> {{ response.vacancy.name }}</p>
            <p class="card-text"><strong>Статус:</strong> {{ response.status.name }}</p>
            <p class="card-text"><strong>Зарплата:</strong> {{ response.vacancy.salary }} ₽</p>
            <p class="card-text"><strong>Email:</strong> {{ response.vacancy.email }}</p>
            <p class="card-text"><strong>Телефон:</strong> {{ response.vacancy.phoneNumber }}</p>
            <p class="card-text"><strong>Локация:</strong> {{ response.vacancy.location }}</p>
            <p class="card-text"><strong>Опыт:</strong> {{ response.vacancy.experience.name }}</p>
            <!-- <p class="card-text"><strong>Описание работы:</strong> {{ response.vacancy.aboutWork }}</p> -->
            <p class="card-text"><small class="text-muted">Вакансия создана: {{ formatDate(response.vacancy.created_at)
            }}</small></p>
            <p class="card-text"><small class="text-muted">Вакансия обновлена: {{
                formatDate(response.vacancy.updated_at) }}</small></p>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-outline-primary" @click="pushToVacancy(response.vacancy.id)">Подробнее</button>
            <button class="btn btn-outline-danger" @click="delReponse(response.vacancy.id)">Удалить</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import useApi from '../composibles/useApi';
import { deleteResponse } from '../service/responseService';

const props = defineProps(['response', 'reload'])
const router = useRouter();
const { ExecuteApiCommand } = useApi()

const background = computed(() => {
    switch (props.response.status.name.toLowerCase()) {
        case 'приглашение':
            return ['bg-success'];
        case 'отказ':
            return ['bg-danger'];
        case 'ожидание':
            return ['bg-warning'];
        case 'на рассмотрении':
            return ['bg-info'];
        default:
            return ['bg-primary'];
    }
})

function pushToVacancy(id) {
    router.push({ name: 'Vacancy', params: { id: id } });
}

function delReponse(id) {
    if (confirm('Вы действительно хотите удалить отклик?') == false) { return }
    ExecuteApiCommand(
        () => deleteResponse(id),
        () => {
            props.reload();
        },
        () => { alert('Не удалось удалить отклик') })
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/components.scss';
@use '@/assets/styles/colors.scss';

.card {
    margin: 0px 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
}

.card-text {
    margin-bottom: 5px;
}

.card-header {
    border-bottom: none;
}

.card-footer {
    background-color: transparent;
    border-top: none;
}
</style>