<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';


const inventoryStore = useInventoryStore();
</script>

<template>
    <div class="inventory-list">
        <div class="inventory-item" v-for="item in inventoryStore.inventoryItems" :key="item.item.id">
            <p>{{ item.item.name }}</p>
            <p>{{ item.amount }}</p>
        </div>
    </div>
</template>