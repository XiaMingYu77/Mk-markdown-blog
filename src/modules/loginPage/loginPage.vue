<template>
  <div class="login" ref="login">

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import createRibbons from '@components/coloredRibbon.js';
const login = ref();

onMounted(() => {
  // 生成背景
  createRibbons({
    body_: login.value,
    color: '#EAE8E9',
    horizontalSpeed: 250,
  })
})
</script>

<style lang="less">
.login{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
