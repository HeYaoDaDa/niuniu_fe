<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { useI18n } from 'vue-i18n';


const inventoryStore = useInventoryStore();
const { t } = useI18n()
</script>

<template>
    <div class="inventory-list">
        <div class="inventory-item" v-for="item in inventoryStore.inventoryItems" :key="item.item.id">
            <p>{{ t(item.item.getName()) }}</p>
            <p>{{ item.amount }}</p>
        </div>
    </div>
</template>