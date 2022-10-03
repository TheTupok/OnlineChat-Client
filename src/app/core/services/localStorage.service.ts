import {Inject, Injectable} from '@angular/core';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {generateUsername} from "unique-username-generator";
import {RandomPicture} from "random-picture/dist";

@Injectable({providedIn: "root"})

@Injectable()
export class LocalStorageService {
    private STORAGE_KEY = 'userInfo'

    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {

    }

    getUserInfo() {
        return this.storage.get(this.STORAGE_KEY)
    }

    async setInfoUser(data?: any) {
        if (data == null) {
            const userInfo = {
                'userName': generateUsername(),
                'userPicture': await RandomPicture()
            }
            this.storage.set(this.STORAGE_KEY, userInfo)
        }
    }
}
