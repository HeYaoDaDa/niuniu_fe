<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { Tooltip } from 'floating-vue';

const inventoryStore = useInventoryStore();
</script>

<template>
    <div id="inventory-list">

        <Tooltip v-for="inventoryItem in inventoryStore.inventoryItems" :key="inventoryItem.item.id"
            theme="item-tooltip">
            <div class="inventory-item">
                <div>{{ inventoryItem.item.getName() }}</div>
                <div>{{ inventoryItem.amount }}</div>
            </div>
            <template #popper>
                <div>
                    {{ inventoryItem.item.getDescription() }}
                </div>
            </template>
        </Tooltip>
    </div>
</template>

<style lang="scss" scoped>
#inventory-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    padding: 4px;
    gap: 10px;
    background-color: $secondary;
    color: $text-dark;
    min-width: 256px;
    height: 100%;

    .inventory-item {
        min-width: 100px;
        min-height: 100px;
        background-color: #bee7e9;
    }
}
</style>