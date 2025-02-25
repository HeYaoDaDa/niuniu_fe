<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import { useGameDataStore } from '@/stores/gameData';
import { ref, onMounted } from 'vue';

const actionStore = useActionStore();
const progress = ref(0);

function startNewAction(duration: number, delay: number = 0) {
    const startTime = performance.now() - delay;

    const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        progress.value = Math.min((elapsed / duration) * 100, 100);
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            //TODO have next action
            const delay = elapsed - duration;
            startNewAction(5000, delay);
        }
    };

    requestAnimationFrame(animate);
};

onMounted(() => {
    if (actionStore.currentAction) {
        startNewAction(actionStore.currentAction.duration, 0);
    }

    const startTime = performance.now()
    const animate = (timestamp: number) => {


        requestAnimationFrame(animate)
    };
    requestAnimationFrame(animate);
});
</script>

<template>
    <div v-if="actionStore.currentAction">
        <h1>{{ actionStore.currentAction.target }}</h1>
        <div class="progress-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.progress-container {
    width: 300px;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: #42b983;
    transition: width 100ms linear;
}
</style>