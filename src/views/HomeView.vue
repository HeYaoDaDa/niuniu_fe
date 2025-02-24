<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import InventoryComponent from '@/components/InventoryComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-container">
    <div class="header">
      <h1>木牛放置</h1>
      <HeaderComponent />
    </div>

    <div class="sidebar">
      <SidebarComponent />
    </div>

    <div class="content">
      <RouterView />
    </div>

    <div class="second-sidebar">
      <InventoryComponent />
    </div>
  </div>
</template>