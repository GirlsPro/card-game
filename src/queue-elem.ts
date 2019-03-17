interface IQueueElem<V> {
    value: V,
    next: IQueueElem<V>
}

class QueueElem<VType> implements IQueueElem<VType> {
    public  next: IQueueElem<VType>;
    public value: VType;

    constructor(value: VType, next: IQueueElem<VType>) {
        this.value = value;
        this.next = next;
    }
}

export { IQueueElem, QueueElem };
