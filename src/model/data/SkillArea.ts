import { useGameDataStore } from "@/stores/gameData";
import type { SkillAreaJson } from "../json/SkillAreaJson";
import { Loot } from "./Loot";
import type { SkillData } from "./SkillData";
import i18n from "@/i18n";

export class SkillArea {
    constructor(
        public id: string,
        public skill: SkillData,

        public sort: number,
        public baseTime: number,
        public xp: number,

        public products: Loot[]
    ) { }

    static fromJson(skillAreaJson: SkillAreaJson): SkillArea {
        const gameDataStore = useGameDataStore();
        const skill = gameDataStore.getSkillById(skillAreaJson.skill);
        if (!skill) {
            throw `Not exist skill ${skillAreaJson.skill}`;
        }
        const products = skillAreaJson.products.map(Loot.fromJson);
        return new SkillArea(
            skillAreaJson.id,
            skill,

            skillAreaJson.sort,
            skillAreaJson.baseTime,
            skillAreaJson.xp,

            products
        );
    }

    getName(): string {
        return i18n.global.t(`skillArea.${this.id}.name`);
    }

    getDescription(): string {
        return i18n.global.t(`skillArea.${this.id}.description`);
    }

    //TODO compute loot funcation
}