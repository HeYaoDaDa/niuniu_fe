export class Amount {
    private constructor(public isInfinite: boolean = false, public amount: number = 0) { }

    static infinite(): Amount {
        return new Amount(true, 0);
    }

    static finite(amount: number): Amount {
        return new Amount(false, amount);
    }
}