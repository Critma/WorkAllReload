<template>
  <MenuPanel id="menu" ref="menu" />
  <main :style="{ paddingTop: menuPanelHeight + 'px' }">
    <RouterView />
  </main>
</template>

<script setup>
import MenuPanel from './components/MenuPanel.vue'
import { ref, onMounted, onBeforeMount, useTemplateRef } from 'vue'
import useTheming from '@/composibles/useTheming.js'
import { isJwtValid } from './service/accessingService';
import { useUserStore } from './store/userStore';
import { logout } from './service/accessingService';

// auto adjust height of menu panel
const menuPanelHeight = ref(0);
const menu = useTemplateRef('menu');
const userStore = useUserStore();
let resizeObserver = null;

onBeforeMount(async () => {
  await useTheming().UpdateTheme();
})

onMounted(() => {
  adjustMenuPanelHeight();

  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      menuPanelHeight.value = entry.contentRect.height;
    }
  })

  if (menu.value) {
    resizeObserver.observe(document.getElementById('menu'));
  }

  setInterval(async () => {
    if (userStore.jwt != "") {
      if (!await isJwtValid(userStore.jwt)) {
        await logout();
      }
    }
  }, 300000);
});

async function adjustMenuPanelHeight() {
  const menu = document.getElementById('menu');
  menuPanelHeight.value = menu.clientHeight * 1.2;
}


</script>

<style lang="scss"></style>