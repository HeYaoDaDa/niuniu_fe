import { useGameDataStore } from "@/stores/gameData";
import type { SkillAreaJson } from "../json/SkillAreaJson";
import { Loot } from "./Loot";
import type { Skill } from "./Skill";

export class SkillArea {
    constructor(
        public id: string,
        public skill: Skill,
        public name: string,
        public describe: string,

        public sort: number,
        public baseTime: number,

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
            skillAreaJson.name,
            skillAreaJson.describe,

            skillAreaJson.sort,
            skillAreaJson.baseTime,

            products
        );
    }

    //TODO compute loot funcation
}