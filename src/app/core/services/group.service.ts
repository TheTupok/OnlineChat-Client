import {Injectable} from "@angular/core";
import {WebSocketService} from "../websocket";


@Injectable({
    providedIn: 'root'
})

export class GroupService {

    constructor(private wsService: WebSocketService) {
    }

    setCurrentGroup(event?: MouseEvent) {
        const groupList = document.getElementsByClassName('group-item') as HTMLCollection;
        for (let i = 0; i < groupList.length; i++) {
            const item = groupList[i] as HTMLElement;
            item.style.background = '';
        }

        let groupId: string | null;

        if (event) {
            const target = event.target as HTMLElement;
            const group = target.closest('.group-item') as HTMLElement;
            group.style.background = '#24243e';
            groupId = group.getAttribute('id-group');
        } else {
            const group = groupList[0] as HTMLElement;
            group.style.background = '#24243e';
            groupId = group.getAttribute('id-group');
        }

        this.wsService.send({typeOperation: 'setGroupId', request: groupId});
        return Number(groupId);
    }
}