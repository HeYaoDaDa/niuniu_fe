<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import { ref, onMounted, computed } from 'vue';

const actionStore = useActionStore();

const progress = ref(0);

const actionDurationshow = computed(() => {
    if (actionStore.currentActionDuration) {
        return actionStore.currentActionDuration / 1000 + 's';
    } else {
        return 'invalid';
    }
});
const peddingActionQueue = computed(() => {
    if (actionStore.actionQueue.length > 1) {
        return actionStore.actionQueue.slice(1);
    } else {
        return [];
    }
})

onMounted(() => {
    const animate = (timestamp: number) => {
        if (actionStore.isRunning) {
            if (actionStore.currentActionStartTime && actionStore.currentActionDuration) {
                const elapsed = timestamp - actionStore.currentActionStartTime;
                progress.value = Math.min((elapsed / actionStore.currentActionDuration) * 100, 100);
            } else {
                console.error(`Action running but currentActionStartTime:(${actionStore.currentActionStartTime}), currentActionDuration:(${actionStore.currentActionDuration})`)
            }
        }
        requestAnimationFrame(animate)
    };
    requestAnimationFrame(animate);
});
</script>

<template>
    <div class="action-div">
        <div>{{ actionStore.currentActionName }} | {{ actionStore.currentActionTargetName }} [{{
            actionStore.actionQueue[0].amount }}]
        </div>
        <div class="action-bottom">
            <div class="progress-container">
                <div class="duration-show">{{ actionDurationshow }}</div>
                <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            </div>
            <button @click="actionStore.removeAction(0)">Stop</button>
        </div>
        <div v-if="peddingActionQueue.length > 0">
            <div v-for="(action, index) in peddingActionQueue" :key="index">
                <button @click="actionStore.removeAction(index + 1)">Remove {{ action.toString() }}</button>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.action-div {
    display: flex;
    flex-flow: column nowrap;
}

.action-bottom {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.progress-container {
    position: relative;
    width: 256px;
    height: 16px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: #42b983;
    transition: width 100ms linear;
}

.duration-show {
    position: absolute;
    left: 50%;
}
</style>