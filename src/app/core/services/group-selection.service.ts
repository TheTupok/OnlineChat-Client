import {Injectable} from '@angular/core';
import {Subject} from "rxjs";


@Injectable({providedIn: "root"})

@Injectable()
export class GroupSelectionService {

    private _currentGroup: Subject<string> = new Subject();

    getCurrentGroup() {
        return this._currentGroup.asObservable()
    }

    setCurrentGroup(data: string) {
        this._currentGroup.next(data)
    }

    firstGroup() {
        const firstGroup = document.getElementsByClassName('group-row')[0] as HTMLElement
        firstGroup.style.backgroundColor = '#C3C3E5';
        const nameGroup = firstGroup.getAttribute('data-group') as string
        this.setCurrentGroup(nameGroup)
    }

    choiceGroup(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const currentGroup = target.closest('.group-row') as HTMLElement
        const allGroupRow = document.getElementsByClassName('group-row') as HTMLCollection
        Array.prototype.forEach.call(allGroupRow, (group: HTMLElement) => {
            group.style.backgroundColor = ''
        })
        currentGroup.style.backgroundColor = '#C3C3E5';
        const nameGroup = currentGroup.getAttribute('data-group') as string
        this.setCurrentGroup(nameGroup)
    }
}
