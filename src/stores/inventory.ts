import type { InventoryItem } from '@/model/InventoryItem';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import type { Item } from '@/model/data/Item';

export const useInventoryStore = defineStore('inventory', () => {
  const itemMap = ref(new Map<string, InventoryItem>());

  const items = computed(() => Array.from(itemMap.value.values()).sort((a, b) => a.item.sort - b.item.sort));

  function add(item: Item, amount: number) {
    const existItem = itemMap.value.get(item.id);
    if (existItem) {
      existItem.amount += amount;
    } else {
      itemMap.value.set(item.id, { item, amount });
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