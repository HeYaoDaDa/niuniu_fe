import { useGameDataStore } from "@/stores/gameData";
import type { LootJson } from "../json/LootJson";
import type { Item } from "./Item";

export class Loot {
    constructor(
        public item: Item,
        public percentage: number,
        public min: number,
        public max: number
    ) { }

    static fromJson(lootJson: LootJson): Loot {
        const gameDataStore = useGameDataStore();
        const item = gameDataStore.getItemById(lootJson.id);
        if (!item) {
            throw `Not exist item ${lootJson.id}`;
        }
        return new Loot(
            item,
            lootJson.percentage,
            lootJson.min,
            lootJson.max
        );
    }

    //TODO compute loot funcation
}