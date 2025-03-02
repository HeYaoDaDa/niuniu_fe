import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue';
import { useInventoryStore } from './inventory';
import type { SkillArea } from '@/model/data/SkillArea';
import type { Amount } from '@/model/Amount';
import type { Item } from '@/model/data/Item';
import MersenneTwister from 'mersenne-twister';
import { useCharacterStore } from './character';

export const useActionStore = defineStore('action', () => {
  const inventoryStore = useInventoryStore();
  const characterStore = useCharacterStore();

  const actionQueue = reactive([] as ActionQueueItem[]);
  const runningAction = ref(undefined as RunningAction | undefined);

  const isRunning = computed(() => actionQueue.length > 0);
  const queuedActions = computed(() => actionQueue.length > 1 ? actionQueue.slice(1) : []);

  function startAction() {
    if (isRunning.value && !runningAction.value) {
      const duration = actionQueue[0].calculateDuration()
      runningAction.value = new RunningAction(actionQueue[0], performance.now(), duration, setTimeout(completeAction, duration));
    } else {
      console.error(`Start action but isRunning is ${isRunning.value}, have runningAction is ${runningAction.value !== undefined}`);
    }
  }

  function completeAction() {
    if (runningAction.value) {
      const prevAction = runningAction.value;
      runningAction.value = undefined;

      inventoryStore.adds(prevAction.calculateRewards());
      characterStore.getSkillById(prevAction.action.area.skill.id)?.addXp(prevAction.action.area.xp);

      const amount = prevAction.action.amount;
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

  return {
    actionQueue,
    runningAction,

    isRunning,
    queuedActions,

    addAction,
    removeAction
  }
})

class ActionQueueItem {
  constructor(public area: SkillArea, public amount: Amount) {
  }

  calculateDuration(): number {
    const characterStore = useCharacterStore()
    const skill = characterStore.getSkillById(this.area.skill.id);
    if (skill) {
      return this.area.baseTime * (1 - 0.009 * skill.level.value)
    }
    return this.area.baseTime;
  }

  toShow(): string {
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