<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
    <div class="inventory-list">
        <div class="inventory-item" v-for="item in gameStore.inventory" :key="item.prefabItem.id">
            <p>{{ item.prefabItem.name }}</p>
            <p>{{ item.amount }}</p>
        </div>
    </div>
</template>