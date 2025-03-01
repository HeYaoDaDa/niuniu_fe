import { Skill } from "@/model/data/Skill";
import { defineStore } from "pinia";
import { reactive, type ShallowReactive } from "vue";
import { useGameDataStore } from "./gameData";
import { useNotificationStore } from "./notification";
import { useI18n } from "vue-i18n";

export const useCharacterStore = defineStore('character', () => {
    const gameDataStore = useGameDataStore();
    const notificationStore = useNotificationStore();
    const { t } = useI18n();


    const skillMap = reactive(new Map<string, CharacterSkill>(gameDataStore.allSkills.map(skill => [skill.id, new CharacterSkill(skill)])));

    function getSkillById(id: string): CharacterSkill | undefined {
        return skillMap.get(id);
    }

    function addXp(id: string, xp: number) {
        const skill = getSkillById(id);
        if (skill) {
            const oldLevel = skill.getLevel();
            skill.xp += xp;
            if (skill.getLevel() > oldLevel) {
                notificationStore.notification('info', t(skill.skill.getName()) + ' to ' + skill.getLevel())
            }
        } else {
            console.error(`Skill ${id} not find`);
        }
    }

    return {
        getSkillById,

        addXp
    }
});

class CharacterSkill {
    xp: number = 0;

    constructor(public skill: ShallowReactive<Skill>) { }

    getLevel(): number {
        return Math.floor(this.xp / 100);
    }
}
