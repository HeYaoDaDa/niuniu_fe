import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowReactive, type ShallowReactive } from 'vue';
import { useInventoryStore } from './inventory';
import type { SkillArea } from '@/model/data/SkillArea';
import type { Amount } from '@/model/Amount';

export const useActionStore = defineStore('action', () => {
  const inventoryStore = useInventoryStore();

  const actionQueue = reactive([] as ActionQueueItem[]);
  const currentActionTimeoutId = ref(undefined as number | undefined);
  const currentActionDuration = ref(undefined as number | undefined);
  const currentActionStartTime = ref(undefined as number | undefined);

  const isRunning = computed(() => actionQueue.length > 0);
  const currentActionName = computed(() => {
    if (isRunning.value) {
      return actionQueue[0].area.skill.name;
    } else {
      return undefined;
    }
  });
  const currentActionTargetName = computed(() => {
    if (isRunning.value) {
      const action = actionQueue[0];
      return action.area.name;
    } else {
      return undefined;
    }
  });

  function addAction(area: SkillArea, amount: Amount) {
    actionQueue.push(new ActionQueueItem(area, amount));
    if (actionQueue.length === 1) {
      startAction();
    }
  }

  function removeAction(index: number) {
    if (actionQueue.length > index) {
      if (index === 0) {
        cancelAction();
        actionQueue.splice(index, 1);
        if (isRunning.value) {
          startAction();
        }
      } else {
        actionQueue.splice(index, 1);
      }
    } else {
      console.error(`ActionQueue index ${index} not exist`);
    }
  }

  function startAction() {
    //TODO compute duration
    const duration = 5000;
    if (isRunning.value && !currentActionTimeoutId.value) {
      currentActionDuration.value = duration;
      currentActionStartTime.value = performance.now();
      currentActionTimeoutId.value = setTimeout(completeAction, duration);
    } else {
      console.error(`Start action but isRunning is ${isRunning.value}, have timeoutId is ${currentActionTimeoutId.value !== undefined}`);
    }
  }

  function completeAction() {
    currentActionTimeoutId.value = undefined;
    if (isRunning.value) {
      const action = actionQueue[0];
      calculateRewards(action);
      if (action.amount.isInfinite) {
        startAction();
      } else {
        if (action.amount.amount > 1) {
          action.amount.amount -= 1;
          startAction();
        } else {
          removeAction(0);
        }
      }
    } else {
      console.error('Complete action not exist');
    }
  }

  function calculateRewards(action: ActionQueueItem) {
    const products = action.area.products;
    for (const product of products) {
      //TODO
      inventoryStore.add(product.item, product.max);
    }
  }

  function cancelAction() {
    if (isRunning.value && currentActionTimeoutId.value) {
      currentActionDuration.value = undefined;
      currentActionStartTime.value = undefined;
      clearTimeout(currentActionTimeoutId.value);
      currentActionTimeoutId.value = undefined;
    }
  }

  return {
    actionQueue,

    isRunning,
    currentActionDuration,
    currentActionStartTime,
    currentActionName,
    currentActionTargetName,

    addAction,
    removeAction
  }
})

class ActionQueueItem {
  area: ShallowReactive<SkillArea>;

  constructor(area: SkillArea, public amount: Amount) {
    this.area = shallowReactive(area);
  }

  toString(): string {
    return `${this.area.skill.name} | ${this.area.name} [${this.amount}]`
  }
}