import { useI18n } from "vue-i18n";
import type { MonsterJson } from "../json/MonsterJson";
import { Loot } from "./Loot";

export class Monster {
    constructor(
        public id: string,

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

            monsterJson.hp,
            monsterJson.mp,
            monsterJson.attack,
            monsterJson.attackDuration,

            loots
        );
    }

    getName(): string {
        return useI18n().t(`monster.${this.id}.name`);
    }

    getDescription(): string {
        return useI18n().t(`monster.${this.id}.description`);
    }
}