import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../core/services/localStorage.service";
import {Router} from "@angular/router";
import {IWsMessage, WebSocketService} from "../../core/websocket";
import {Observable} from "rxjs";
import {IUser} from "../../Models/IUser";
import {JwtTokenService} from "../../core/services/jwt.service";


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

    private message$: Observable<IWsMessage>;
    private status$: Observable<boolean>;
    private userInfo: IUser;

    constructor(private localStorageService: LocalStorageService,
                private router: Router,
                private wsService: WebSocketService,
                private jwtService: JwtTokenService) {
    }

    ngOnInit(): void {
        if (!this.localStorageService.getUserJWT()) {
            this.router.navigate(['/login']).then();
        }

        this.userInfo = this.jwtService.getUserInfo()

        this.message$ = this.wsService.on()
        this.message$.subscribe(data => {
            this.wsMessageHandler(data);
        })

        this.status$ = this.wsService.status;
        this.status$.subscribe(status => {
            if (status) {
                this.wsService.send({typeOperation: 'getUserData', request: this.userInfo.id})
            }
        })
    }

    wsMessageHandler(data: IWsMessage) {
        const typeOperation = data['typeOperation'];

        if(typeOperation == 'getUserData'){
            this.userInfo = data['response'];
            console.log(this.userInfo)
        }
    }
}
