<script setup lang="ts">
import { useGameDataStore } from '@/stores/gameData';
import { ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();
const skillId = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  skillId.value = to.params.id as string;
});

const gameDataStore = useGameDataStore();
const areas = gameDataStore.getSkillAreasBySkillId(skillId.value);
</script>

<template>
  <div class="area-list">
    <div class="area-item" v-for="area in areas" :key="area.id">
      <p>{{ area.name }}</p>
      <p>{{ area.describe }}</p>
    </div>
  </div>
</template>