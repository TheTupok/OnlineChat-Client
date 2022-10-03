import {Inject, Injectable} from '@angular/core';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {generateUsername} from "unique-username-generator";
import {RandomPicture} from "random-picture/dist";

@Injectable({providedIn: "root"})

@Injectable()
export class LocalStorageService {
    private storageUserInfoKey = 'userInfo'

    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {

    }

    getUserInfo() {
        return this.storage.get(this.storageUserInfoKey)
    }

    async setInfoUser(data: any) {
        if (data == null) {
            const userPicture = await RandomPicture()
            const userInfo = {
                'userName': generateUsername(),
                'userPicture': userPicture.url
            }
            this.storage.set(this.storageUserInfoKey, userInfo)
            return userInfo
        }
    }
}
