<script setup lang="ts">
import { useCharacterStore } from '@/stores/character';
import { useSettingsStore } from '@/stores/settings';
import { Tooltip } from 'floating-vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

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
            <Tooltip v-for="characterSkill in characterStore.allSkills" :key="characterSkill.id">

                <li>
                    <router-link :to="`/skill/${characterSkill.id}`" active-class="active-link">{{
                        t(characterSkill.skill.getName()) + ' ' +
                        (characterSkill.level)
                    }}</router-link>
                </li>
                <template #popper>
                    {{ characterSkill.xp }}
                </template>
            </Tooltip>
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