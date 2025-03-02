<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { Tooltip } from 'floating-vue';

const inventoryStore = useInventoryStore();
</script>

<template>
    <div class="inventory-list">
        <Tooltip v-for="inventoryItem in inventoryStore.inventoryItems" :key="inventoryItem.item.id">
            <div class="inventory-item">
                <p>{{ inventoryItem.item.getName() }}</p>
                <p>{{ inventoryItem.amount }}</p>
            </div>
            <template #popper>
                {{ inventoryItem.item.getDescription() }}
            </template>
        </Tooltip>
    </div>
</template>