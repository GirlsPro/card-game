import { IQueue } from './queue'

interface IPlayer {
    queue: IQueue<number>,
    layOutCard: () => number | null,
    takeCards: (...cards: number[]) => void
}

class Player implements IPlayer {
    private _queue: IQueue<number> | null = null;

    public set queue(q: IQueue<number>) {
        this._queue = q;
    }

    public layOutCard(): number | null {
        return this._queue ? this._queue.dequeue() : null;
    }

    public takeCards(...cards: number[]) {
        cards.forEach(card => this.queue.enqueue(card));
    }
}

export { IPlayer, Player };