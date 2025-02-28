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
        return `skill.${this.id}.name`;
    }

    getDescription(): string {
        return `skill.${this.id}.description`;
    }
}