import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "../../core/services/swagger-gen";

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
    messageForm!: FormGroup;

    constructor(private fb: FormBuilder,
                private databaseService: MessageService) {
    }

    dataMessage: any
    chatArea: HTMLElement;

    ngOnInit(): void {
        this._createMessageForm()
        this.initDataMessages();
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
        this.databaseService.getAllMessages().subscribe(data => {
            this.dataMessage = data;
            setTimeout(() => this.chatArea.scrollTo(0, this.chatArea.scrollHeight), 0)
        })
    }

    public sendDataMessage() {
        const message = this.messageForm.controls['message'].value;
        if (this.messageForm.controls['message'].value != '') {
            const data = {
                "message": message,
                "fromUser": 'User'
            }
            this.databaseService.addMessageToDB(data).subscribe(() => {
                this.initDataMessages()
                this.messageForm.controls['message'].setValue('')
            })
        }
    }

    focusTextareaMessage(event: KeyboardEvent) {
        if (event.key === 'Enter' && !(event.shiftKey)) {
            this.sendDataMessage()
        }
    }
}
