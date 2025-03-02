import { computed, type ComputedRef, type Ref } from "vue";
import type { SkillData } from "../data/SkillData";
import { useCharacterStore } from "@/stores/character";

export class Skill {
    private characterStore: ReturnType<typeof useCharacterStore>;
    id: string;
    level: ComputedRef<number>;

    constructor(
        public data: SkillData,
        public xp: Ref<number>,
    ) {
        this.characterStore = useCharacterStore();
        this.id = data.id;
        this.level = computed(() => Math.floor(this.xp.value / 100));
    }

    addXp(xp: number) {
        this.characterStore.addXp(this.id, xp);
    }
}