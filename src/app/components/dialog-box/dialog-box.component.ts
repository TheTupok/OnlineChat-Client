import {Component, OnInit} from '@angular/core';
import {IUser} from "../../Models/IUser";

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

    public userInfo: IUser;

    constructor() {
    }

    ngOnInit(): void {
    }
}
