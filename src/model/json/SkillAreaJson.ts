import type { LootJson } from "./LootJson";

export interface SkillAreaJson {
    id: string;
    skill: string;

    sort: number;
    baseTime: number;
    xp: number;
    products: LootJson[];
}