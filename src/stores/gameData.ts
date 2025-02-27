import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { Skill } from '@/model/data/Skill';
import { Item } from '@/model/data/Item';
import { Monster } from '@/model/data/Monster';
import { SkillArea } from '@/model/data/SkillArea';
import { CombatArea } from '@/model/data/CombatArea';
import type { GameDataJson } from '@/model/json/GameDataJson';

export const useGameDataStore = defineStore('gameData', () => {
  const skillMap = new Map<string, Skill>();
  const itemMap = new Map<string, Item>();
  const monsterMap = new Map<string, Monster>();
  const skillAreaMap = new Map<string, SkillArea>();
  const skillAreasMap = new Map<string, SkillArea[]>();
  const combatAreaMap = new Map<string, CombatArea>();

  const dataStatus = ref('none' as 'none' | 'loading' | 'finish' | 'fail');

  async function loadData() {
    dataStatus.value = 'loading';
    try {
      const response = await axios.get('/data.json');
      const gameDataJson = response.data as GameDataJson;
      initData(gameDataJson);
      dataStatus.value = 'finish';
    } catch (error) {
      console.error('Failed to load data:', error);
      dataStatus.value = 'fail';
    }
  };
  function initData(data: GameDataJson) {
    for (const skillJson of data.skills) {
      skillMap.set(skillJson.id, Skill.fromJson(skillJson));
    }
    for (const itemJson of data.items) {
      itemMap.set(itemJson.id, Item.fromJson(itemJson));
    }
    for (const monsterJson of data.monsters) {
      monsterMap.set(monsterJson.id, Monster.fromJson(monsterJson));
    }
    for (const skillAreaJson of data.skillAreas) {
      const skillArea = SkillArea.fromJson(skillAreaJson);
      skillAreaMap.set(skillAreaJson.id, skillArea);
      const existSkillAreas = skillAreasMap.get(skillAreaJson.skill);
      if (existSkillAreas) {
        existSkillAreas.push(skillArea);
        existSkillAreas.sort((a, b) => a.sort - b.sort);
      } else {
        skillAreasMap.set(skillAreaJson.skill, [skillArea]);
      }
    }
    for (const combatAreaJson of data.combatAreas) {
      combatAreaMap.set(combatAreaJson.id, CombatArea.fromJson(combatAreaJson));
    }
  }
  function getSkillById(id: string): Skill | undefined {
    return skillMap.get(id);
  }
  function getItemById(id: string): Item | undefined {
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