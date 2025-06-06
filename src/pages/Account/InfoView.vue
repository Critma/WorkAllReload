<template>
    <div class="container">
        <form class="form-card" method="post">
            <label class="form-label" for="name">Имя <span class="red-text">*</span></label>
            <input id="name" class="input form-control" type="text" name="name" v-model="localUser.name" required>
            <label class="form-label" for="phone">Номер телефона <span class="red-text">*</span></label>
            <input id="phone" class="input form-control" type="tel" name="phone" v-model="localUser.phone" required>
            <label class="form-label" for="email">Почта</label>
            <input id="email" class="input form-control" type="email" name="email" v-model="localUser.email" required
                readonly>
        </form>
    </div>
</template>

<script setup>
import { defineProps, reactive, toRef } from 'vue';

const props = defineProps(['user']);
const localUser = toRef(props, 'user')

</script>

<style lang="scss" scoped>
@use 'account-styles.scss';
</style>