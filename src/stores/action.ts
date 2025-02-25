import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue';
import type { Action } from '@/model/Action';
import { useGameDataStore } from './gameData';

export const useActionStore = defineStore('action', () => {
  const gameDataStore = useGameDataStore();

  const actionQueue = shallowRef([] as Action[]);
  const currentActionTimeoutId = ref(undefined as number | undefined);
  const currentActionDuration = ref(undefined as number | undefined);
  const currentActionStartTime = ref(undefined as number | undefined);
  const currentActionPerformance = ref(undefined as number | undefined);

  const currentActionName = computed(() => {
    if (actionQueue.value.length > 0) {
      //TODO
      return actionQueue.value[0].actionType;
    } else {
      return undefined;
    }
  });
  const currentActionTargetName = computed(() => {
    if (actionQueue.value.length > 0) {
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
    if (actionQueue.value.length === 0) {
      startAction(5000);
    }
  }

  function removeAction(index: number) {
    // TODO
  }



  function startAction(duration: number) {
    if (currentActionTimeoutId.value) {
      currentActionDuration.value = duration;
      currentActionStartTime.value = performance.now();
      currentActionTimeoutId.value = setTimeout(completeAction, duration);
    }
  }

  function completeAction() {
    if (actionQueue.value.length > 0) {
      const action = actionQueue.value[0];
      if (action.isInfinite) {
        startAction(5000);
      } else {
        if (action.amount > 1) {
          action.amount -= 1;
          startAction(5000);
        } else {
          actionQueue.value.shift();
          if (actionQueue.value.length === 0) {
            startAction(5000);
          }
        }
      }
    } else {
      console.error('Complete action not exist');
    }
  }

  return {
    actionQueue,

    currentActionDuration,
    currentActionStartTime,
    currentActionPerformance,
    currentActionName,
    currentActionTargetName,

    addAction,
    removeAction
  }
})