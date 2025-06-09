<template>
    <div :class="{ 'card mb-3': true, 'hide': !vacancy.visible }" style="max-width: 1000px;">
        <div class="card-header bg-primary text-white">
            <h5 class="card-title mb-0 vacancy">{{ vacancy.name }}</h5>
        </div>
        <div class="row g-0">
            <div class="card-body text-start col-md-8">
                <p class="card-text"><strong>Вакансия:</strong> {{ vacancy.name }}</p>
                <p class="card-text"><strong>Зарплата:</strong> {{ vacancy.salary }} ₽</p>
                <p class="card-text"><strong>Email:</strong> {{ vacancy.email }}</p>
                <p class="card-text"><strong>Телефон:</strong> {{ vacancy.phoneNumber }}</p>
                <p class="card-text"><strong>Город:</strong> {{ vacancy.location }}</p>
                <!-- <p class="card-text"><strong>Опыт:</strong> {{ vacancy.experience.name }}</p> -->
                <p class="card-text"><small class="text-muted">Вакансия создана: {{ formatDate(vacancy.created_at)
                        }}</small></p>
                <p class="card-text"><small class="text-muted">Вакансия обновлена: {{
                    formatDate(vacancy.updated_at) }}</small></p>
            </div>
            <div class="col-md-2 d-flex justify-content-center buttons">
                <button class="btn btn-outline-primary" @click="pushToVacancy(vacancy.id)">Подробнее</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '@/helpers/componentHelper';
import names from '@/router/names.js'

const router = useRouter()

let props = defineProps(['vacancy'])
let vacancy = ref(props.vacancy)

function pushToVacancy() {
    router.push({ name: names.Vacancy, params: { id: vacancy.value.id } });
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/colors.scss";
@use "@/assets/styles/components.scss";

.card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    margin: 0 auto;
}

.card-body {
    justify-content: left;
    align-items: flex-start;
}



.card-header {
    border-bottom: none;
}

.card-footer {
    background-color: transparent;
    border-top: none;
}

.btn {
    max-height: 100px;
}

.buttons {
    justify-content: center;
    align-items: center;
    margin: 10px;
}

.vacancy {
    font-size: 1.4rem;
}

.card-text {
    margin: 2px;
}

.hide {
    display: none;
}
</style>