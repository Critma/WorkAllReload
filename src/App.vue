<template>
  <div>
      <p> 
        {{ response }}
      </p>
      <button class="btn btn-success" @click="getJWT()">Отправить запрос</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginCandidate } from "@/service/accessingService.js"

var response = ref("");

async function getJWT() {
  response.value = await loginCandidate("nickolay@bk.ru", "Hard123Password!)");
}

</script>

<style lang="scss" scoped></style>