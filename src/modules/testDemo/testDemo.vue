<template>
  <button @click="test">Test</button>
</template>

<script setup>
import request from '@utils/request.js';

function test(){
  try{
    request.get('/api/test');
  }catch(e){}
}
</script>
