<template>
    <div class="not-found-container">
        <div class="not-found-card" role="main" aria-labelledby="notFoundTitle" aria-describedby="notFoundDesc">
            <h1 id="notFoundTitle">403<br>Доступ запрещён</h1>
            <p v-if="status == statuses.ban" id="notFoundDesc" class="lead"><span class="text-danger">Вы были
                    заблокированы</span>
                <br>Обратитесь к администратору
            </p>
            <p v-else id="notFoundDesc" class="lead">
                <span>Возможно, у вас не хватает прав для просмотра данной страницы</span>
            </p>
            <a href="/" class="btn btn-primary" role="button">Вернуться на главную</a>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import statuses from '../helpers/statuses';

const route = useRoute();
const status = route.params.status;

</script>

<style lang="scss" scoped>
@use '@/assets/styles/notFound.scss';
</style>