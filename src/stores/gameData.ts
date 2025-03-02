import { computed, markRaw, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { Skill } from '@/model/data/Skill';
import { Item } from '@/model/data/Item';
import { SkillArea } from '@/model/data/SkillArea';
import type { GameDataJson } from '@/model/json/GameDataJson';

export const useGameDataStore = defineStore('gameData', () => {
  const skillMap = new Map<string, Skill>();
  const itemMap = new Map<string, Item>();
  const skillAreaMap = new Map<string, SkillArea>();
  const skillAreasMap = new Map<string, SkillArea[]>();

  const dataStatus = ref('none' as 'none' | 'loading' | 'finish' | 'fail');

  const allSkills = computed(() => Array.from(skillMap.values()).sort((a, b) => a.sort - b.sort));

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
      skillMap.set(skillJson.id, markRaw(Skill.fromJson(skillJson)));
    }
    for (const itemJson of data.items) {
      itemMap.set(itemJson.id, markRaw(Item.fromJson(itemJson)));
    }
    for (const skillAreaJson of data.skillAreas) {
      const skillArea = markRaw(SkillArea.fromJson(skillAreaJson));
      skillAreaMap.set(skillAreaJson.id, skillArea);
      const existSkillAreas = skillAreasMap.get(skillAreaJson.skill);
      if (existSkillAreas) {
        existSkillAreas.push(skillArea);
        existSkillAreas.sort((a, b) => a.sort - b.sort);
      } else {
        skillAreasMap.set(skillAreaJson.skill, [skillArea]);
      }
    }
  }
  function getSkillById(id: string): Skill | undefined {
    return skillMap.get(id);
  }
  function getItemById(id: string): Item | undefined {
    return itemMap.get(id);
  }
  function getSkillAreaById(id: string): SkillArea | undefined {
    return skillAreaMap.get(id);
  }
  function getSkillAreasBySkillId(skillId: string): SkillArea[] {
    return skillAreasMap.get(skillId) ?? []
  }

  return {
    dataStatus,

    allSkills,

    loadData,
    getSkillById,
    getItemById,
    getSkillAreaById,
    getSkillAreasBySkillId,
  }
});