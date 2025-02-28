<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import ActionQueueComponent from './ActionQueueComponent.vue';
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '@/stores/notification';

const actionStore = useActionStore();
const notificationStore = useNotificationStore();
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
    <div class="notifications">
        <div class="notification" v-for="notification, index in notificationStore.notifications" :key="index"
            @click.stop.prevent="notificationStore.closeNotification(index)">{{
                notification.content }}</div>
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

.notifications {
    z-index: 2;
    position: fixed;
    top: 0;
    right: 0;
    margin: 8px;
    overflow: hidden;
    user-select: none;
}

.notification {
    background-color: cadetblue;
}
</style>