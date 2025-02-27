import type { CombatAreaJson } from "../json/CombatAreaJson";
import type { Monster } from "./Monster";

export class CombatArea {
    constructor(
        public id: string,
        public name: string,
        public describe: string,

        public sort: number,
        public monsters: Monster[]
    ) { }



    static fromJson(combatAreaJson: CombatAreaJson): CombatArea {
        // const gameDataStore = useGameDataStore();
        // const monsters = gameDataStore.getMonstersByIds(combatAreaJson.monsters);
        return new CombatArea(
            combatAreaJson.id,
            combatAreaJson.name,
            combatAreaJson.describe,

            combatAreaJson.sort,
            []
        );
    }

    //TODO compute loot funcation
}