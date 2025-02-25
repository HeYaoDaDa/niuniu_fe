export interface Action {
    actionType: string,
    target: string,

    isInfinite: boolean,
    amount: number,
}
