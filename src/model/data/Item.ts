import type { ItemJson } from "../json/ItemJson";

export class Item {
    constructor(
        public id: string,
        public sort: number
    ) { }

    static fromJson(itemJson: ItemJson): Item {
        return new Item(
            itemJson.id,
            itemJson.sort
        );
    }

    getName(): string {
        return `item.${this.id}.name`;
    }

    getDescription(): string {
        return `item.${this.id}.description`;
    }
}