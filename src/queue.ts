import { IQueueElem, QueueElem } from './queue-elem';

interface IQueue<V> {
    enqueue: (v: V) => void,
    dequeue: () => V | null,
    empty: () => boolean,
    full: () => boolean,
    erase: () => void
}

class Queue<VType> implements IQueue<VType> {
    private tail: IQueueElem<VType> | null = null;

    public dequeue(): VType | null {
        if (this.tail) {
            let head = this.tail.next;

            if (this.tail === head) {
                this.tail = null;
            }
            else {
                this.tail.next = head.next;
            }

            return head.value;
        }

        return null;
    }

    public empty(): boolean {
        return this.tail === null;
    }

    public enqueue(v: VType): void {
        if (this.tail === null) {
            this.tail = new QueueElem(v);
        }
        else {
            let newElem = new QueueElem(v, this.tail.next);
            this.tail.next = newElem;
        }
    }

    public erase(): void {
        this.tail = null;
    }

    public full(): boolean {
        return false;
    }
}

export { IQueue, Queue };