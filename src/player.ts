import { IQueue, Queue } from './queue'

interface IPlayer {
    id: number,
    queue: IQueue<number>
}

let idCounter = 0;

class Player implements IPlayer {
    public id: number;
    public queue: IQueue<number>;

    constructor() {
        this.id = idCounter++;
        this.queue = new Queue<number>();
    }
}

export { IPlayer, Player };