<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { Tooltip } from 'floating-vue';
import { useI18n } from 'vue-i18n';


const inventoryStore = useInventoryStore();
const { t } = useI18n()
</script>

<template>
    <div class="inventory-list">
        <Tooltip v-for="inventoryItem in inventoryStore.inventoryItems" :key="inventoryItem.item.id">
            <div class="inventory-item">
                <p>{{ t(inventoryItem.item.getName()) }}</p>
                <p>{{ inventoryItem.amount }}</p>
            </div>
            <template #popper>
                {{ t(inventoryItem.item.getDescription()) }}
            </template>
        </Tooltip>
    </div>
</template>