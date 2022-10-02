import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  messageForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._createMessageForm()

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
}
