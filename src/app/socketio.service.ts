import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {ISendMessage} from "./Models/ISendMessage";
import {Observable, Observer} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SocketioService {

    socket: any;

    constructor() {
    }

    setupSocketConnection() {
        this.socket = io(environment.SOCKET_ENDPOINT);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    sendMessage(data: ISendMessage) {
        this.socket.emit('send message', data)
    }

    getMessage() {
        return new Observable((observer: Observer<any>) => {
            this.socket.on('getallmessages', (message: string) => {
                observer.next(JSON.parse(message))
            })
        })
    }
}

export const environment = {
    production: false,
    SOCKET_ENDPOINT: 'http://localhost:5000'
};
