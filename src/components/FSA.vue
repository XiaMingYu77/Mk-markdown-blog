<template>
  <div class="FSA-area" ref="fsa">
    <article class="text">
      <RotateCube></RotateCube>
      <div class="title">
        <h1>MK-blog</h1>
        <span style="color:#eecabc">一款可私有化部署的博客</span>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import createRibbons from '@components/coloredRibbon.js';
import RotateCube from './RotateCube.vue';
// eslint-disable-next-line
const emit = defineEmits(["animationEnd"]);
const fsa = ref();

onMounted(() => {
  // 生成背景
  createRibbons({
    "body_": fsa.value,
    "color": '#B9D1ED'
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

  .text{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 800px;
  }
}
</style>
