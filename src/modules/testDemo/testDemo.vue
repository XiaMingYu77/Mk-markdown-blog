<template>
  <button @click="test">Test</button>
</template>

<script setup>
import request from '@utils/request.js';

async function test(){
  const [err, data] = await $to(request.get('/mock/32322/131'));
  console.log(err, data);
}

</script>
