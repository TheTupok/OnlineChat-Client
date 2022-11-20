import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from '@angular/router';
import {IWsMessage, WebSocketService} from "../../core/websocket";
import {Observable, Subscription} from "rxjs";
import {JwtTokenService} from "../../core/services/jwt.service";


@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

    loginForm: FormGroup;
    signUpForm: FormGroup;
    errorLoginMessage = '';

    private messages$: Observable<IWsMessage>;
    private _subscription: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private wsService: WebSocketService,
                private jwtService: JwtTokenService) {

    }

    ngOnInit(): void {
        this._createLoginForm();
        this._createSignUpForm();

        this.jwtService.deleteTokenJWT();

        this.messages$ = this.wsService.on();

        this._subscription = this.messages$.subscribe(data => {
            this.wsMessageHandler(data);
        })
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

    wsMessageHandler(message: IWsMessage) {
        const typeOperationMsg = message['typeOperation'];
        const response = message['response'];

        if (typeOperationMsg == 'login') {
            if (response['error']) {
                this.errorLoginMessage = response['error']['error-message'];
            } else {
                this.jwtService.setUserJWT(response);
                this.router.navigate(['']).then();
            }
        }

        if (typeOperationMsg == 'signUp') {
            if (response['error']) {
                this.errorLoginMessage = response['error']['error-message'];
            } else {
                this.jwtService.setUserJWT(response);
                this.router.navigate(['']).then();
            }
        }
    }

    logIn() {
        const loginUser = {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
        }

        if (loginUser.username == '' || loginUser.password == '') {
            this.errorLoginMessage = 'Fill in all the fields';
        } else {
            this.errorLoginMessage = '';
            const request = {
                typeOperation: 'login',
                request: loginUser
            }
            this.wsService.send(request);
        }
    }

    signUp() {
        const signUpUser = {
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

            const request = {
                typeOperation: 'signUp',
                request: signUpUser
            }
            this.wsService.send(request);
        }
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
