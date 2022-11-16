import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WebSocketService} from "../../core/services/websocket/websocket.service";
import {Subscription} from "rxjs";
import {LocalStorageService} from "../../core/services/localStorage.service";
import {Router} from '@angular/router';


@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

    loginForm: FormGroup;
    signUpForm: FormGroup;
    errorLoginMessage = '';

    wsSubscription: Subscription

    constructor(private fb: FormBuilder,
                private wsService: WebSocketService,
                private localStorageService: LocalStorageService,
                private router: Router) {

    }

    ngOnInit(): void {
        this._createLoginForm();
        this._createSignUpForm();

        this.localStorageService.deleteToken();

        this.wsSubscription = this.wsService.createObservableSocket()
            .subscribe(
                data => this.getMessageFromWs(data),
                error => console.log(error)
            );
    }

    private _createLoginForm() {
        this.loginForm = this.fb.group({
            username: '',
            password: '',
        })
    }

    private _createSignUpForm() {
        this.signUpForm = this.fb.group({
            username: '',
            password: '',
            repeatPassword: ''
        })
    }

    getMessageFromWs(message: string) {
        const msg = JSON.parse(message);
        const typeOperationMsg = msg['typeOperation'];
        const response = msg['response'];

        if (typeOperationMsg == 'login') {
            if (response['error']) {
                this.errorLoginMessage = response['error']['error-message'];
            } else {
                this.localStorageService.setUserJWT(response);
                this.router.navigate(['']).then();
            }
        }

        if (typeOperationMsg == 'signUp') {
            if (response['error']) {
                this.errorLoginMessage = response['error']['error-message'];
            } else {
                this.localStorageService.setUserJWT(response);
                this.router.navigate(['']).then();
            }
        }
    }

    logIn() {
        const loginUser = {
            typeOperation: 'login',
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
        }
        if (loginUser.username == '' || loginUser.password == '') {
            this.errorLoginMessage = 'Fill in all the fields';
        } else {
            this.errorLoginMessage = '';
            this.wsService.sendMessage(JSON.stringify(loginUser));
        }
    }

    signUp() {
        const signUpUser = {
            typeOperation: 'signUp',
            username: this.signUpForm.controls['username'].value,
            password: this.signUpForm.controls['password'].value
        }
        if (signUpUser.password == '' || signUpUser.username == '' || this.signUpForm.controls['repeatPassword'].value == '') {
            this.errorLoginMessage = 'Fill in all the fields';
        } else if (signUpUser.password.length <= 5 || signUpUser.username.length <= 5) {
            this.errorLoginMessage = 'Password or login must be more than 6 characters'
        } else if (signUpUser.password != this.signUpForm.controls['repeatPassword'].value) {
            this.errorLoginMessage = 'Passwords that don\'t match';
        } else {
            this.errorLoginMessage = '';
            this.wsService.sendMessage(JSON.stringify(signUpUser));
        }
    }
}
