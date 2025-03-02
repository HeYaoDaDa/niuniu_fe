<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import ActionQueueComponent from './ActionQueueComponent.vue';
import { useI18n } from 'vue-i18n'
import NotificationBar from './NotificationBar.vue';

const actionStore = useActionStore();
const { t } = useI18n() 
</script>

<template>
    <div class="header-left">
        <div class="game-title">
            {{ t("gameName") }}
        </div>
        <ActionQueueComponent v-if="actionStore.isRunning" />
    </div>
    <div class="header-right">
        <div>INFO</div>
    </div>
    <NotificationBar />
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