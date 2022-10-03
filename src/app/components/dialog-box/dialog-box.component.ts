import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalStorageService} from "../../core/services/localStorage.service";
import {SocketioService} from "../../socketio.service";
import {IMessage} from "../../Models/IMessage";
import {IUser} from "../../Models/IUser";
import {GroupSelectionService} from "../../core/services/group-selection.service";

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
                private groupSelectionService: GroupSelectionService
    ) {
    }

    dataMessage: IMessage[];
    chatArea: HTMLElement;
    userInfo: IUser
    currentGroup: string

    ngOnInit(): void {
        if (this.localStorageService.getUserInfo() == null) {
            this.localStorageService.setInfoUser().then(data => {
                this.userInfo = data!;
            })
        } else {
            this.userInfo = this.localStorageService.getUserInfo()
        }
        this._createMessageForm()
        this.initDataMessages();
        this.chatArea = document.getElementById('chatArea') as HTMLElement;

        const textareaMessage = document.getElementById('textareaMessage') as HTMLElement;
        this.messageForm.controls['message'].valueChanges
            .subscribe((newValue: string) => {
                if (newValue == null) textareaMessage.style.lineHeight = '6.7vh';
                else textareaMessage.style.lineHeight = '4vh';
            })

        this.groupSelectionService.getCurrentGroup().subscribe((data: string) => {
            this.socketService.setCurrentGroup(data)
            this.currentGroup = data
        })
        this.groupSelectionService.firstGroup()
    }

    private _createMessageForm() {
        this.messageForm = this.fb.group({
            message: ''
        })
    }

    public initDataMessages() {
        this.socketService.getMessage().subscribe(data => {
            this.dataMessage = data;
            setTimeout(() => this.chatArea.scrollTo(0, this.chatArea.scrollHeight), 0)
        })
    }

    public sendDataMessage() {
        const message = this.messageForm.controls['message'].value;
        const userInfo = this.localStorageService.getUserInfo()
        if (this.messageForm.controls['message'].value != null) {
            const data = {
                "message": message,
                "userName": userInfo.userName,
                "userPicture": userInfo.userPicture,
                "groupMessage": this.currentGroup
            }
            this.socketService.sendMessage(data)
            setTimeout(() => this.messageForm.controls['message'].reset(), 0)
        }
    }

    focusTextareaMessage(event: KeyboardEvent) {
        if (event.key === 'Enter' && !(event.shiftKey)) {
            this.sendDataMessage()
        }
    }
}
