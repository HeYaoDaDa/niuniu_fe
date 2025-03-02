<script setup lang="ts">
import { useCharacterStore } from '@/stores/character';
import { Tooltip } from 'floating-vue';
import LanguageSelect from './LanguageSelect.vue';

const characterStore = useCharacterStore();
</script>

<template>
    <div>
        <ul>
            <Tooltip v-for="characterSkill in characterStore.allSkills" :key="characterSkill.id">
                <li>
                    <router-link :to="`/skill/${characterSkill.id}`" active-class="active-link">{{
                        characterSkill.data.getName() + ' ' + (characterSkill.level)
                    }}</router-link>
                </li>
                <template #popper>
                    {{ characterSkill.xp }}
                </template>
            </Tooltip>
            <li>
                <LanguageSelect />
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.active-link {
    background-color: antiquewhite;
}
</style>