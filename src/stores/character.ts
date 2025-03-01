import { Skill } from "@/model/data/Skill";
import { defineStore } from "pinia";
import { useGameDataStore } from "./gameData";
import { computed, ref } from "vue";

export const useCharacterStore = defineStore('character', () => {
    const gameData = useGameDataStore();

    const skillData = new Map(gameData.allSkills.map((it) => [it.id, ref(0)]));

    const skillMap = new Map(
        Array.from(skillData.entries()).map(([id, xp]) =>
            [
                id,
                computed(() => new CharacterSkill(gameData.getSkillById(id)!, xp.value))
            ]
        )
    )

    function getSkillById(id: string) {
        return skillMap.get(id)
    }

    class CharacterSkill {
        id: string;
        level: number;

        constructor(
            public skill: Skill,
            public xp: number,
        ) {
            this.id = skill.id;
            this.level = Math.floor(this.xp / 100);
        }

        addXp(xp: number) {
            const skillXp = skillData.get(this.id);
            if (skillXp) {
                skillXp.value += xp;
            } else {
                console.error(`Skill ${this.id} not find`);
            }
        }
    }

    return {
        getSkillById
    }
});
