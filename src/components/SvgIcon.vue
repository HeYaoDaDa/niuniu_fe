<script setup lang="ts">
import { computed } from 'vue'
interface Props {
    prefix?: string
    name: string
    color?: string
    width?: string
    height?: string
}
const props = withDefaults(defineProps<Props>(), {
    prefix: 'icon',
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
    <svg aria-hidden="true" :width="width" :height="height">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>