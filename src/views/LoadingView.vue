<script setup lang="ts">
import { useGameDataStore } from '@/stores/gameData';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gameDataStore = useGameDataStore();

watchEffect(() => {
  if ('finish' === gameDataStore.dataStatus) {
    router.replace({ name: 'mining' });
  } else {
    //TODO redirect to error page
  }
});
</script>

<template>
  <h1>LOADING...</h1>
</template>