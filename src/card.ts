 interface ICard {
    id: number,
    rank: number,
    suit: number
}

class Card implements ICard {
    public id: number;
    public rank: number;
    public suit: number;

    constructor(id: number, r: number, s: number) {
        this.id = id;
        this.rank = r;
        this.suit = s;
    }
}

export { ICard, Card };
