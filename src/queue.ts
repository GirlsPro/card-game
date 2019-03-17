import { IQueueElem } from './queue-elem';

interface IQueue<V> {
    enqueue: (v: V) => void,
    dequeue: () => V,
    empty: () => boolean,
    full: () => boolean,
    erase: () => void
}

class Queue<VType> implements IQueue<VType> {
    private tail: IQueueElem<VType> | null = null;

    public dequeue(): VType {

    }

    public empty(): boolean {

    }

    public enqueue(v: VType): void {

    }

    public erase(): void {

    }

    public full(): boolean {
        return false;
    }
}

export { IQueue, Queue };