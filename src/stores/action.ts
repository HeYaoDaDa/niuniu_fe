import { defineStore } from 'pinia'
import { computed, reactive, shallowReactive, shallowRef, type ShallowReactive } from 'vue';
import { useInventoryStore } from './inventory';
import type { SkillArea } from '@/model/data/SkillArea';
import type { Amount } from '@/model/Amount';

export const useActionStore = defineStore('action', () => {
  const inventoryStore = useInventoryStore();

  const actionQueue = reactive([] as ActionQueueItem[]);
  const runningAction = shallowRef(undefined as RunningAction | undefined);

  const isRunning = computed(() => actionQueue.length > 0);

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
    if (isRunning.value && !runningAction.value) {
      runningAction.value = new RunningAction(actionQueue[0], performance.now(), duration, setTimeout(completeAction, duration))
    } else {
      console.error(`Start action but isRunning is ${isRunning.value}, have runningAction is ${runningAction.value !== undefined}`);
    }
  }

  function completeAction() {
    runningAction.value = undefined;
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
    if (isRunning.value && runningAction.value) {
      clearTimeout(runningAction.value.timeoutId);
      runningAction.value = undefined;
    }
  }

  return {
    actionQueue,
    runningAction,

    isRunning,

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

class RunningAction {
  constructor(
    public action: ActionQueueItem,
    public startTime: number,
    public duration: number,
    public timeoutId: number
  ) { }

  getDurationShow(): string {
    return this.duration / 1_000 + 's';
  }
}