import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalStorageService} from "../../core/services/localStorage.service";
import {SocketioService} from "../../socketio.service";
import {IMessage} from "../../Models/IMessage";

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
                ) {
    }

    dataMessage: IMessage[];
    chatArea: HTMLElement;
    userInfo: {
        userName: '',
        userPicture: ''
    }

    ngOnInit(): void {
        this._createMessageForm()
        this.initDataMessages();
        this.userInfo = this.localStorageService.getUserInfo()
        this.chatArea = document.getElementById('chatArea') as HTMLElement;

        const textareaMessage = document.getElementById('textareaMessage') as HTMLElement;
        this.messageForm.controls['message'].valueChanges
            .subscribe((newValue: string) => {
                if (newValue == '') textareaMessage.style.lineHeight = '6.7vh';
                else textareaMessage.style.lineHeight = '4vh';
            })
    }

    private _createMessageForm() {
        this.messageForm = this.fb.group({
            message: ''
        })
    }

    public initDataMessages() {
        this.socketService.getMessage().subscribe(data => {
            this.dataMessage = data;
            console.log(this.dataMessage)
            setTimeout(() => this.chatArea.scrollTo(0, this.chatArea.scrollHeight), 0)
        })
    }

    public sendDataMessage() {
        const message = this.messageForm.controls['message'].value;
        const userInfo = this.localStorageService.getUserInfo()
        if (this.messageForm.controls['message'].value != '') {
            const data = {
                "message": message,
                "userName": userInfo.userName
            }
            this.socketService.sendMessage(data)
            this.messageForm.controls['message'].setValue('')
        }
    }

    focusTextareaMessage(event: KeyboardEvent) {
        if (event.key === 'Enter' && !(event.shiftKey)) {
            this.sendDataMessage()
        }
    }
}
