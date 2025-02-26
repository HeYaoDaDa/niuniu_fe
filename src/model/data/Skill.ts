import type { SkillJson } from "../json/SkillJson";

export class Skill {
    constructor(
        public id: string,
        public name: string,
        public describe: string,

        public sort: number,

        public areas: string[] = [],
    ) { }

    static fromJson(skillJson: SkillJson): Skill {
        return new Skill(
            skillJson.id,
            skillJson.name,
            skillJson.describe,

            skillJson.sort,
        );
    }

    //TODO link areas
}