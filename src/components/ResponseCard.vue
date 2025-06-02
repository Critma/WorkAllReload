<template>
    <div class="vacancy__card">
        <div class="card-info">
            <text id="name">{{ vacancy.name }}</text>
            <text id="salary">{{ vacancy.salary }}</text>
            <text id="location">{{ vacancy.location }}</text>
            <!-- {{  }} -->
            <text id="company-name">Название компании</text> 
        </div>
        <div class="card-buttons">
            <button class="card-button fbtn" id="about" @click="pushToVacancy(vacancy.id)">Подробнее</button>
            <button class="card-button fbtn" id="delete-response" @click="deleteResponse(vacancy.id)">Убрать отклик</button>
        </div>
    </div>
</template>

<script setup>
// TODO: название компании

import { useRouter } from 'vue-router';
import { defineProps, ref } from 'vue';

const props = defineProps(['vacancy'])
const vacancy = ref(props.vacancy);

const router = useRouter();

function pushToVacancy(id) {
    //TODO: runtime-core.esm-bundler.js:238 [Vue warn]: Extraneous non-props attributes (id) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.
    console.log(id);
    router.push({ name: 'Vacancy', params: { id: id } });
}

function deleteResponse(id) {
    //TODO: delete respones from server
    console.log(id)
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/components.scss';
@use '@/assets/styles/colors.scss';

.vacancy__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 2px solid colors.$main;
    font-size: components.$fs-large;
}

.card-info{
    text-align: left;
    display: flex;
    flex-direction: column;
}

.card-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    // justify-content: center;
    // align-items: center;
}

.card-button {
    border-radius: 5px;
    width: 200px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    margin-right: components.$pd-medium;
    cursor: pointer;
}

.card-button:hover {
    opacity: 0.8;
}

text{
    margin: components.$pd-small;
}

#name{
    font-weight: 300;
}

#salary {
    font-size: components.$fs-large;
    font-weight: bold;
}

#about {
    background-color: colors.$main;
    color: colors.$background;
}

#delete-response {
    background-color: colors.$red;
    color: colors.$main;
}
</style>