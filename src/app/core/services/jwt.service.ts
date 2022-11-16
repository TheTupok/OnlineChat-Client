import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {LocalStorageService} from "./localStorage.service";
import {IUser} from "../../Models/IUser";


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

    checkValidToken(res: string) {
        if (res == '200') {
            this.setValidToken(true);
        } else {
            this.setValidToken(false);
        }
    }

    getUserInfo(): IUser {
        const jwt = this.localStorageService.getUserJWT()
        const userInfo = atob(jwt.split('.')[1]);
        return JSON.parse(userInfo);
    }
}