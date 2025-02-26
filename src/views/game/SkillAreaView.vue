<script setup lang="ts">
import type { SkillArea } from '@/model/PrefabItem';
import { useActionStore } from '@/stores/action';
import { useGameDataStore } from '@/stores/gameData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();
const skillId = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  skillId.value = to.params.id as string;
});

const gameDataStore = useGameDataStore();
const actionStore = useActionStore();

const areas = computed(() => gameDataStore.getSkillAreasBySkillId(skillId.value));

function addAction(area: SkillArea) {
  const action = {
    actionType: skillId.value,
    target: area.id,

    isInfinite: true,
    amount: 0,
  };
  actionStore.addAction(action);
}
</script>

<template>
  <div class="area-list">
    <div class="area-item" v-for="area in areas" :key="area.id" @click="addAction(area)">
      <p>{{ area.name }}</p>
      <p>{{ area.describe }}</p>
    </div>
  </div>
</template>