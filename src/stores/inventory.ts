import type { Item } from '@/model/Item';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { useGameDataStore } from './gameData';

export const useInventoryStore = defineStore('inventory', () => {
  const gameDataStore = useGameDataStore();
  const itemMap = ref(new Map<string, Item>());

  const items = computed(() => Array.from(itemMap.value.values()).sort((a, b) => a.prefabItem.sort - b.prefabItem.sort));

  function add(id: string, amount: number) {
    const existItem = itemMap.value.get(id);
    if (existItem) {
      existItem.amount += amount;
    } else {
      const newItem = gameDataStore.getItemById(id);
      if (newItem) {
        itemMap.value.set(id, { prefabItem: newItem, amount });
      } else {
        console.error(`Not exist item id ${id}`);
      }
    }
  }
  function remove(id: string, amount: number) {
    const existItem = itemMap.value.get(id);
    if (existItem) {
      if (existItem.amount > amount) {
        existItem.amount -= amount;
      } else {
        if (existItem.amount < amount) {
          console.error(`${id} amount ${existItem.amount} < ${amount}`);
        }
        itemMap.value.delete(id);
      }
    } else {
      console.error(`Not exist inventory item id ${id}`);
    }
  }

  return {
    items,
    add,
    remove
  }
})