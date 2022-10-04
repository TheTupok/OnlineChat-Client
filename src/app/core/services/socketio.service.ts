import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {ISendMessage} from "../../Models/ISendMessage";
import {Observable, Observer} from "rxjs";
import {IGroup} from "../../Models/IGroup";

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
        this.socket.emit('sendMessage', data)
    }

    setCurrentGroup(group: IGroup) {
        this.socket.emit('currentGroup', group)
    }

    getMessage() {
        return new Observable((observer: Observer<any>) => {
            this.socket.on('getAllMessages', (message: string) => {
                observer.next(JSON.parse(message))
            })
        })
    }

    getGroupList() {
        return new Observable((observer: Observer<any>) => {
            this.socket.on('groupList', (message: string) => {
                observer.next(JSON.parse(message))
            })
        })
    }
}

export const environment = {
    production: false,
    SOCKET_ENDPOINT: 'http://localhost:5000'
};
