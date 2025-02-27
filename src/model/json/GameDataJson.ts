import type { CombatAreaJson } from "./CombatAreaJson";
import type { ItemJson } from "./ItemJson";
import type { MonsterJson } from "./MonsterJson";
import type { SkillAreaJson } from "./SkillAreaJson";
import type { SkillJson } from "./SkillJson";

export interface GameDataJson {
    skills: SkillJson[];
    items: ItemJson[];
    monsters: MonsterJson[];
    skillAreas: SkillAreaJson[];
    combatAreas: CombatAreaJson[];
}