import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import type { Action } from '@/model/Action';
import { useGameDataStore } from './gameData';

export const useActionStore = defineStore('action', () => {
  const gameDataStore = useGameDataStore();

  const actionQueue = ref([] as Action[]);
  const currentActionTimeoutId = ref(undefined as number | undefined);
  const currentActionDuration = ref(undefined as number | undefined);
  const currentActionStartTime = ref(undefined as number | undefined);

  const isRunning = computed(() => actionQueue.value.length > 0);
  const currentActionName = computed(() => {
    if (isRunning.value) {
      //TODO
      return actionQueue.value[0].actionType;
    } else {
      return undefined;
    }
  });
  const currentActionTargetName = computed(() => {
    if (isRunning.value) {
      const action = actionQueue.value[0];
      if ('combat' === action.actionType) {
        const area = gameDataStore.getCombatAreaById(action.target);
        if (area) {
          return area.name;
        } else {
          console.error(`Combat action target ${action.target} not find`);
          return 'Error action target';
        }
      } else {
        const area = gameDataStore.getSkillAreaById(action.target);
        if (area) {
          return area.name;
        } else {
          console.error(`Skill action target ${action.target} not find`);
          return 'Error action target';
        }
      }
    } else {
      return undefined;
    }
  });

  function addAction(action: Action) {
    actionQueue.value.push(action);
    startAction();
  }

  function removeAction(index: number) {
    if (actionQueue.value.length > index) {
      if (index === 0) {
        cancelAction();
        actionQueue.value.splice(index, 1);
        startAction();
      } else {
        actionQueue.value.splice(index, 1);
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
    }
  }

  function completeAction() {
    if (isRunning.value) {
      const action = actionQueue.value[0];
      if (action.isInfinite) {
        startAction();
      } else {
        if (action.amount > 1) {
          action.amount -= 1;
          startAction();
        } else {
          removeAction(0);
        }
      }
    } else {
      console.error('Complete action not exist');
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
