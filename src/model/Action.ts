import type { Amount } from "./Amount";
import type { SkillArea } from "./data/SkillArea";

export interface Action {
    area: SkillArea;
    amount: Amount;
}
