<template>
  <button @click="test">Test</button>
</template>

<script setup>
import request from '@utils/request.js';

async function test(){
  let data = await request.get('/api/test');
  console.log(data);
}
</script>
