import { defineStore } from "pinia";
import { useGameDataStore } from "./gameData";
import { readonly, ref } from "vue";
import { Skill } from "@/model/game/Skill";

export const useCharacterStore = defineStore('character', () => {
    const gameData = useGameDataStore();

    const skillData = new Map(gameData.allSkills.map((it) => [it.id, { xp: ref(0), skill: it }]));

    const skillMap = new Map(
        Array.from(skillData.entries()).map(([id, { xp, skill }]) =>
            [
                id,
                new Skill(skill, readonly(xp))
            ]
        )
    )
    const allSkills = Array.from(skillMap.values());

    function getSkillById(id: string) {
        return skillMap.get(id)
    }

    function addXp(id: string, xp: number) {
        const skill = skillData.get(id);
        if (skill) {
            skill.xp.value += xp;
        } else {
            console.error(`Skill ${id} not find`)
        }
    }

    return {
        allSkills,
        getSkillById,
        addXp
    }
});