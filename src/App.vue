<template>
  <MenuPanel id="menu" ref="menu" />
  <main :style="{ paddingTop: menuPanelHeight + 'px' }">
    <RouterView />
  </main>
</template>

<script setup>
import MenuPanel from './components/MenuPanel.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import useTheming from '@/composibles/useTheming.js'
import { isJwtValid } from './service/accessingService';
import { useUserStore } from './store/userStore';
import { logout } from './service/accessingService';

// auto adjust height of menu panel
const menuPanelHeight = ref(0);
const userStore = useUserStore();

onBeforeMount(async () => {
  await useTheming().UpdateTheme();
})

onMounted(() => {
  const menu = document.getElementById('menu');
  menuPanelHeight.value = menu.clientHeight * 1.2;

  setInterval(async () => {
    if (!await isJwtValid(userStore.jwt)) {
      await logout();
    }
  }
    , 300000);
});


</script>

<style lang="scss"></style>