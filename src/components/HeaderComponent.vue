<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { ref, onMounted } from 'vue';

const gameStore = useGameStore();
const progress = ref(0);

const startProgress = () => {
    const startTime = performance.now();

    const animate = (timestamp: number) => {
        gameStore.currentAction!.elapsed = timestamp - startTime;
        progress.value = Math.min((gameStore.currentAction!.elapsed / gameStore.currentAction!.duration) * 100, 100);

        if (gameStore.currentAction!.elapsed < gameStore.currentAction!.duration) {
            requestAnimationFrame(animate);
        } else {
            onProgressComplete();
        }
    };

    requestAnimationFrame(animate);
};

const onProgressComplete = () => {
    gameStore.completeAction();
    if (gameStore.currentAction) {
        startProgress();
    }
};

onMounted(() => {
    startProgress();
});
</script>

<template>
    <div v-if="gameStore.currentAction">
        <h1>{{ gameStore.currentAction.target }}</h1>
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
    transition: width 0.1s linear;
}
</style>