<style scoped></style>

<template></template>

<script setup>
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('loadData', (data) => {
  console.log('connected', data);
});
</script>
