 interface ICard {
    rank: number,
    suit: number
}

class Card implements ICard {
    public rank: number;
    public suit: number;

    constructor(r: number, s: number) {
        this.rank = r;
        this.suit = s;
    }
}

export { ICard, Card };
