<script setup lang="ts">
import ModalBox from '@/components/ModalBox.vue';
import { Amount } from '@/model/Amount';
import type { SkillArea } from '@/model/data/SkillArea';
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

const openArea = ref(undefined as SkillArea | undefined);
const amount = ref('∞')

const areas = computed(() => gameDataStore.getSkillAreasBySkillId(skillId.value));
const allowStart = computed(() => Amount.verify(amount.value));

function openModal(area: SkillArea) {
  openArea.value = area;
}
function closeModal() {
  openArea.value = undefined;
  amount.value = '∞';
}
function addAction(area: SkillArea) {
  actionStore.addAction(area, Amount.from(amount.value));
  openArea.value = undefined;
}
</script>

<template>
  <div class="area-list">
    <div class="area-item" v-for="area in areas" :key="area.id" @click="openModal(area)">
      <p>{{ area.getName() }}</p>
      <p>{{ area.getDescription() }}</p>
    </div>
    <ModalBox v-if="openArea" @close="closeModal">
      <p>{{ openArea.getName() }}</p>
      <p>{{ openArea.skill.getName() }}</p>
      <p>{{ openArea.getDescription() }}</p>
      <p>{{ openArea.baseTime / 1000 }}s</p>
      <div v-for="loot, index in openArea.products" :key="index">
        {{ loot.percentage }}% {{ loot.item.getName() }}: {{ loot.min }}-{{ loot.max }}
      </div>
      <div>
        <input type="text" v-model="amount" />
        <button @click="amount = '∞'">∞</button>
      </div>
      <button @click="addAction(openArea)" :disabled="!allowStart">Start</button>
    </ModalBox>
  </div>
</template>