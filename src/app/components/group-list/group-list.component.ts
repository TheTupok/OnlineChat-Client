import {Component, OnInit} from '@angular/core';
import {GroupSelectionService} from 'src/app/core/services/group-selection.service';
import {IGroup} from "../../Models/IGroup";
import {SocketioService} from "../../core/services/socketio.service";
import {IMessage} from "../../Models/IMessage";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    searchForm: FormGroup
    groupList: IGroup[]
    termGroup: string = ''

    constructor(private groupSelectionService: GroupSelectionService,
                private socketService: SocketioService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this._createSearchForm();
        this.getGroupList(this.termGroup)

        this.searchForm.controls['searchTermGroup'].valueChanges
            .subscribe(data => {
                this.termGroup = data;
                this.getGroupList(data)
            })
    }

    private _createSearchForm() {
        this.searchForm = this.fb.group({
            searchTermGroup: ''
        })
    }

    getGroupList(term: string) {
        this.socketService.getGroupList(term).subscribe(data => {
            this.groupList = data
            this.groupSelectionService.selectFirstGroup(data)
            this.setLastMessageGroup(data)
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
        console.log(this.groupList)
        this.groupSelectionService.choiceGroup(event)
    }
}
