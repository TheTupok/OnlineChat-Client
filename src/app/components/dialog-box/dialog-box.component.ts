import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalStorageService} from "../../core/services/localStorage.service";
import {SocketioService} from "../../core/services/socketio.service";
import {IMessage} from "../../Models/IMessage";
import {IUser} from "../../Models/IUser";
import {GroupSelectionService} from "../../core/services/group-selection.service";
import {IGroup} from "../../Models/IGroup";
import {timer} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../modals/edit-user/edit-user.component";

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
    messageForm!: FormGroup;

    constructor(private fb: FormBuilder,
                private localStorageService: LocalStorageService,
                private socketService: SocketioService,
                private groupSelectionService: GroupSelectionService,
                public dialog: MatDialog
    ) {
    }

    dataMessage: IMessage[];
    chatArea: HTMLElement;
    userInfo: IUser
    currentGroup: IGroup

    ngOnInit(): void {
        this._createMessageForm();
        this.localStorageService.checkUserLocalStorage().then(user => {
            this.userInfo = user;
        })
        this.localStorageService.getCurrentUser()
            .subscribe((user: IUser) => {
                this.userInfo = user;
            })
        this.groupSelectionService.getCurrentGroup().subscribe((data: IGroup) => {
            this.socketService.setCurrentGroup(data)
            this.currentGroup = data
        });
        this.initDataMessages();
        this.chatArea = document.getElementById('chatArea') as HTMLElement;

        const textareaMessage = document.getElementById('textareaMessage') as HTMLElement;
        this.messageForm.controls['message'].valueChanges
            .subscribe((newValue: string) => {
                if (newValue == '' || newValue == null) textareaMessage.style.lineHeight = '6.7vh';
                else textareaMessage.style.lineHeight = '4vh';
            });

    }

    private _createMessageForm() {
        this.messageForm = this.fb.group({
            message: ''
        })
    }

    openDialog() {
        this.dialog.open(EditUserComponent, {
            height: '40%',
            width: '20%'
        });
    }

    public initDataMessages() {
        this.socketService.getMessageGroup().subscribe(data => {
            this.dataMessage = data;
            setTimeout(() => this.chatArea.scrollTo(0, this.chatArea.scrollHeight), 0)
        })
    }

    public sendDataMessage() {
        const message = this.messageForm.controls['message'].value;
        if (this.messageForm.controls['message'].value != null) {
            const data = {
                "message": message,
                "userName": this.userInfo.userName,
                "userPicture": this.userInfo.userPicture,
                "groupMessage": this.currentGroup.nameGroup
            }
            this.socketService.sendMessage(data)
            timer(10).subscribe(() => this.messageForm.controls['message'].reset())
        }
    }

    focusTextareaMessage(event: KeyboardEvent) {
        if (event.key === 'Enter' && !(event.shiftKey)) {
            this.sendDataMessage()
        }
    }
}
