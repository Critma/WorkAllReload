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
@use "../assets/styles/colors.scss";
@use "../assets/styles/components.scss";

.not-found-container {
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: colors.$main;
    height: 70vh;
}

.not-found-card {
    max-width: 600px;
    padding: 3rem 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    border: 2px solid colors.$main;
}

h1 {
    font-weight: 700;
    font-size: 4.5rem;
    line-height: 1.1;
    margin-bottom: 1rem;
}

p.lead {
    font-size: components.$fs-regular;
    margin-bottom: 2rem;
}

.btn-primary {
    border: none;
    font-weight: 600;
    font-size: components.$fs-regular;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
}

.btn-primary:hover,
.btn-primary:focus {
    text-decoration: none;
}
</style>