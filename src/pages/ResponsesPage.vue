<template>
    <div class="page__container">
        <div class="title">
            Ваши отклики
        </div>
        <div class="line"></div>
        <div v-if="isLoading">
            <Loader />
        </div>
        <div class="responses__container" v-if="responses.length > 0">
            <template v-for="response in responses" :key="response.id">
                <ResponseCard :response="response" />
            </template>
        </div>
        <div v-if="!isLoading && responses.length <= 0" class="no-responses__container">
            <h2 style="color: white;">Вы пока что не откликнулись ни на одну вакансию</h2>
        </div>
    </div>
</template>

<script setup>
import CandidateResponse from '@/models/CandidateResponse';
import { getCandidateResponses } from '@/service/candidateService.js'
import Vacancy from '@/models/Vacancy';
import ResponseCard from '../components/ResponseCard.vue';
import { ref, onMounted } from 'vue';

const responses = ref([]);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    var result = await getCandidateResponses();
    if (result.success) {
        responses.value = result.data;
    }
    else {
        console.log(`get responses error: ${result.error}`);
    }
    isLoading.value = false;
})

</script>

<style lang="scss" scoped>
@use '@/assets/styles/components.scss';

.responses__container {
    // margin: 0 40px;
    margin: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.no-responses__container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
}

.no-responses__container h2 {
    max-width: 90%;
    font-weight: normal;
    font-size: components.$fs-large;
    line-height: 1.3;
    color: #444;
}
</style>