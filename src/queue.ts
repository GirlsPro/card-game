import { IQueueElem, QueueElem } from './queue-elem';

interface IQueue<V> {
    count: number,
    enqueue: (v: V) => void,
    dequeue: () => V | null,
    empty: () => boolean,
    full: () => boolean,
    erase: () => void,
    concatenate: (queue: Queue<V>) => void
}

class Queue<VType> implements IQueue<VType> {
    public count = 0;
    private _tail: IQueueElem<VType> | null = null;

    public dequeue(): VType | null {
        if (this._tail) {
            let head = this._tail.next;

            if (this._tail === head) {
                this._tail = null;
            }
            else {
                this._tail.next = head.next;
            }

            this.count--;
            return head.value;
        }

        return null;
    }

    public empty(): boolean {
        return this._tail === null;
    }

    public enqueue(v: VType): void {
        if (this._tail === null) {
            this._tail = new QueueElem(v);
        }
        else {
            this._tail.next = new QueueElem(v, this._tail.next);
            this._tail = this._tail.next;
        }
        
        this.count++;
    }

    public concatenate(queue: Queue<VType>): void {
        if (!queue._tail) {
            return;
        }

        if (this._tail) {
            let head = this._tail.next;
            this._tail.next = queue._tail.next;
            queue._tail.next = head;
        }

        this._tail = queue._tail;
        queue._tail = null;

        this.count += queue.count;
    }

    public erase(): void {
        this._tail = null;
        this.count = 0;
    }

    public full(): boolean {
        return false;
    }
}

export { IQueue, Queue };
