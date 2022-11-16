import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LocalStorageService} from "../localStorage.service";


@Injectable({
    providedIn: 'root'
})

export class WebSocketService {

    constructor(private localStorageService: LocalStorageService) {
    }

    ws: WebSocket;

    createObservableSocket(url = `ws://localhost:8080?jwt=${this.localStorageService.getUserJWT()}`): Observable<any> {
        this.ws = new WebSocket(url)

        return new Observable<any>(
            observer => {
                this.ws.onmessage = (event) => {
                    observer.next(event.data);
                }
                this.ws.onerror = (event) => observer.error(event);
                this.ws.onclose = () => observer.complete();
                return () => this.ws.close(1000, "The user disconnect");
            }
        )
    }

    checkStatusConnect() {
        return this.ws.readyState;
    }

    sendMessage(message: string): string {
        if (this.ws.readyState == 1) {
            this.ws.send(message);
            return `Sent to server ${message}`;
        } else {
            return "Message was not send";
        }
    }
}