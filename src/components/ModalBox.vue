<script setup lang="ts">
const emit = defineEmits<{
    close: []
}>()
</script>

<template>
    <teleport to="body">
        <div class="modal-box">
            <div class="modal-background" @click.stop.prevent="emit('close')"></div>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>