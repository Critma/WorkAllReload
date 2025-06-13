<template>
    <div class="not-found-container">
        <div class="not-found-card" role="main" aria-labelledby="notFoundTitle" aria-describedby="notFoundDesc">
            <h1 id="notFoundTitle">404<br> Страница не найдена</h1>
            <p id="notFoundDesc" class="lead">Проверьте правильность адреса и попробуйте еще раз</p>
            <a href="/" class="btn btn-primary" role="button">Вернуться на главную</a>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '@/assets/styles/notFound.scss';
</style>