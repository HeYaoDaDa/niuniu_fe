import type { ShallowRef } from "vue";
import type { Item } from "./data/Item";

export interface InventoryItem {
    item: ShallowRef<Item>;
    amount: number;
}