<script setup lang="ts">
import { useCharacterStore } from '@/stores/character';
import { Tooltip } from 'floating-vue';
import LanguageSelect from './LanguageSelect.vue';
import { useI18n } from 'vue-i18n';
import SvgIcon from './SvgIcon.vue';

const { t } = useI18n()
const characterStore = useCharacterStore();
</script>

<template>
    <div id="sidebar-root">
        <div id="game-title-container">
            <SvgIcon name="chest" width="64" height="64" />
            <div>
                <div class="game-title">
                    {{ t("gameNameFirst") }}
                </div>
                <div class="game-title">
                    {{ t("gameNameLast") }}
                </div>
            </div>
        </div>

        <Tooltip v-for="characterSkill in characterStore.allSkills" :key="characterSkill.id" theme="skill-tooltip">
            <router-link :to="`/skill/${characterSkill.id}`" active-class="active-link">
                <SvgIcon :name="`skill-${characterSkill.id}`" width="16" height="16" />
                <div>
                    {{ characterSkill.data.getName() + ' ' + (characterSkill.level) }}
                </div>
            </router-link>
            <template #popper>
                <div>{{ characterSkill.data.getName() }}</div>
                <div>Lv.{{ characterSkill.level }}</div>
                <div>{{ characterSkill.xp }}</div>
                <hr>
                <div>{{ characterSkill.data.getDescription() }}</div>
            </template>
        </Tooltip>
        <LanguageSelect />
    </div>
</template>

<style lang="scss" scoped>
#sidebar-root {
    min-width: 200px;
    display: flex;
    flex-flow: column nowrap;
    box-shadow: 5px 0 10px -5px rgba(0, 0, 0, 0.3);
}

#game-title-container {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    padding: 8px;
    align-items: center;

    .game-title {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
    }
}

a {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px;
    font-weight: 600;
    user-select: none;
    cursor: pointer;

    &:hover:not(.active-link) {
        background-color: $primary-light;
    }

    &.active-link {
        background-color: $primary-dark;
    }
}
</style>