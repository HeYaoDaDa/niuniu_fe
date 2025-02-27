<script setup lang="ts">
import { useGameDataStore } from '@/stores/gameData';

const gameDataStore = useGameDataStore();
</script>

<template>
    <div>
        <ul>
            <li v-for="skill in gameDataStore.allSkills" :key="skill.id">
                <router-link :to="`/skill/${skill.id}`" active-class="active-link">{{ skill.name }}</router-link>
            </li>
            <li>
                <router-link to="/combat" active-class="active-link">Combat</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.active-link {
    background-color: antiquewhite;
}
</style>