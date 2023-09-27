<template>
  <button @click="test">Test</button>
</template>

<script setup>
import request from '@utils/request.js';

async function test(){
  try{
    let data = await request.get('/mock/32322/131');
    console.log(data);
  }catch(e){
    console.log(1234);
  }
}
</script>
