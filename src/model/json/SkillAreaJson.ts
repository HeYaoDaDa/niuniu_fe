import type { LootJson } from "./LootJson";

export interface SkillAreaJson {
    id: string;
    skill: string;
    name: string;
    describe: string;

    sort: number;
    baseTime: number;
    products: LootJson[];
}