import {Component, OnInit} from '@angular/core';
import {IUser} from "../../Models/IUser";
import {Observable, Subject, Subscription} from "rxjs";
import {IWsMessage, WebSocketService} from "../../core/websocket";
import {JwtTokenService} from "../../core/services/jwt.service";


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

    private _userInfo: IUser;
    public subjectUserInfo: Subject<IUser> = new Subject<IUser>();

    private message$: Observable<IWsMessage>;
    private _subscriptionMessage$: Subscription;

    private status$: Observable<boolean>;
    private _subscriptionStatus$: Subscription;

    constructor(private jwtService: JwtTokenService,
                private wsService: WebSocketService) {
    }

    ngOnInit(): void {
        this._userInfo = this.jwtService.getUserInfoFromJWT()

        this.message$ = this.wsService.on();
        this._subscriptionMessage$ = this.message$.subscribe(data => {
            this.wsMessageHandler(data);
        })

        if (this.wsService.isConnected) {
            this.wsService.send({typeOperation: 'getUserData', request: this._userInfo.id})
        }

        this.status$ = this.wsService.status;
        this._subscriptionStatus$ = this.status$.subscribe(status => {
            if (status) {
                this.wsService.send({typeOperation: 'getUserData', request: this._userInfo.id})
            }
        })
    }

    wsMessageHandler(data: IWsMessage) {
        const typeOperation = data['typeOperation'];

        if (typeOperation == 'getUserData') {
            this.subjectUserInfo.next(data['response']);
        }
    }

    ngOnDestroy() {
        this.wsService.send({typeOperation: 'setGroupId', request: 0});
        this._subscriptionStatus$.unsubscribe();
        this._subscriptionMessage$.unsubscribe();
    }
}
