<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import { ref, onMounted } from 'vue';

const actionStore = useActionStore();
const progress = ref(0);

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
    <div v-if="actionStore.isRunning">
        <h1>{{ actionStore.currentActionName }}-{{ actionStore.currentActionTargetName }}</h1>
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