<script setup lang="ts">
import ModalBox from '@/components/ModalBox.vue';
import { Amount } from '@/model/Amount';
import type { SkillArea } from '@/model/data/SkillArea';
import { useActionStore } from '@/stores/action';
import { useGameDataStore } from '@/stores/gameData';
import { useNotificationStore } from '@/stores/notification';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();
const skillId = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  skillId.value = to.params.id as string;
});

const gameDataStore = useGameDataStore();
const actionStore = useActionStore();
const notificationStore = useNotificationStore();
const { t } = useI18n()

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
  notificationStore.notification('info', t(area.skill.getName()) + ' | ' + t(area.getName()));
  openArea.value = undefined;
}
</script>

<template>
  <div class="area-list">
    <div class="area-item" v-for="area in areas" :key="area.id" @click="openModal(area)">
      <p>{{ t(area.getName()) }}</p>
      <p>{{ t(area.getDescription()) }}</p>
    </div>
    <ModalBox v-if="openArea" @close="closeModal">
      <p>{{ t(openArea.getName()) }}</p>
      <p>{{ t(openArea.skill.getName()) }}</p>
      <p>{{ t(openArea.getDescription()) }}</p>
      <p>{{ openArea.baseTime / 1000 }}s</p>
      <div v-for="loot, index in openArea.products" :key="index">
        {{ loot.percentage }}% {{ t(loot.item.getName()) }}: {{ loot.min }}-{{ loot.max }}
      </div>
      <div>
        <input type="text" v-model="amount" />
        <button @click="amount = '∞'">∞</button>
      </div>
      <button @click="addAction(openArea)" :disabled="!allowStart">Start</button>
    </ModalBox>
  </div>
</template>