<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import ActionQueueComponent from './ActionQueueComponent.vue';

const actionStore = useActionStore();
</script>

<template>
    <div class="header-left">
        <div class="game-title">
            Wood Cow Idle
        </div>
        <ActionQueueComponent v-if="actionStore.isRunning" />
    </div>
    <div class="header-right">
        <div>INFO</div>
    </div>
</template>

<style lang="css" scoped>
.header-left {
    flex-grow: 4;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    background-color: aliceblue;
}

.header-right {
    flex-grow: 1;

    display: flex;
    flex-flow: column nowrap;
    align-items: end;

    background-color: bisque;
}

.game-title {
    margin-right: 32px;

    font-weight: bold;
    font-size: 24px;
}
</style>