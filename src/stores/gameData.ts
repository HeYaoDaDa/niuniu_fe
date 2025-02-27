import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import type { CombatArea, SkillArea, Monster, PrefabItem, GameJsonData } from "@/model/PrefabItem";
import type { Skill } from '@/model/data/Skill';

export const useGameDataStore = defineStore('gameData', () => {
  const itemMap = new Map<string, PrefabItem>();
  const monsterMap = new Map<string, Monster>();
  const skillAreaMap = new Map<string, SkillArea>();
  const skillAreasMap = new Map<string, SkillArea[]>();
  const combatAreaMap = new Map<string, CombatArea>();

  const dataStatus = ref('none' as 'none' | 'loading' | 'finish' | 'fail');

  async function loadData() {
    dataStatus.value = 'loading';
    try {
      const response = await axios.get('/data.json');
      const gameJsonData = response.data as GameJsonData;
      initData(gameJsonData);
      dataStatus.value = 'finish';
    } catch (error) {
      console.error('Failed to load data:', error);
      dataStatus.value = 'fail';
    }
  };
  function initData(data: GameJsonData) {
    for (const item of data.items) {
      itemMap.set(item.id, item);
    }
    for (const monster of data.monsters) {
      monsterMap.set(monster.id, monster);
    }
    for (const skillArea of data.skillAreas) {
      skillAreaMap.set(skillArea.id, skillArea);
      const existSkillAreas = skillAreasMap.get(skillArea.skill);
      if (existSkillAreas) {
        existSkillAreas.push(skillArea);
        existSkillAreas.sort((a, b) => a.sort - b.sort);
      } else {
        skillAreasMap.set(skillArea.skill, [skillArea]);
      }
    }
    for (const combatArea of data.combatAreas) {
      combatAreaMap.set(combatArea.id, combatArea);
    }
  }
  //TODO
  function getSkillById(id: string): Skill | undefined {
    console.log(id);
    return undefined;
  }
  function getItemById(id: string): PrefabItem | undefined {
    return itemMap.get(id);
  }
  function getMonsterById(id: string): Monster | undefined {
    return monsterMap.get(id);
  }
  function getMonstersByIds(ids: string[]): Monster[] {
    return ids.map(id => monsterMap.get(id)).filter(value => value !== undefined);
  }
  function getSkillAreaById(id: string): SkillArea | undefined {
    return skillAreaMap.get(id);
  }
  function getCombatAreaById(id: string): CombatArea | undefined {
    return combatAreaMap.get(id);
  }
  function getSkillAreasBySkillId(skillId: string): SkillArea[] {
    return skillAreasMap.get(skillId) ?? []
  }
  //TODO
  function getCombatAreas(): CombatArea[] {
    return Array.from(combatAreaMap.values());
  }

  return {
    dataStatus,
    loadData,
    getSkillById,
    getItemById,
    getMonsterById,
    getMonstersByIds,
    getSkillAreaById,
    getCombatAreaById,
    getSkillAreasBySkillId,
    getCombatAreas
  }
});