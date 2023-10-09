<template>
  <router-view />
  <FSA v-if="showFsa" @animationEnd="closeFsa"></FSA>
  <Menu></Menu>
</template>

<script setup>
import FSA from '@components/FSA.vue';
import { ref, onMounted } from 'vue';
import Menu from '@components/MenuCircle.vue';
const showFsa = ref(false);

onMounted(() => {
  showFsa.value = true;
});

function closeFsa(){
  showFsa.value = false;
}

</script>

<style lang="less">
</style>
