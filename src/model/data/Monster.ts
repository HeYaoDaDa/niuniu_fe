import type { MonsterJson } from "../json/MonsterJson";
import { Loot } from "./Loot";

export class Monster {
    constructor(
        public id: string,
        public name: string,

        public hp: number,
        public mp: number,
        public attack: number,
        public attackDuration: number,

        public loots: Loot[]
    ) { }

    static fromJson(monsterJson: MonsterJson): Monster {
        const loots = monsterJson.loots.map(Loot.fromJson);
        return new Monster(
            monsterJson.id,
            monsterJson.name,

            monsterJson.hp,
            monsterJson.mp,
            monsterJson.attack,
            monsterJson.attackDuration,

            loots
        );
    }

    //TODO compute loot funcation
}