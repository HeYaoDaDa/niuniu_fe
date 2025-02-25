<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';


const inventoryStore = useInventoryStore();
</script>

<template>
    <div class="inventory-list">
        <div class="inventory-item" v-for="item in inventoryStore.items" :key="item.prefabItem.id">
            <p>{{ item.prefabItem.name }}</p>
            <p>{{ item.amount }}</p>
        </div>
    </div>
</template>