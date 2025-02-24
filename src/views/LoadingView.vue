<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gameStore = useGameStore();

watchEffect(() => {
  if ('finish' === gameStore.status) {
    router.replace({ name: 'mining' });
  } else {
    //TODO redirect to error page
  }
});
</script>

<template>
  <h1>LOADING...</h1>
</template>