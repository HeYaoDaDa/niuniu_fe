<script setup lang="ts">
import { useGameDataStore } from '@/stores/gameData';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gameDataStore = useGameDataStore();

watchEffect(() => {
  if ('none' === gameDataStore.dataStatus) {
    gameDataStore.loadData();
  } else if ('finish' === gameDataStore.dataStatus) {
    router.replace('/skill/mining');
  } else {
    router.replace('/error');
  }
});
</script>

<template>
  <h1>LOADING...</h1>
</template>