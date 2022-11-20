import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {LocalStorageService} from "./localStorage.service";


@Injectable({
    providedIn: 'root'
})

export class JwtTokenService {

    _validToken: Subject<boolean> = new Subject();

    constructor(private localStorageService: LocalStorageService) {
    }

    getValidToken() {
        return this._validToken.asObservable();
    }

    setValidToken(token: boolean) {
        this._validToken.next(token);
    }

    getUserJWT() {
        return this.localStorageService.getValueByKey('JWTToken');
    }

    setUserJWT(value: string) {
        this.localStorageService.setValueByKey('JWTToken', value);
        this.setValidToken(true);
    }

    deleteTokenJWT() {
        this.localStorageService.deleteByKey('JWTToken');
        this.setValidToken(false);
    }

    getUserInfoFromJWT() {
        const jwt = this.getUserJWT();
        const userInfo = atob(jwt.split('.')[1]);
        return JSON.parse(userInfo);
    }
}