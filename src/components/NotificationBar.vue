<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification';

const notificationStore = useNotificationStore();
</script>

<template>
    <div class="notifications">
        <div class="notification" v-for="notification, index in notificationStore.notifications" :key="index"
            @click.stop.prevent="notificationStore.closeNotification(index)">{{
                notification.content }}</div>
    </div>
</template>

<style lang="scss" scoped>
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
    padding: 8px;
    border-radius: 4px;
    background-color: $primary;
    color: $text-light;
}
</style>