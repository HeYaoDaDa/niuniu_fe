export interface PrefabItem {
    id: string;
    type: string;
    name: string;
    describe: string;

    sort: number;
}

export interface Monster {
    id: string;
    name: string;

    hp: number;
    mp: number;
    attack: number;
    attackDuration: number;
}

export interface MiningArea {
    id: string;
    name: string;
    describe: string;

    sort: number;
    time: number;
    loot: Loot[];
}

export interface WoodcauttingArea {
    id: string;
    name: string;
    describe: string;

    sort: number;
    time: number;
    loot: Loot[];
}

export interface CombatArea {
    id: string;
    name: string;
    describe: string;

    sort: number;
    monster: string;
}

export interface Loot {
    id: string;
    percentage: number;
    min: number;
    max: number;
}

export interface GameData {
    items: PrefabItem[];
    monsters: Monster[];
    miningAreas: MiningArea[];
    woodcuttingAreas: WoodcauttingArea[];
    combatAreas: CombatArea[];
}