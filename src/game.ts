import { IPlayer, Player } from './player';
import { Deck } from './deck';
import { IQueue, Queue } from './queue';

interface IGameResult {
    isEnd: boolean,
    winnerId?: number
}

interface IPlayerRoundData {
    id: number,
    cardsAmount: number,
    discardCards: number[]
}

interface IRoundResult {
    roundWinnerId: number,
    players: IPlayerRoundData[]
}

const enum RoundStatuses {
    'First',
    'Second',
    'None'
}

class Game {
    public static firstPlayer: IPlayer;
    public static secondPlayer: IPlayer;

    public static init(): number[] {
        Deck.shuffle();

        Game.firstPlayer = new Player();
        Game.secondPlayer = new Player();
        Game.distribute();

        return [
            Game.firstPlayer.id,
            Game.secondPlayer.id
        ];
    }

    public static round(): IRoundResult {
        const firstQueue: IQueue<number> = Game.firstPlayer.queue;
        const secondQueue: IQueue<number> = Game.secondPlayer.queue;
        const tableQueue: Queue<number> = new Queue<number>();
        let roundStatus: RoundStatuses = RoundStatuses.None;
        /* Data for response */
        const firstPlayerRoundData: IPlayerRoundData = {
            id: Game.firstPlayer.id,
            cardsAmount: firstQueue.count,
            discardCards: []
        };
        const secondPlayerRoundData: IPlayerRoundData = {
            id: Game.secondPlayer.id,
            cardsAmount: Deck.DECK_SIZE - firstPlayerRoundData.cardsAmount,
            discardCards: []
        };
        let roundWinnerId: number;
        /* Data for response */
        while (
            roundStatus === RoundStatuses.None
            && !(firstQueue.empty() && secondQueue.empty)
        ) {
            console.log(roundStatus, firstQueue, secondQueue);
            const [ firstCardId, secondCardId ]: number[] = Game.discard(tableQueue, firstQueue, secondQueue);
            firstPlayerRoundData.discardCards.push(firstCardId);
            secondPlayerRoundData.discardCards.push(secondCardId);

            roundStatus = Game.compareCards(firstCardId, secondCardId);

            if (roundStatus === RoundStatuses.None) {
                Game.discard(tableQueue, firstQueue, secondQueue);
            }
        }

        if (roundStatus === RoundStatuses.First) {
            firstQueue.concatenate(tableQueue);
            roundWinnerId = Game.firstPlayer.id;
        }
        else {
            secondQueue.concatenate(tableQueue);
            roundWinnerId = Game.secondPlayer.id;
        }

        return {
            roundWinnerId,
            players: [
                firstPlayerRoundData,
                secondPlayerRoundData
            ]
        }
    }

    public static isGameOver(): IGameResult {
        const firstQueue: IQueue<number> = Game.firstPlayer.queue;
        const secondQueue: IQueue<number> = Game.secondPlayer.queue;
        const gameOverResult: IGameResult = { isEnd: true };

        if (!firstQueue.empty() && !secondQueue.empty()) {
            return { isEnd: false };
        }

        if (!Game.firstPlayer.queue.empty()) {
            gameOverResult.winnerId = Game.firstPlayer.id;
        }
        else if (!Game.secondPlayer.queue.empty()) {
            gameOverResult.winnerId = Game.secondPlayer.id;
        }

        return gameOverResult;
    }

    private static distribute() {
        const firstQueue: IQueue<number> = Game.firstPlayer.queue;
        const secondQueue: IQueue<number> = Game.secondPlayer.queue;
        const deckIterator = Deck.getIterator();
        const size = Deck.DECK_SIZE / 2;

        for (let i = 0; i < size; i++) {
            firstQueue.enqueue(deckIterator.next().value.id);
            secondQueue.enqueue(deckIterator.next().value.id);
        }
    }

    private static discard(tableQ: IQueue<number>, firstQ: IQueue<number>, secondQ: IQueue<number>): number[] {
        let firstCardId: any;
        let secondCardId: any;

        if (!firstQ.empty()) {
            firstCardId = firstQ.dequeue();
        }
        else if (!secondQ.empty()) {
            firstCardId = secondQ.dequeue();
        }

        if (!secondQ.empty()) {
            secondCardId = secondQ.dequeue();
        }
        else if (!firstQ.empty()) {
            secondCardId = firstQ.dequeue();
        }

        tableQ.enqueue(firstCardId);
        tableQ.enqueue(secondCardId);

        return [firstCardId, secondCardId]
    }

    private static compareCards(firstCardId: number, secondCardId: number): RoundStatuses {
        const firstRank = Deck.getCard(firstCardId).rank;
        const secondRank = Deck.getCard(secondCardId).rank;
        console.log('rank', firstRank, secondRank);
        if (firstRank === secondRank) {
            return RoundStatuses.None;
        }

        return firstRank > secondRank ? RoundStatuses.First : RoundStatuses.Second;
    }
}

export {
    Game,
    IGameResult,
    IRoundResult
}
