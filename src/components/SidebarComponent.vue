<script setup lang="ts">
</script>

<template>
    <div>
        <ul>
            <li>
                <router-link to="/skill/mining" active-class="active-link">Mining</router-link>
            </li>
            <li>
                <router-link to="/skill/woodcutting" active-class="active-link">Woodcutting</router-link>
            </li>
            <li>
                <router-link to="/combat" active-class="active-link">Combat</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.active-link {
    background-color: antiquewhite;
}
</style>