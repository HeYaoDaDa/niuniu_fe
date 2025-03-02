import { Skill } from "@/model/data/Skill";
import { defineStore } from "pinia";
import { useGameDataStore } from "./gameData";
import { computed, readonly, ref, type ComputedRef, type Ref } from "vue";

export const useCharacterStore = defineStore('character', () => {
    class CharacterSkill {
        id: string;
        level: ComputedRef<number>;

        constructor(
            public skill: Skill,
            public xp: Ref<number>,
        ) {
            this.id = skill.id;
            this.level = computed(() => Math.floor(this.xp.value / 100));
        }

        addXp(xp: number) {
            addXp(this.id, xp);
        }
    }

    const gameData = useGameDataStore();

    const skillData = new Map(gameData.allSkills.map((it) => [it.id, { xp: ref(0), skill: it }]));

    const skillMap = new Map(
        Array.from(skillData.entries()).map(([id, { xp, skill }]) =>
            [
                id,
                new CharacterSkill(skill, readonly(xp))
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