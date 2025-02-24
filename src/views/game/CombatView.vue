<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div class="area-list">
    <div class="area-item" v-for="area in gameStore.data.combatAreas" :key="area.id">
      <p>{{ area.name }}</p>
      <p>{{ area.describe }}</p>
    </div>
  </div>
</template>