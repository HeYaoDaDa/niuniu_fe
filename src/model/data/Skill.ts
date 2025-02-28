import { useI18n } from "vue-i18n";
import type { SkillJson } from "../json/SkillJson";

export class Skill {
    constructor(
        public id: string,
        public sort: number,
    ) { }

    static fromJson(skillJson: SkillJson): Skill {
        return new Skill(
            skillJson.id,
            skillJson.sort,
        );
    }

    getName(): string {
        return useI18n().t(`skill.${this.id}.name`);
    }

    getDescription(): string {
        return useI18n().t(`skill.${this.id}.description`);
    }
}