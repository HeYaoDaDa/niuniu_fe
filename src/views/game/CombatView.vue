<script setup lang="ts">
import { useGameDataStore } from '@/stores/gameData';

const gameStore = useGameDataStore();
</script>

<template>
  <div class="area-list">
    <div class="area-item" v-for="area in gameStore.getCombatAreas()" :key="area.id">
      <p>{{ area.name }}</p>
      <p>{{ area.describe }}</p>
    </div>
  </div>
</template>