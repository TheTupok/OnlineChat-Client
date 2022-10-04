import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalStorageService} from "../../../core/services/localStorage.service";


@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    editUserForm: FormGroup;


    constructor(private fb: FormBuilder,
                private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this._createEditUserForm()
    }

    private _createEditUserForm() {
        this.editUserForm = this.fb.group({
            userName: '',
            userPicture: ''
        })
    }

    imagePreview(event: Event) {
        const file = (event.target as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.onload = () => {
           this.editUserForm.controls['userPicture'].setValue(reader.result)
        }
        reader.readAsDataURL(file)
    }

    editUser() {
        const dataUser = this.editUserForm.getRawValue()
        this.localStorageService.setInfoUser(dataUser)
    }
}
