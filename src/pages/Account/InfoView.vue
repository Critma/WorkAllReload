<template>
    <div class="info-container">
        <form class="info-form" method="post">
            <label for="name">Имя <span class="red-text">*</span></label>
            <input id="name" class="input" type="text" name="name" v-model="localUser.name" required>
            <!-- <label for="surname">Фамилия</label> -->
            <!-- <input id="surname" class="input" type="text" name="surname" v-model="localUser.surname" required> -->

            <!-- <label for="age">Возраст <span class="red-text">*</span></label> -->
            <!-- <input id="age" class="input" type="number" name="age" required min="18" max="120"> -->


            <label for="phone">Номер телефона <span class="red-text">*</span></label>
            <input id="phone" class="input" type="tel" name="phone" v-model="localUser.phone" required readonly>
            <label for="email">Почта</label>
            <input id="email" class="input" type="email" name="email" v-model="localUser.email" required readonly>

            
            <!-- <label for="city">Город проживания</label>
            <input id="city" class="input" type="text" name="city">
             
            <label for="ovz">Ограничения по здоровью</label>
            <input id="ovz" class="input" type="text" name="ovz"> -->
        </form>
    </div>
</template>

<script setup>
    import { defineProps, reactive } from 'vue';

    const props = defineProps(['user']);
    const localUser = reactive({...props.user});

</script>

<style lang="scss" scoped>
@use 'account-styles.scss';
    
</style>