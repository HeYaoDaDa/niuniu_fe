<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import InventoryComponent from '@/components/InventoryComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="sidebar-content-container">
    <div id="sidebar">
      <SidebarComponent />
    </div>
    <div id="header-content-container">
      <div id="header">
        <HeaderComponent />
      </div>
      <div id="content-second-sidebar-container">
        <div id="content-floor-container">
          <div id="content">
            <RouterView />
          </div>
          <div id="floor">
            <h1>FLOOR</h1>
          </div>
        </div>
        <div id="second-sidebar">
          <InventoryComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#sidebar-content-container {
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  gap: 4px;

  #sidebar {
    flex: 0 0 auto;
    background-color: $primary;
    color: $text-light;
  }

  #header-content-container {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;

    #header {
      flex: 0 0 auto;
    }

    #content-second-sidebar-container {
      flex: 1 0 auto;
      display: flex;
      flex-flow: row nowrap;

      #content-floor-container {
        flex: 1 0 auto;
        display: flex;
        flex-flow: column nowrap;

        #content {
          flex: 1 0 auto;
        }

        #floor {
          flex: 0 0 auto;
        }
      }

      #second-sidebar {
        flex: 0 0 auto;
      }
    }
  }
}
</style>