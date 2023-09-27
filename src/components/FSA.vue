<template>
  <div class="FSA-area" ref="fsa">hahahahsfawfgagf</div>
</template>

<script setup>
import { defineEmits, ref, onMounted } from 'vue';
import createRibbons from '@components/coloredRibbon.js'
// eslint-disable-next-line
const emit = defineEmits(["animationEnd"]);
const fsa = ref();

onMounted(() => {
  // 生成背景
  createRibbons({
    "body_": fsa.value,
  })
})

setTimeout(() => {
  // emit("animationEnd");
}, 5000);

</script>

<style lang="less">
.FSA-area{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
