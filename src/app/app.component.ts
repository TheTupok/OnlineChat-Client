import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./core/services/localStorage.service";
import {SocketioService} from "./core/services/socketio.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Client';

    constructor(private localStorageService: LocalStorageService,
                private socketService: SocketioService) {
    }

    ngOnInit(): void {

        this.socketService.setupSocketConnection();
    }

    ngOnDestroy() {
        this.socketService.disconnect();
    }
}
