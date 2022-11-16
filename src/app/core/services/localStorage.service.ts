import {Inject, Injectable} from "@angular/core";
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";


@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    private STORAGE_KEY_TOKEN = 'Token';

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    }

    getUserJWT() {
        return this.storage.get(this.STORAGE_KEY_TOKEN)
    }

    setUserJWT(data: string) {
        this.storage.set(this.STORAGE_KEY_TOKEN, data)
    }

    deleteToken() {
        this.storage.remove(this.STORAGE_KEY_TOKEN);
    }
}