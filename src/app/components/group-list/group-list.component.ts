import {Component, OnInit} from '@angular/core';
import { GroupSelectionService } from 'src/app/core/services/group-selection.service';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    constructor(private groupSelectionService: GroupSelectionService) {
    }

    ngOnInit(): void {
    }

    groupSelection(event: MouseEvent) {
        this.groupSelectionService.choiceGroup(event)
    }
}
