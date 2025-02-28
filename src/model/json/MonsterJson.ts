import type { LootJson } from "./LootJson";

export interface MonsterJson {
    id: string;

    hp: number;
    mp: number;
    attack: number;
    attackDuration: number;

    loots: LootJson[];
}