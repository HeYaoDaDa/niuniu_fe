<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import ActionQueueComponent from './ActionQueueComponent.vue';

const actionStore = useActionStore();
</script>

<template>
    <h1>Wood Cow Idle</h1>
    <ActionQueueComponent v-if="actionStore.isRunning" />
</template>