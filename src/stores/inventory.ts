import type { InventoryItem } from '@/model/InventoryItem';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import type { Item } from '@/model/data/Item';
import { useGameDataStore } from './gameData';

export const useInventoryStore = defineStore('inventory', () => {
  const gameDataStore = useGameDataStore();

  const inventoryItemMap = ref(new Map<string, InventoryItem>());

  const inventoryItems = computed(() => Array.from(inventoryItemMap.value.values()).sort((a, b) => a.item.sort - b.item.sort));

  function add(itemOrId: Item | string, amount: number) {
    let item;
    if (typeof itemOrId === 'string') {
      item = gameDataStore.getItemById(itemOrId)
      if (item === undefined) {
        console.error(`Not exist item id ${itemOrId}`);
        return;
      }
    } else {
      item = itemOrId
    }
    const existItem = inventoryItemMap.value.get(item.id);
    if (existItem) {
      existItem.amount += amount;
    } else {
      inventoryItemMap.value.set(item.id, { item, amount });
    }
  }
  function remove(id: string, amount: number) {
    const existItem = inventoryItemMap.value.get(id);
    if (existItem) {
      if (existItem.amount > amount) {
        existItem.amount -= amount;
      } else {
        if (existItem.amount < amount) {
          console.error(`${id} amount ${existItem.amount} < ${amount}`);
        }
        inventoryItemMap.value.delete(id);
      }
    } else {
      console.error(`Not exist inventory item id ${id}`);
    }
  }

  return {
    inventoryItems,
    add,
    remove
  }
})