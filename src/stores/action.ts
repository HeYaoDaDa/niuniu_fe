import { defineStore } from 'pinia'
import { computed, reactive, shallowReactive, shallowRef, type ShallowReactive } from 'vue';
import { useInventoryStore } from './inventory';
import type { SkillArea } from '@/model/data/SkillArea';
import type { Amount } from '@/model/Amount';
import type { Item } from '@/model/data/Item';
import MersenneTwister from 'mersenne-twister';

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
        actionQueue.splice(index, 1);
        if (runningAction.value) {
          runningAction.value.cancel();
          runningAction.value = undefined;
        }
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
    if (isRunning.value && !runningAction.value) {
      runningAction.value = actionQueue[0].start(completeAction);
    } else {
      console.error(`Start action but isRunning is ${isRunning.value}, have runningAction is ${runningAction.value !== undefined}`);
    }
  }

  function completeAction() {
    if (runningAction.value) {
      const loots = runningAction.value.calculateRewards();
      const amount = runningAction.value.action.amount;
      runningAction.value = undefined;
      inventoryStore.adds(loots);
      if (amount.isInfinite) {
        startAction();
      } else {
        if (amount.amount > 1) {
          amount.amount -= 1;
          startAction();
        } else {
          removeAction(0);
        }
      }
    } else {
      console.error('Complete action not exist');
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

  start(completeAction: () => void): RunningAction {
    const duration = this.calculateDuration()
    return new RunningAction(this, performance.now(), duration, setTimeout(completeAction, duration));
  }

  calculateDuration(): number {
    //TODO
    return this.area.baseTime;
  }

  toString(): string {
    return `${this.area.skill.getName()} | ${this.area.getName()} [${this.amount}]`
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

  cancel() {
    clearTimeout(this.timeoutId);
  }

  calculateRewards(): [Item, number][] {
    const products = this.action.area.products;
    const result = [] as [Item, number][];
    for (const product of products) {
      const rng = new MersenneTwister();
      if (product.percentage >= rng.random_incl() * 100) {
        result.push([product.item, Math.floor(product.min + rng.random_incl() * (product.max - product.min + 1))]);
      }
    }
    return result;
  }
}