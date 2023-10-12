<template>
  <div>
    <router-view />
    <FSA v-if="showFsa" @animationEnd="closeFsa"></FSA>
    <Menu></Menu>
  </div>
</template>

<script setup>
import FSA from '@components/FSA.vue';
import { ref, onMounted } from 'vue';
import Menu from '@components/MenuCircle.vue';
import {useStore} from 'vuex';

const store = useStore();
const showFsa = ref(false);

onMounted(() => {
  showFsa.value = true;
  // 从cookie中检查用户登录态
  store.state.user.getLoginStatus();
});

function closeFsa(){
  showFsa.value = false;
}

</script>
