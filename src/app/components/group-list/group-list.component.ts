import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription, timer} from "rxjs";
import {IUser} from "../../Models/IUser";
import {IGroup} from "../../Models/IGroup";
import {IWsMessage, WebSocketService} from "../../core/websocket";
import {GroupService} from 'src/app/core/services/group.service';


@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    @Input() subUserInfo: Observable<IUser>;
    private _subscriptionUserInfo: Subscription;
    public userInfo: IUser;

    public groupList: IGroup[];
    public currentGroup: IGroup;

    private message$: Observable<IWsMessage>;
    private _subscriptionMessage$: Subscription;

    private status$: Observable<boolean>;
    private _subscriptionStatus$: Subscription;

    constructor(private router: Router,
                private wsService: WebSocketService,
                public groupService: GroupService) {
    }

    ngOnInit(): void {
        this._subscriptionUserInfo = this.subUserInfo.subscribe(user => {
            this.userInfo = user;
        })

        this.message$ = this.wsService.on();
        this._subscriptionMessage$ = this.message$.subscribe(data => {
            this.wsMessageHandler(data);
        })

        if (this.wsService.isConnected) {
            this.wsService.send({typeOperation: 'getGroupList'})
        }

        this.status$ = this.wsService.status;
        this._subscriptionStatus$ = this.status$.subscribe(status => {
            if (status) {
                this.wsService.send({typeOperation: 'getGroupList'});
            }
        })
    }

    wsMessageHandler(data: IWsMessage) {
        const typeOperation = data['typeOperation'];

        if (typeOperation == 'getGroupList') {
            this.groupList = data['response'];
            timer(0).subscribe(() => {
                const groupId = this.groupService.setCurrentGroup();
                this.groupList.forEach(group => {
                    if (group.id == groupId) {
                        this.currentGroup = group;
                    }
                });
            });
        }
    }

    logout() {
        this.router.navigate(['/login']).then()
    }

    setGroup(event: MouseEvent) {
        const groupId = this.groupService.setCurrentGroup(event);
        this.groupList.forEach(group => {
            if (group.id == groupId) {
                this.currentGroup = group;
            }
        })
    }

    ngOnDestroy() {
        this._subscriptionMessage$.unsubscribe();
        this._subscriptionStatus$.unsubscribe();
        this._subscriptionUserInfo.unsubscribe();
    }
}
