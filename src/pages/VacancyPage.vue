<template>
    <div>
        <div class="title">
            Вакансия
        </div>
        <div class="line"></div>
    </div>
    <main>
        <div class="info__container">
            <h3 id="name">{{ vacancy.name }}</h3>
            <h4 id="salary">{{ vacancy.salary }} {{ currency }}</h4>
            <div id="expririence">Опыт от {{ vacancy.experience_id }} лет</div>
        </div>
        <div class="line-big"></div>
        <div class="work-info__container">
            <div id="company-info">О компании</div>
        </div>
        <div class="contacts__container">
            <div id="contacts-title">Связь с работодателем</div>
            <li v-for="contact in contacts" :key="contact.id">
                {{ contact.phone }}
            </li>
        </div>
        <div class="buttons__container">
            <button v-if="userStore.isAuthenticated" class="buttons fbtn" id="message">Написать</button>
            <button v-if="userStore.isAuthenticated" class="buttons fbtn" id="add-response">Откликнуться</button>
            <button v-if="userStore.isAuthenticated" class="buttons fbtn" id="delete-response">Убрать отклик</button>
            <button class="buttons fbtn" id="back" @click="BackToVacancies()">Назад</button>
        </div>
    </main>
</template>

<script setup>
import { watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Vacancy from '../models/Vacancy';
import paths from '../router/paths'
import { useUserStore } from '@/store/userStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore;
let currency = 'рублей'

function BackToVacancies() {
    router.push(paths.Vacancies)
}

watch(
    () => route.params.id,
    (newId, oldId) => {
        console.log(newId, oldId)
    }
)

let vacancy = ref(new Vacancy(1, "Программист", "40000", "artem@mail.ru", "+79823412342", "Москва", 1, "Описание вакансии", false, 1));
const contacts = ref([{ id: 1, phone: "+7 9(823) 41 23-42" }, { id: 2, phone: "+7 (898) 432 70-42" }, { id: 3, phone: "+7 (823) 94-23" }])

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

#contacts-title {
    margin-bottom: 10px;
}

.buttons__container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    margin-top: 15px;
    align-items: center;
    width: 100%;
}

.buttons {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    background-color: colors.$main;
    color: colors.$background;
    transition: background-color 0.3s ease;
    border: 1px solid colors.$main;


    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
}

#message {
    background-color: colors.$main;

    &:hover {
        opacity: 0.9;
        background-color: colors.$background;
        color: colors.$main;
    }
}

#delete-response {
    background-color: colors.$main;

    &:hover {
        opacity: 0.9;
        background-color: colors.$background;
        color: colors.$main;
    }
}

#add-response {
    background-color: colors.$background;
    border: 1px solid colors.$main;
    color: colors.$main;

    &:hover {
        background-color: colors.$main;
        color: colors.$background;
    }
}

#back {
    background-color: colors.$background;
    border: 1px solid colors.$main;
    color: colors.$main;

    &:hover {
        background-color: colors.$main;
        color: colors.$background;
        opacity: 0.9;
    }
}
</style>