import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../core/services/localStorage.service";
import {Router} from "@angular/router";
import {interval, Subscription} from "rxjs";
import {WebSocketService} from "../../core/services/websocket/websocket.service";
import {JwtTokenService} from "../../core/services/jwt.service";
import {IUser} from "../../Models/IUser";


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

    wsSubscription: Subscription;

    public userInfo: IUser;

    constructor(private localStorageService: LocalStorageService,
                private router: Router,
                private wsService: WebSocketService,
                private jwtService: JwtTokenService) {
    }

    ngOnInit(): void {
        const JWTToken = this.localStorageService.getUserJWT();

        if (!JWTToken) {
            this.router.navigate(['/login']).then();
        } else {

            this.wsSubscription = this.wsService.createObservableSocket()
                .subscribe(
                    data => this.getMessageFromWs(data),
                    error => console.log(error),
                );

            const checkStatusConnect = interval(100).subscribe(() => {
                if (this.wsService.checkStatusConnect() == 1) {
                    const requestToken = {
                        typeOperation: 'checkJWT'
                    }
                    this.wsService.sendMessage(JSON.stringify(requestToken));

                    this.userInfo = this.jwtService.getUserInfo();
                    const requestGetUser = {
                        typeOperation: 'getUserData',
                        userId: this.userInfo.id
                    };
                    this.wsService.sendMessage(JSON.stringify(requestGetUser));

                    checkStatusConnect.unsubscribe();
                }
            })
        }
    }

    getMessageFromWs(data: string) {
        const msg = JSON.parse(data);
        const typeOperation = msg['typeOperation'];

        if (typeOperation == 'checkJWT') {
            this.jwtService.checkValidToken(msg['response']);
        }

        if (typeOperation == 'getUserData') {
            this.userInfo = msg['response'];
            console.log(this.userInfo);
        }
    }
}
