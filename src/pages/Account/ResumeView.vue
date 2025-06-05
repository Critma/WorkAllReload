<template>
    <div class="resume-container">
        <form class="resume-form">
            <label id="prof" for="profession">Профессия/Специальность</label>
            <input id="profession" name="profession" type="text" />
            <label for="education">Образование</label>
            <input id="education" name="education" type="text" />
            <label for="company-name">Проекты</label>
            <input id="company-name" name="company-name" type="text" />
            <label for="company-description">Описание проекта, занимаемой должности</label>
            <input id="company-description" name="company-description" type="text" />
            <label for="exp">Опыт работы</label>
            <input id="exp" name="exp" type="text" />
            <label for="skills">Расскажите об умениях / достижениях</label>
            <!-- <input name="skills" type="text" /> -->
            <textarea name="skills" id="skills" rows="10"></textarea>
            <label for="languages">Языки</label>
            <input id="languages" name="languages" type="text" />
            <label for="additional-info">О себе</label>
            <!-- <input name="additional-info" type="text" /> -->
            <textarea id="additional-info" name="additional-info" rows="10"></textarea>
        </form>
    </div>
</template>

<script setup>
import { defineProps, toRef } from 'vue';

let props = defineProps(['user']);
const localUser = toRef(props, 'user')

</script>

<style lang="scss" scoped>
@use 'account-styles.scss';
</style>