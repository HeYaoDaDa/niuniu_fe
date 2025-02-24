export interface Action {
    id: string;

    name: string;
    describe: string;

    sort: number;
}

export interface CurrentAction {
    skill: string,
    target: string,

    isInfinite: boolean,
    amount: number,
    duration: number,
    elapsed: number,
}