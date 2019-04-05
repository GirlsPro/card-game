import { Card, ICard } from './card';

class Deck {
    private static readonly _deck: ICard[] = [];
    public static  DECK_SIZE: number = 36;
    public static readonly SUIT_CARDS_AMOUNT: number = 9;

    public static getCard(index: number): ICard {
        return Deck._deck[index];
    }

    public static shuffle(): void {
        let index: number;
        let temp: ICard;

        for (let i = 0; i < Deck.DECK_SIZE; i++) {
            index = Math.floor(Math.random() * 100) % Deck.SUIT_CARDS_AMOUNT;
            temp = Deck._deck[index];
            Deck._deck[index] = Deck._deck[i];
            Deck._deck[i] = temp;
        }
    }

    public static * getIterator(): Generator  {
        for (let i = 0; i < Deck.DECK_SIZE; i++) {
           yield { card: Deck._deck[i], id: i };
        }
    }

    public static init(): void {
        for (let i = 0; i < Deck.DECK_SIZE; i++) {
            Deck._deck[i] = new Card(
                i,
                i % Deck.SUIT_CARDS_AMOUNT,
                Math.floor(i / Deck.SUIT_CARDS_AMOUNT)
            );
        }
    }
}

Deck.init();

export { Deck };

