<script setup lang="ts">
import { useCharacterStore } from '@/stores/character';
import { useGameDataStore } from '@/stores/gameData';
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const gameDataStore = useGameDataStore();
const settingsStore = useSettingsStore();
const characterStore = useCharacterStore();
const { t } = useI18n();

const selectedLocale = computed({
    get: () => settingsStore.locale,
    set: (value) => settingsStore.setLocale(value),
});

</script>

<template>
    <div>
        <ul>
            <li v-for="skill in gameDataStore.allSkills" :key="skill.id">
                <router-link :to="`/skill/${skill.id}`" active-class="active-link">{{ t(skill.getName()) + ' ' +
                    (characterStore.getSkillById(skill.id)?.getLevel() ?? 'invalid')
                    }}</router-link>
            </li>
            <li>
                <select v-model="selectedLocale">
                    <option v-for="[code, language] in settingsStore.localeOptions" :key="code" :value="code">
                        {{ language }}
                    </option>
                </select>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.active-link {
    background-color: antiquewhite;
}
</style>