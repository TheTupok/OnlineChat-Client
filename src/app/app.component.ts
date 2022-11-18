import {Component, OnInit} from '@angular/core';
import {JwtTokenService} from "./core/services/jwt.service";
import {Router} from "@angular/router";
import {IWsMessage, WebSocketService} from "./core/websocket";
import {Observable} from "rxjs";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Client';

    private messages$: Observable<IWsMessage>;
    private status$: Observable<boolean>;

    constructor(private jwtService: JwtTokenService,
                private router: Router,
                private wsService: WebSocketService) {
    }

    ngOnInit(): void {
        this.jwtService.getValidToken().subscribe((valid: boolean) => {
            if (!valid) {
                this.router.navigate(['/login']).then();
            }
        })

        this.messages$ = this.wsService.on();
        this.messages$.subscribe(data => {
            this.wsMessageHandler(data);
        })

        this.status$ = this.wsService.status;
        this.status$.subscribe(status => {
            if (status) {
                this.wsService.send({typeOperation: 'checkJWT'});
            }
        })
    }

    wsMessageHandler(data: IWsMessage) {
        const typeOperation = data['typeOperation'];
        if (typeOperation == 'errorJWT') {
            this.jwtService.setValidToken(false);
        }
    }
}
