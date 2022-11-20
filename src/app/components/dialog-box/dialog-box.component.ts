import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IUser} from "../../Models/IUser";


@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss']
})


export class DialogBoxComponent implements OnInit {

    @Input() subUserInfo: Observable<IUser>;
    private _subscriptionUserInfo: Subscription;
    public userInfo: IUser;

    constructor() {
    }

    ngOnInit(): void {
        this._subscriptionUserInfo = this.subUserInfo.subscribe(user => {
            this.userInfo = user;
        })
    }

    ngOnDestroy() {
        this._subscriptionUserInfo.unsubscribe();
    }
}
