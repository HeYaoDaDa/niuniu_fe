import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type { GameData } from '@/model/PrefabItem';
import axios from 'axios';
import type { Item } from '@/model/Item';
import type { CurrentAction } from '@/model/Action';

export const useGameStore = defineStore('game', () => {
  const data = shallowRef({} as GameData);
  const status = ref('none' as 'none' | 'loading' | 'finish' | 'fail');

  const inventory = ref([] as Item[]);
  // const currentAction = ref(undefined as CurrentAction | undefined)
  //TODO
  const currentAction = ref({
    skill: 'mining',
    target: 'beach',

    isInfinite: true,
    amount: 0,
    duration: 3000,
    elapsed: 0,
  } as CurrentAction | undefined)

  const loadData = async () => {
    status.value = 'loading';
    try {
      const response = await axios.get('data.json');
      data.value = response.data;
      status.value = 'finish';
    } catch (error) {
      console.error('Failed to load data:', error);
      status.value = 'fail';
    }
  };
  const addInventoryItem = (id: string, amount: number) => {
    const existItem = inventory.value.find(it => it.prefabItem.id === id);
    if (existItem) {
      existItem.amount += amount;
    } else {
      const newItem = data.value.items.find(it => it.id === id);
      if (newItem) {
        inventory.value.push({ prefabItem: newItem, amount });
        inventory.value.sort((a, b) => a.prefabItem.sort - b.prefabItem.sort);
      } else {
        console.error(`Not exist item id ${id}`);
      }
    }
  }
  const removeInventoryItem = (id: string, amount: number) => {
    const existItem = inventory.value.find(it => it.prefabItem.id === id);
    if (existItem) {
      if (existItem.amount > amount) {
        existItem.amount -= amount;
      } else {
        if (existItem.amount < amount) {
          console.error(`${id} amount ${existItem.amount} < ${amount}`);
        }
        const existItemIndex = inventory.value.findIndex(it => it.prefabItem.id === id);
        inventory.value.splice(existItemIndex, 1);
      }
    } else {
      console.error(`Not exist inventory item id ${id}`);
    }
  }
  const completeAction = () => {
    const currentActionValue = currentAction.value;
    if (currentActionValue) {
      if (currentActionValue.skill === 'mining') {
        const existArea = data.value.miningAreas.find(it => it.id === currentActionValue.target);
        if (existArea) {
          for (const loot of existArea.loot) {
            //TODO
            addInventoryItem(loot.id, loot.min);
          }
        } else {
          console.error(`Current not exist area ${currentActionValue.skill} ${currentActionValue.target}`);
        }
      } else if (currentActionValue.skill === 'woodcutting') {
        const existArea = data.value.miningAreas.find(it => it.id === currentActionValue.target);
        if (existArea) {
          for (const loot of existArea.loot) {
            //TODO
            addInventoryItem(loot.id, loot.min);
          }
        } else {
          console.error(`Current not exist area ${currentActionValue.skill} ${currentActionValue.target}`);
        }
      } else if (currentActionValue.skill === 'combat') {
        //TODO
      }
      if (currentActionValue.isInfinite) {
        return;
      } else {
        if (currentActionValue.amount > 1) {
          currentActionValue.amount -= 1;
          currentActionValue.elapsed = 0;
        } else {
          if (currentActionValue.amount < 1) {
            console.error(`Current action amount ${currentActionValue.amount} < 1`);
          }
          currentAction.value = undefined;
        }
      }
    } else {
      console.error('Current not exist action');
    }
  }

  return { data, status, inventory, currentAction, loadData, addInventoryItem, removeInventoryItem, completeAction }
})