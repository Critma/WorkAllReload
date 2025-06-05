<template>
    <div class="card">
        <div class="card__holder">
            <div class="card__info">
                <label id="vacancyName">{{ vacancy.name }}</label>
                <label id="salary">{{ vacancy.salary }}</label>
                <label id="city">{{ vacancy.location }}</label>
                <label id="companyName">{{ vacancy.aboutWork }}</label>
            </div>
            <div class="card__button">
                <button class="fbtn" @click="navToVacancy()">Подробнее</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import names from '@/router/names.js'

const router = useRouter()

let props = defineProps(['vacancy'])
let vacancy = ref(props.vacancy)

function navToVacancy() {
    router.push({ name : names.Vacancy, params: { id: vacancy.value.id  } });
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/colors.scss";
@use "@/assets/styles/components.scss";

.card{
    background-color: colors.$background;
    margin-bottom: 15px;
    border: 2px solid colors.$main;
    color: colors.$main;
    font-size: components.$fs-large;
}

.card__holder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.card__info {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: components.$pd-small;
}

label{
    margin: components.$pd-small;
}

#salary{
    font-weight: bolder;
}

.card__button{
    display: flex;
    align-items: center;
    margin-right: 30px;
}

button {
    border: 1px colors.$main solid;
    background-color: colors.$background;
    border-radius: 5px;
    width: 250px;
    height: 35px;
    cursor: pointer;
    color: colors.$main;
    transition: background-color 0.3s ease;

    &:hover{
        background-color: colors.$second;
        color: colors.$background;
    }
}

.card__underline {
    background: none;
    height: 1px;
    background-color: black;
}
</style>