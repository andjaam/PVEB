import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages() {
        return new Observable((observer) => {
            this.socket.on('message', (message) => {
                observer.next(message);
            });
        });
    }
}
