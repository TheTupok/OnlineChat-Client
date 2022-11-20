import {Inject, Injectable} from "@angular/core";
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";


@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    }

    getValueByKey(key: string) {
        return this.storage.get(key)
    }

    setValueByKey(key: string, value: any) {
        this.storage.set(key, value);
    }

    deleteByKey(key: string) {
        this.storage.remove(key);
    }
}