import {Component, OnInit} from '@angular/core';
import {GroupSelectionService} from 'src/app/core/services/group-selection.service';
import {IGroup} from "../../Models/IGroup";
import {SocketioService} from "../../core/services/socketio.service";

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
            this.groupSelectionService.selectFirstGroup(data)
        })
    }

    groupSelection(event: MouseEvent) {
        this.groupSelectionService.choiceGroup(event)
    }
}
