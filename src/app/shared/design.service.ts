import {Injectable} from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class DesignService {
    menuChanged = new Subject<{type: string, name: string}>();
    gradeChanged = new Subject<number>();
    classChanged = new Subject<number>();
    
    savePressed = new Subject<boolean>();
    
}