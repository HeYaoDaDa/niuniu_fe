<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import ActionQueueComponent from './ActionQueueComponent.vue';
import NotificationBar from './NotificationBar.vue';

const actionStore = useActionStore();
</script>

<template>
    <div id="header-root">
        <div class="header-left">
            <ActionQueueComponent v-if="actionStore.isRunning" />
        </div>
        <div class="header-right">
            <div>INFO</div>
        </div>
        <NotificationBar />
    </div>
</template>

<style lang="scss" scoped>
#header-root {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 64px;
    box-shadow: 0 5px 10px -8px rgba(0, 0, 0, 0.3);
    padding: 8px;
    background-color: $text-light;
    color: $text-dark;
}

.header-left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.header-right {
    display: flex;
    flex-flow: column nowrap;
    align-items: end;
}
</style>