import { Card, ICard } from './card';

export class Deck {
    private static deck: ICard[];
    public static DECK_SIZE: number = 36;
    public static SUIT_CARDS_AMOUNT: number = 9;

    public static init(): void {
        for (let i = 0; i < Deck.DECK_SIZE; i++) {
            Deck.deck[i] = new Card(
                Math.floor(i / Deck.SUIT_CARDS_AMOUNT),
                i % Deck.SUIT_CARDS_AMOUNT
            );
        }
    }

    public static shuffle(): void {
        let index: number;
        let temp: ICard;

        for (let i = 0; i < Deck.DECK_SIZE; i++) {
            index = Math.floor(Math.random() * 100) % Deck.SUIT_CARDS_AMOUNT;
            temp = Deck.deck[index];
            Deck.deck[index] = Deck.deck[i];
            Deck.deck[i] = temp;
        }
    }

    public static * getIterator(): Generator  {
        for (let i = 0; i < Deck.DECK_SIZE; i++) {
           yield Deck.deck[i];
        }
    }
}
