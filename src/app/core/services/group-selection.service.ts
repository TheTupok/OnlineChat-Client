import {Injectable} from '@angular/core';
import {Subject, timer} from "rxjs";
import {IGroup} from "../../Models/IGroup";


@Injectable({providedIn: "root"})

@Injectable()
export class GroupSelectionService {

    private _currentGroup: Subject<IGroup> = new Subject();
    private groupList: IGroup[]

    constructor() {
    }

    getCurrentGroup() {
        return this._currentGroup.asObservable()
    }

    setCurrentGroup(data: IGroup) {
        this._currentGroup.next(data)
    }

    selectFirstGroup(groups: IGroup[]) {
        if(!(groups.length == 0)){
            this.groupList = groups
            timer(10).subscribe(() => this.setCurrentGroupElement(groups[0]))
            this.setCurrentGroup(groups[0])
        }
    }

    choiceGroup(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const currentGroup = target.closest('.group-row') as HTMLElement
        const nameGroup = currentGroup.getAttribute('data-group') as string
        const findGroup = this.groupList.find(group => group.nameGroup == nameGroup) as IGroup
        this.setCurrentGroupElement(findGroup)
        this.setCurrentGroup(findGroup)
    }

    setCurrentGroupElement(group: IGroup) {
        const allGroupRow = document.getElementsByClassName('group-row') as HTMLCollection
        const currentGroup = document.querySelector(`[data-group="${group.nameGroup}"]`) as HTMLElement
        Array.prototype.forEach.call(allGroupRow, (group: HTMLElement) => {
            group.style.backgroundColor = ''
        })
        currentGroup.style.backgroundColor = '#C3C3E5';
    }
}
