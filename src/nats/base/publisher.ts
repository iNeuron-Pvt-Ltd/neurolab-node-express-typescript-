import { Subjects } from './subjects';
import { Message, Stan } from 'node-nats-streaming';

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    protected client: Stan;
    constructor(client: Stan) {
        this.client = client;
    }
    async publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err, data) => {
                if(err) return reject(err);
                console.log('Event published to subject: ', this.subject);
                resolve();
            });
        })
    }
}