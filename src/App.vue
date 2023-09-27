<template>
  <router-view />
  <FSA v-if="showFsa" @animationEnd="closeFsa"></FSA>
</template>

<script setup>
import FSA from '@components/FSA.vue';
import { ref, onMounted } from 'vue';
const showFsa = ref(false);

onMounted(() => {
  showFsa.value = true;
});

function closeFsa(){
  showFsa.value = false;
}

</script>
