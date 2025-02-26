import type { ItemJson } from "../json/ItemJson";

export class Item {
    constructor(
        public id: string,
        public type: string,
        public name: string,
        public describe: string,
        public sort: number
    ) { }

    static fromJson(itemJson: ItemJson): Item {
        return new Item(
            itemJson.id,
            itemJson.type,
            itemJson.name,
            itemJson.describe,
            itemJson.sort
        );
    }
}