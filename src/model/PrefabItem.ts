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

export interface SkillArea {
    id: string;
    skill: string;
    name: string;
    describe: string;

    sort: number;
    baseTime: number;
    products: Loot[];
}

export interface CombatArea {
    id: string;
    name: string;
    describe: string;

    sort: number;
    monsters: string[];
}

export interface Loot {
    id: string;
    percentage: number;
    min: number;
    max: number;
}

export interface GameJsonData {
    items: PrefabItem[];
    monsters: Monster[];
    skillAreas: SkillArea[];
    combatAreas: CombatArea[];
}
