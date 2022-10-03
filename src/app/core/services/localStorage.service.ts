import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {generateUsername} from "unique-username-generator";
import {RandomPicture} from "random-picture/dist";

@Injectable({providedIn: "root"})

@Injectable()
export class LocalStorageService {
    private storageUserInfoKey = 'userInfo'

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

    }

    getUserInfo() {
        return this.storage.get(this.storageUserInfoKey)
    }

    async setInfoUser(data?: string) {
        if (!data) {
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
