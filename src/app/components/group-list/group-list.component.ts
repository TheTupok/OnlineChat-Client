import {Component, OnInit} from '@angular/core';
import {GroupSelectionService} from 'src/app/core/services/group-selection.service';
import {IGroup} from "../../Models/IGroup";
import {SocketioService} from "../../core/services/socketio.service";
import {IMessage} from "../../Models/IMessage";

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    groupList: IGroup[]

    constructor(private groupSelectionService: GroupSelectionService,
                private socketService: SocketioService) {
    }

    ngOnInit(): void {
        this.socketService.getGroupList().subscribe(data => {
            this.groupList = data
            this.setLastMessageGroup(data)
            this.groupSelectionService.selectFirstGroup(data)
        });
    }

    setLastMessageGroup(groupList: IGroup[]) {
        this.socketService.getAllMessages().subscribe(data => {
            groupList.forEach((group: IGroup) => {
                const messageGroup = data.filter((message: IMessage) => message.groupMessage == group.nameGroup)
                const lastMessage = messageGroup.pop() as IMessage
                group.lastMessage = lastMessage.message
                group.timeLastMessage = lastMessage.time
            })
        })
    }

    groupSelection(event: MouseEvent) {
        this.groupSelectionService.choiceGroup(event)
    }
}
