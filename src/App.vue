<template>
  <MenuPanel id="menu" ref="menu" />
  <main :style="{ paddingTop: menuPanelHeight + 'px' }">
    <RouterView />
  </main>
</template>

<script setup>
import MenuPanel from './components/MenuPanel.vue'
import { ref, onMounted } from 'vue'
import { checkJWT } from '@/service/accessingService';
import useTheming from '@/composibles/useTheming.js'

// auto adjust height of menu panel
const menuPanelHeight = ref(0);
onMounted(() => {
  const menu = document.getElementById('menu');
  menuPanelHeight.value = menu.clientHeight * 1.2;
});

checkJWT();

useTheming().UpdateTheme();

</script>

<style lang="scss"></style>
