import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {generateUsername} from "unique-username-generator";
import {RandomPicture} from "random-picture/dist";
import {Subject} from "rxjs";
import {IUser} from "../../Models/IUser";

@Injectable({providedIn: "root"})

@Injectable()
export class LocalStorageService {

    private storageUserInfoKey = 'userInfo'
    private _currentUserInfo: Subject<IUser> = new Subject();

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

    }

    getCurrentUser() {
        return this._currentUserInfo.asObservable()
    }

    setCurrentUser(data: IUser) {
        this._currentUserInfo.next(data)
    }

    async checkUserLocalStorage() {
        const user = this.storage.get(this.storageUserInfoKey)
        if (user == null) {
            const userPicture = await RandomPicture()
            const userInfo = {
                'userName': generateUsername(),
                'userPicture': userPicture.url
            }
            this.storage.set(this.storageUserInfoKey, userInfo)
            this.setCurrentUser(userInfo)
        } else {
            this.setCurrentUser(user)
            return user
        }
    }

    setInfoUser(data: IUser) {
        const userInfo = this.storage.get(this.storageUserInfoKey)
        const newUserInfo: any = {
            'userName': data.userName,
            'userPicture': data.userPicture
        }
        for(let key in newUserInfo){
            if(newUserInfo[key] == '') {
                newUserInfo[key] = userInfo[key]
            }
        }
        this.storage.set(this.storageUserInfoKey, newUserInfo)
        this.setCurrentUser(newUserInfo)
    }
}
