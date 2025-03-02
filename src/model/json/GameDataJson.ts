import type { ItemJson } from "./ItemJson";
import type { SkillAreaJson } from "./SkillAreaJson";
import type { SkillJson } from "./SkillJson";

export interface GameDataJson {
    skills: SkillJson[];
    items: ItemJson[];
    skillAreas: SkillAreaJson[];
}